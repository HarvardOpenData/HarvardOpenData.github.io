const process = require("process");
const fetch = require("node-fetch");
const sanityClient = require("@sanity/client");
const crypto = require("crypto");
const qs = require("qs");

// Setting up the Sanity client
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

// Function for verifying a string is a valid URL
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

// Function for verifying the request
function verifyRequest(req) {
  const timestamp = req.headers["x-slack-request-timestamp"];

  // convert current time from milliseconds to seconds
  const time = Math.floor(new Date().getTime() / 1000);
  if (Math.abs(time - timestamp) > 300) {
    return false;
  }

  // Encode signature
  const slackSignature = req.headers["x-slack-signature"];
  const sigBasestring = "v0:" + timestamp + ":" + req.body;
  const mySignature =
    "v0=" +
    crypto
      .createHmac("sha256", process.env.SLACK_SIGNING_SECRET)
      .update(sigBasestring, "utf8")
      .digest("hex");

  // Use cryp
  return crypto.timingSafeEqual(
    Buffer.from(mySignature, "utf8"),
    Buffer.from(slackSignature, "utf8")
  );
}

// Netlify function handler
exports.handler = async function (request) {
  const { channel_id, command, text } = parseParameters(request.body);
  const params = text.split("\\");
  const slug = params[1];
  const url = params[2];
  let blocks = "";

  // Restricted only to the board-23 channel
  if (verifyRequest(request) && channel_id == "C03JMGCRM9B") {
    // Different handling for different slash commands
    if (command == "/redirect") {
      // Redirect object for creation
      const redirect = {
        _type: "redirect",
        // Some workflow state
        name: params[0].replaceAll("+", " "),
        slug: {
          _type: "slug",
          current: slug,
        },
        url,
      };

      if (isValidHttpUrl(url)) {
        blocks = await client
          .create(redirect) // Create redirect using Sanity client
          .then(() => {
            // Rebuild the website if redirect creation is successful
            const netlifyWebhook = `https://api.netlify.com/build_hooks/${process.env.SANITY_STUDIO_BUILD_HOOK_ID}`;
            return fetch(netlifyWebhook, {
              method: "POST",
              body: {},
            });
          })
          .then(() => {
            // Set response text for the API
            return [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `Redirect created at https://hodp.org/${slug} to ${url}.`,
                },
              },
            ];
          })
          .catch((error) => {
            // Log error and set response text for the API
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
      }
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
  // Respond to the API call
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  };
};
