export default {
  title: "HTML File",
  name: "htmlFile",
  type: "object",
  description: "HTML File to be embedded on the site",
  fields: [
    {
      name: "html",
      title: "HTML code that needs to be rendered",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "alt",
      title: "Alternative text (for screen readers)",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      options: {
        isHighlighted: true,
      },
    }
  ],
};
