import { MdAssessment } from "react-icons/md";

export default {
  name: "dataset",
  title: "Dataset",
  type: "document",
  icon: MdAssessment,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "sourceURL",
      title: "Source URL",
      type: "url"
    },
    {
      name: "downloadURL",
      title: "Download URL",
      type: "url"
    }
  ],
  liveEdit: true
};
