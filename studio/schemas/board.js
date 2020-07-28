import { MdApps } from "react-icons/md";

export default {
  name: "board",
  title: "Board",
  type: "document",
  icon: MdApps,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "members",
      title: "Members",
      description:
        'Add board members in the order you want them to appear in the People page.',
      type: "array",
      of: [{ type: "reference", to: { type: "person" } }],
    }
  ],
};
