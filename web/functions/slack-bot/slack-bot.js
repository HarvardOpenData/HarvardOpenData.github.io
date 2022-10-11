const process = require("process");
const fetch = require("node-fetch");

const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "xx0obpjv",
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Function for parsing slack parameters from http body
// Source: https://www.sitepoint.com/get-url-parameters-with-javascript/
function parseParameters(queryString) {
  var params = {};

  // split our query string into its component parts
  var arr = decodeURIComponent(queryString).split("&");

  for (var i = 0; i < arr.length; i++) {
    // separate the keys and the values
    var a = arr[i].split("=");

    params[a[0]] = a[1];
  }

  return params;
}

exports.handler = async function (event) {
  const { channel_id, command, text } = parseParameters(event.body);
  const params = text.split("+");
  const slug = params[1];
  const url = params[2];
  let blocks = "";

  if (channel_id == "C03JMGCRM9B") {
    if (command == "/redirect") {
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

      blocks = await client
        .create(document)
        .then(() => {
          const sanityUrl = `https://api.netlify.com/build_hooks/${process.env.SANITY_STUDIO_BUILD_HOOK_ID}`;
          return fetch(sanityUrl, {
            method: "POST",
            body: {},
          });
        })
        .then(() => [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Redirect created at https://hodp.org/${slug} to ${url}.`,
            },
          },
        ])
        .catch((error) => {
          console.log(error);
          return [
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
        });
    } else {
      blocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${command.slice(
              3
            )} is not a supported command at this moment.`,
          },
        },
      ];
    }
  } else {
    blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "You are not authorized to use this Jimmie Jams.",
        },
      },
    ];
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  };
};
