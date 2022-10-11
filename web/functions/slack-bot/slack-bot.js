const process = require("process");
const fetch = require("node-fetch");

const sanityClient = require("@sanity/client");

const client = sanityClient({
  // projectId: process.env.SANITY_PROJECTID,
  projectId: "xx0obpjv",
  // dataset: process.env.SANITY_DATASET,
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Function for parsing slack parameters from http body
// Source: https://www.sitepoint.com/get-url-parameters-with-javascript/
function parseParameters(queryString) {
  // we'll store the parameters here
  var obj = {};

  // split our query string into its component parts
  var arr = queryString.split("&");

  for (var i = 0; i < arr.length; i++) {
    // separate the keys and the values
    var a = arr[i].split("=");

    // set parameter name and value (use 'true' if empty)
    var paramName = a[0];
    var paramValue = typeof a[1] === "undefined" ? true : a[1];

    obj[paramName] = paramValue;
  }

  return obj;
}

exports.handler = async function (event) {
  console.log(event);
  const { channel_id, command, text } = parseParameters(event.body);
  const params = text.split("+");
  const slug = params[1];
  const url = params[2];

  if (channel_id == "C03JMGCRM9B") {
    if (command == "%2Fredirect") {
      const document = {
        _type: "redirect",
        // Some workflow state
        name: params[0],
        slug: {
          _type: "slug",
          current: slug,
        },
        url,
      };
      let blocks = "";

      try {
        await client.create(document);
        blocks = [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Redirect created at https://hodp.org/${slug} to ${url}.`,
            },
          },
        ];
      } catch (error) {
        console.log(error);
        blocks = [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Redirect was unable to be created at https://hodp.org/${slug} with ${url}.`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Please check again that you typed in the right parameters.",
            },
          },
        ];
      } finally {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blocks }),
        };
      }
    } else {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: `${command.slice(3)} is not a supported command at this moment.`,
      };
    }
  } else {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: "You are not authorized to use this Jimmie Jams.",
    };
  }
};
