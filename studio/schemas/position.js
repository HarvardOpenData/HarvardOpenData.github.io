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
          { title: "Board", value: "Board" },
          { title: "Mentors", value: "Mentors" },
          { title: "Contributors", value: "Contributors" },
          { title: "Bootcampers", value: "Bootcampers" },
          { title: "Alumni", value: "Alumni" }
        ],
      },
    },
  ],
};
