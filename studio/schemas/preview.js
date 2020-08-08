import { MdChromeReaderMode } from "react-icons/md";

export default {
  name: "preview",
  title: "Preview",
  type: "object",
  icon: MdChromeReaderMode,
  liveEdit: false,
  fields: [
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "header",
      title: "Header",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "blockText",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "link",
      title: "Internal link",
      type: "link",
    },
  ],
};
