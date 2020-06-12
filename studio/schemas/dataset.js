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
    },
    {
      name: "fileType",
      title: "File Type",
      type: "string",
      options: {
        list: [
          { title: "API", value: "api" },
          { title: "Database", value: "database" },
          { title: "CSV", value: "csv" },
          { title: "Excel", value: "excel" },
          { title: "Graph", value: "graph" },
          { title: "HTML", value: "html" },
          { title: "Web App", value: "webApp" },
        ]
      }
    },
    {
      name: "subjects",
      title: "Subjects",
      type: "array",
      of: [{ type: "reference", to: { type: "subject" } }]
    },
  ],
  liveEdit: true
};