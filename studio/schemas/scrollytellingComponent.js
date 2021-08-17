export default {
    title: "Scrollytelling Component",
    name: "scrollytellingComponent",
    type: "object",
    description: "Scrollytelling Component to be used inside articles",
    fields: [
      {
        name: "scrollyTellingBlocks",
        title: "Scrollytelling Blocks",
        description: "Array of Scrollytelling blocks",
        type: "array",
        of: [{type: "scrollytellingBlock"}],
        options: {
          isHighlighted: true,
        },
      },
    ],
  };
  