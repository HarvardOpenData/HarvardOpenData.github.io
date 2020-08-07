import { MdAttachMoney } from "react-icons/md";

export default {
  name: "redirect",
  title: "Redirect",
  type: "document",
  liveEdit: false,
  fields: [
    {
      name: "name",
      title: "Redirect name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Slug is needed for the frontend to properly handle the redirect",
      options: {
        source: "name",
        maxLength: 96,
      }, validation: Rule => Rule.required()
    },
    {
      name: 'url',
      type: 'string',
      title: 'Redirect link',
    }
  ],
};
