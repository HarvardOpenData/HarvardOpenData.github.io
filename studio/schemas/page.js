export default {
  name: "page",
  title: "Page",
  type: "document",
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Make sure the slug matches the file name in src/pages.",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "The primary content on the page"
    },
    {
      name: "bodySecondary",
      title: "Secondary",
      description: "Secondary content, often displayed in a sidebar",
      type: "blockContent",
    },
  ],
};
