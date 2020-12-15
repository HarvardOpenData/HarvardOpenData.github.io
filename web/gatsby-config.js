require("dotenv").config();
const {
  api: { projectId, dataset },
} = requireConfig("../studio/sanity.json");

module.exports = {
  siteMetadata: {
    title: `Harvard Open Data Project`,
    description: `The Harvard College Open Data Project (HODP) is a student-faculty group that aims to increase transparency and solve problems on campus using public Harvard data.`,
    author: `HODP Team`,
    menuLinks: [
      {
        name: `Projects`,
        link: `/projects`,
      },
      {
        name: `Data`,
        link: `/data`,
      },
      {
        name: `Participate`,
        link: `/participate`,
        subMenu: [
          {
            name: `Surveys`,
            link: `/surveys`,
          },
          {
            name: `Predictions Game`,
            link: `/predictions`,
          },
          {
            name: `HODP Docs`,
            link: `http://docs.hodp.org/`,
          },
          {
            name: `Join HODP`,
            link: `/join`,
          },
        ],
      },
      {
        name: `Wiki`,
        link: `http://wiki.hodp.org/wiki/Main_Page`,
      },
      {
        name: `Sponsors`,
        link: `/sponsors`,
      },
      {
        name: `About`,
        link: `/about`,
        subMenu: [
          {
            name: `People`,
            link: `/people`,
          },
          {
            name: `Blog`,
            link: `/blog`,
          },
        ],
      },
    ],
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId,
        dataset,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          "DISQUS_NAME",
          "MAPBOX_ACCESS_TOKEN",
          "GOOGLE_SPREADSHEET_ID_FROM_URL",
          "GOOGLE_SERVICE_ACCOUNT_EMAIL",
          "GOOGLE_PRIVATE_KEY",
          "ALGOLIA_TOKEN",
          "ALGOLIA_APP_ID"
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
        }
      }
    },
    "gatsby-plugin-meta-redirect",
    "gatsby-plugin-client-side-redirect", // keep it in last in list
  ],
};

/**
 * We're requiring a file in the studio folder to make the monorepo
 * work "out-of-the-box". Sometimes you would to run this web frontend
 * in isolation (e.g. on codesandbox). This will give you an error message
 * with directions to enter the info manually or in the environment.
 */

function requireConfig(path) {
  try {
    return require(path);
  } catch (e) {
    console.error(
      "Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js"
    );
    return {
      api: {
        projectId: process.env.SANITY_PROJECT_ID || "",
        dataset: process.env.SANITY_DATASET || "",
      },
    };
  }
}
