import { MdAttachMoney } from "react-icons/md";

export default {
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  icon: MdAttachMoney,
  liveEdit: false,
  fields: [
    {
      name: "name",
      title: "Sponsor name",
      type: "string",
    },
    {
      name: "image",
      title: "Logo",
      type: "image",
    },
    {
      name: 'link',
      type: 'url',
      title: 'Website link',
    },
    {
      name: "description",
      title: "Company description",
      type: "blockContent",
    },
    {
      name: "tier",
      title: "Sponsor Tier",
      type: "string",
    }
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
