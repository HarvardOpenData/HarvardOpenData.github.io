import { MdImage } from "react-icons/md";

export default {
  name: "figure",
  title: "Figure",
  type: "image",
  icon: MdImage,
  options: {
    hotspot: true,
  },
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
    },
  ],
};
