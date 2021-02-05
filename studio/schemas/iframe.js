export default {
    name: "iframe",
    title: "iframe Embed",
    type: "object",
    fields: [
        {
            name: "url",
            title: "Content URL",
            type: "url",
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
    ]
};
