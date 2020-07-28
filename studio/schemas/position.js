import { MdApps } from "react-icons/md";

export default {
  name: "position",
  title: "Position",
  type: "document",
  icon: MdApps,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "group",
      title: "Group",
      type: "string",
      options: {
        list: [
          { title: "Board", value: "board" },
          { title: "Mentors", value: "mentors" },
          { title: "Contributors", value: "contributors" },
          { title: "Bootcampers", value: "bootcampers" },
          { title: "Alumni", value: "alumni" }
        ],
      },
    },
  ],
};
