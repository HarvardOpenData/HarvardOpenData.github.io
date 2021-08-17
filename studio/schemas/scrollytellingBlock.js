export default {
    name: "scrollytellingBlock",
    title: "Scrollytelling Block",
    type: "object",
    description: "Scrollytelling Block to be used Scrollytelling Component",
    fields: [
      {
        name: "graphic",
        title: "Graphic",
        description: "Array of contents blocks and associated images",
        type: "figure",
        options: {
          isHighlighted: true,
        },
      },
      {
        name: "textContent",
        title: "Text Content",
        description: "Array of contents blocks and associated images",
        type: 'blockContent',
        options: {
          isHighlighted: true,
        },
      },
    ],
  };
  