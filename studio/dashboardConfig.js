export default {
  widgets: [
    {
      name: "netlify",
      options: {
        title: "Netlify Deploys",
        sites: [
          {
            title: "Website",
            apiId: `${process.env.SANITY_STUDIO_NETLIFY_API_ID}`,
            buildHookId: `${process.env.SANITY_STUDIO_BUILD_HOOK_ID}`,
            name: `${process.env.SANITY_STUDIO_NETLIFY_NAME}`,
          },
        ],
      },
    },
  ],
};
