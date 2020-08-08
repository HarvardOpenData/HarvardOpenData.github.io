export default {
  name: "internalLink",
  type: "object",
  title: "Internal link",
  description: "Reference to another page (optional)",
  fields: [
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: [
        { type: "post" },
        { type: "page" },
        { type: "project" },
        { type: "dataset" },
        // other types you may want to link to
      ],
    },
  ],
};
