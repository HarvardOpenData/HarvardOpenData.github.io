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
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Some frontend will require a slug to be set to be able to show the person",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "sourceURL",
      title: "Source URL",
      type: "url",
    },
    {
      name: "downloadURL",
      title: "Download URL",
      type: "url",
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
        ],
      },
    },
    {
      name: "subjects",
      title: "Subjects",
      type: "array",
      of: [{ type: "reference", to: { type: "subject" } }],
    },
  ],
  liveEdit: true,
};
