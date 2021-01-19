/*
 * prerequisites
 */
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require("dotenv").config();
}
// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error("no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set");
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error("no GOOGLE_PRIVATE_KEY env var set");
/*
 * ok real work
 *
 * GET /.netlify/functions/google-spreadsheet
 * GET /.netlify/functions/google-spreadsheet/1
 * PUT /.netlify/functions/google-spreadsheet/1
 * POST /.netlify/functions/google-spreadsheet
 * DELETE /.netlify/functions/google-spreadsheet/1
 *
 * the library also allows working just with cells,
 * but this example only shows CRUD on rows since thats more common
 */
const { GoogleSpreadsheet } = require("google-spreadsheet");

exports.handler = async (event) => {
  const table = event.queryStringParameters.table;
  const UserIP = event.headers["x-nf-client-connection-ip"] || "6.9.6.9"; // not required, i just feel like using this info
  const doc = new GoogleSpreadsheet(event.queryStringParameters.id);

  // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets. required.
  const sheet = doc.sheetsByIndex[table]; // you may want to customize this if you have more than 1 sheet
  console.log(`accessing ${sheet.title} with ${sheet.rowCount} rows`);
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, "");
  const segments = path.split("/").filter((e) => e);

  try {
    switch (event.httpMethod) {
      case "GET":
        /* GET /.netlify/functions/google-spreadsheet-fn */
        if (segments.length === 0) {
          const rows = await sheet.getRows(); // can pass in { limit, offset }
          const serializedRows = rows.map(serializeRow);
          return {
            statusCode: 200,
            // body: JSON.stringify(rows) // dont do this - has circular references
            body: JSON.stringify(serializedRows), // better
          };
        }
        /* GET /.netlify/functions/google-spreadsheet-fn/123456 */
        if (segments.length === 1) {
          const rowId = segments[0];
          const rows = await sheet.getRows(); // can pass in { limit, offset }
          const srow = serializeRow(rows[rowId]);
          return {
            statusCode: 200,
            body: JSON.stringify(srow), // just sends less data over the wire
          };
        } else {
          throw new Error(
            "too many segments in GET request - you should only call something like /.netlify/functions/google-spreadsheet-fn/123456 not /.netlify/functions/google-spreadsheet-fn/123456/789/101112"
          );
        }
      /* POST /.netlify/functions/google-spreadsheet-fn */
      case "POST":
        /* parse the string body into a useable JS object */
        const data = JSON.parse(event.body);
        data.UserIP = UserIP;
        // console.log('`POST` invoked', data);
        const addedRow = await sheet.addRow(data);
        // console.log({ addedRow });
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `POST Success - added row ${addedRow._rowNumber - 1}`,
            rowNumber: addedRow._rowNumber - 1, // minus the header row
          }),
        };
      /* PUT /.netlify/functions/google-spreadsheet-fn/123456 */
      case "PUT":
        /* PUT /.netlify/functions/google-spreadsheet-fn */
        if (segments.length === 0) {
          console.error("PUT request must also have an id"); // we could allow mass-updating of the sheet, but nah
          return {
            statusCode: 422, // unprocessable entity https://stackoverflow.com/questions/3050518/what-http-status-response-code-should-i-use-if-the-request-is-missing-a-required
            body: "PUT request must also have an id.",
          };
        }
        /* PUT /.netlify/functions/google-spreadsheet-fn/123456 */
        if (segments.length === 1) {
          const rowId = segments[0];
          const rows = await sheet.getRows(); // can pass in { limit, offset }
          const data = JSON.parse(event.body);
          data.UserIP = UserIP;
          console.log(`PUT invoked on row ${rowId}`, data);
          const selectedRow = rows[rowId];
          Object.entries(data).forEach(([k, v]) => {
            selectedRow[k] = v;
          });
          await selectedRow.save(); // save updates
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "PUT is a success!" }),
            // body: JSON.stringify(rows[rowId]) // just sends less data over the wire
          };
        } else {
          return {
            statusCode: 500,
            body:
              "too many segments in PUT request - you should only call somehting like /.netlify/functions/google-spreadsheet-fn/123456 not /.netlify/functions/google-spreadsheet-fn/123456/789/101112",
          };
        }
      /* DELETE /.netlify/functions/google-spreadsheet-fn/123456 */
      case "DELETE":
        //
        // warning:
        // this code is untested but you can probably figure this out
        //

        if (segments.length === 1) {
          const rows = await sheet.getRows(); // can pass in { limit, offset }
          // // we dont actually use this in the demo but you might
          // const rowId = segments[0];
          // await rows[rowId].delete(); // delete a row

          // do this
          if (rows.length > 1) {
            const lastRow = rows[rows.length - 1];
            await lastRow.delete(); // delete a row
            return {
              statusCode: 200,
              body: JSON.stringify({ message: "DELETE is a success!" }),
            };
          } else {
            return {
              statusCode: 200,
              body: JSON.stringify({
                message: "no rows left to delete! (first row is sacred)",
              }),
            };
          }
        } else {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message:
                "invalid segments in DELETE request, must be /.netlify/functions/google-spreadsheet-fn/123456",
            }),
          };
        }
      /* Fallthrough case */
      default:
        return {
          statusCode: 500,
          body: "unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE",
        };
    }
  } catch (err) {
    console.error("error ocurred in processing ", event);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }

  /*
   * utils
   */
  function serializeRow(row) {
    let temp = {};
    sheet.headerValues.map((header) => {
      temp[header] = row[header];
    });
    return temp;
  }
};
