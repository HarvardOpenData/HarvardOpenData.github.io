const algoliasearch = require("algoliasearch");
const request = require("request");

const ndjson = require("ndjson");
const { bindNodeCallback } = require("rxjs");
const { streamToRx } = require("rxjs-stream");
const { bufferCount, map, mergeMap, toArray, pluck } = require("rxjs/operators");

// Algolia configuration
const algoliaApp = "QCACO3FFKP";
const algoliaIndex = "HODP_Sanity";
// Sanity configuration
const projectId = "xx0obpjv";
const dataset = "production";

exports.handler = function (event, context, cb) {
  const URL = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}/?query=*[_type == "project"]`;
  console.log("Constructed URL is ...", URL);

  // Initiate an Algolia client
  const client = algoliasearch(algoliaApp, process.env.ALGOLIA_TOKEN);
  // Initiate the Algolia index
  const index = client.initIndex(algoliaIndex);

  // bind the update function to use it as an observable
  const partialUpdateObjects = bindNodeCallback((...args) =>
    index.saveObjects(...args)
  );
  streamToRx(request(URL).pipe(ndjson.parse()))
    .pipe(
      pluck('result'),
      mergeMap(val => val),
      /*
       * Pick and prepare fields you want to index,
       * here we reduce structured text to plain text
       */
      map(function sanityToAlgolia(doc) {
        return {
          objectID: doc._id,
          categories: doc.categories,
          body: blocksToText(doc.body || []),
          excerpt: doc.excerpt,
          mainImage: doc.mainImage,
          members: doc.members,
          slug: doc.slug,
          title: doc.title
        };
      }),
      // buffer batches in chunks of 100
      bufferCount(100),
      // 👇uncomment to console.log objects for debugging
      // tap(console.log),
      // submit actions, one batch at a time
      mergeMap((docs) => partialUpdateObjects(docs), 1),
      // collect all batches and emit when the stream is complete
      toArray()
    )
    .subscribe((batchResults) => {
      const totalLength = batchResults.reduce(
        (count, batchResult) => count + batchResult.objectIDs.length,
        0
      );
      cb(
        null,
        `Updated ${totalLength} documents in ${batchResults.length} batches`
      );
    }, cb);
};

const defaults = { nonTextBehavior: "remove" };

function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
}
