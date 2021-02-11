export default {
  title: "Plotly Interactive",
  name: "plotlyInteractive",
  type: "object",
  description: "Plotly Interactive to be embedded on the site",
  fields: [
    {
      name: "json",
      title: "Plotly json that needs to be rendered",
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
    },
    {
      name: "aspectRatio",
      title: "Aspect Ratio (format like 16:9)",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
  ],
};
