const algoliasearch = require("algoliasearch");
const request = require("request");
const ndjson = require("ndjson");
const { bindNodeCallback } = require("rxjs");
const { streamToRx } = require("rxjs-stream");
const {
  bufferCount,
  map,
  mergeMap,
  toArray,
  pluck,
} = require("rxjs/operators");

// Algolia configuration
const algoliaApp = process.env.ALGOLIA_APP_ID;
const algoliaIndex = "HODP_Sanity";
// Sanity configuration
const projectId = "xx0obpjv";
const dataset = "production";

exports.handler = function (event, context, cb) {
  const URL = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}/?query=*[_type == "project" || _type == "person" || _type == "dataset"]`;
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
      pluck("result"),
      mergeMap((val) => val),
      /*
       * Pick and prepare fields you want to index,
       * here we reduce structured text to plain text
       */
      map(function sanityToAlgolia(doc) {
        switch (doc._type) {
          // Transforming person datatypes
          case "person":
            return {
              type: doc._type,
              objectID: doc._id,
              _rawBio: doc.bio,
              image: doc.image,
              slug: doc.slug,
              concentration: doc.concentration,
              house: doc.house,
              year: doc.year,
              name: doc.name,
            };
          // Transforming dataset datatypes
          case "dataset":
            return {
              type: doc._type,
              objectID: doc._id,
              title: doc.title,
              description: doc.description,
              downloadURL: doc.downloadURL,
              sourceURL: doc.sourceURL,
            };
          // Transforming article datatypes
          default:
            return {
              type: doc._type,
              objectID: doc._id,
              _rawExcerpt: doc.excerpt,
              mainImage: doc.mainImage,
              slug: doc.slug,
              title: doc.title,
              publishedAt: doc.publishedAt,
            };
        }
      }),
      // buffer batches in chunks of 100
      bufferCount(10),
      // submit actions, one batch at a time
      map((docs) => partialUpdateObjects(docs), 1),
      // collect all batches and emit when the stream is complete
      toArray()
    )
    .subscribe((batchResults) => {
      // Subscribe to results after submitting for update
      batchResults.forEach((batchResult) => batchResult.subscribe());
      cb(null, {
        statusCode: 200,
        body: `Updated ${batchResults.length} batches`,
      });
    });
};
