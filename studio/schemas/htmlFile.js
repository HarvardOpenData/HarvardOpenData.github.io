export default {
    title: "HTML File",
    name: "htmlFile",
    type: "file",
    description: "HTML File to be embedded on the site",
    fields: [
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
