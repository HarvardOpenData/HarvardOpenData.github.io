export default {
  widgets: [
    {
      name: "netlify",
      options: {
        title: "My Netlify deploys",
        sites: [
          {
            title: "Website",
            apiId: `${process.env.NETLIFY_API_ID}`,
            buildHookId: `${process.env.BUILD_HOOK_ID}`,
            name: `${process.env.NETLIFY_NAME}`,
          },
        ],
      },
    },
  ],
};
