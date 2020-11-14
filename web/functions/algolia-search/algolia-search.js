const request = require("request");
const algoliasearch = require("algoliasearch");

const ndjson = require("ndjson");
const {bindNodeCallback} = require("rxjs");
const {streamToRx} = require("rxjs-stream");
const {bufferCount, map, mergeMap, toArray, tap} = require("rxjs/operators");

const algoliaApp = "QCACO3FFKP";
const algoliaIndex = "HODP_Sanity";
// Sanity configuration
const projectId = "xx0obpjv";
const dataset = "production";

exports.handler = async function (event, context, cb) {
  const URL = `https://${projectId}.api.sanity.io/v1/data/export/${dataset}`;
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
      /*
       * Pick and prepare fields you want to index,
       * here we reduce structured text to plain text
       */
      map(function sanityToAlgolia(doc) {
        console.log(doc);
        return {
          objectID: doc._id,
          body: blocksToText(doc.body || []),
          blurb: blocksToText(doc.blurb || []),
          title: doc.title,
          name: doc.name,
          slug: doc.slug,
        };
      }),
      // buffer batches in chunks of 100
      bufferCount(100),
      // 👇uncomment to console.log objects for debugging
      tap(console.log),
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
