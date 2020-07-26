import { MdPerson } from "react-icons/md";

export default {
  name: "person",
  title: "Person",
  type: "document",
  icon: MdPerson,
  liveEdit: false,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
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
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "email",
      title: "Email",
      type: "email",
    },
    {
      name: "position",
      title: "Position",
      description: "e.g. Co-Partnerships Director, Contributor",
      type: "string",
    },
    {
      name: "house",
      title: "House",
      description: "(or dorm!)",
      type: "string",
      options: {
        list: [
          { title: "Adams", value: "adams" },
          { title: "Cabot", value: "cabot" },
          { title: "Currier", value: "currier" },
          { title: "Dudley Co-op", value: "dudley" },
          { title: "Dunster", value: "dunster" },
          { title: "Eliot", value: "eliot" },
          { title: "Leverett", value: "leverett" },
          { title: "Kirkland", value: "kirkland" },
          { title: "Lowell", value: "lowell" },
          { title: "Mather", value: "mather" },
          { title: "Pforzheimer", value: "Pforzheimer" },
          { title: "Quincy", value: "quincy" },
          { title: "Winthrop", value: "winthrop" },
          { title: "Apley Court", value: "apleyCourt" },
          { title: "Canaday", value: "canaday" },
          { title: "Grays", value: "grays" },
          { title: "Greenough", value: "greenough" },
          { title: "Hollis", value: "hollis" },
          { title: "Holworthy", value: "holworthy" },
          { title: "Hurlbut", value: "hurlbut" },
          { title: "Lionel", value: "lionel" },
          { title: "Massachusetts Hall", value: "massachusettsHall" },
          { title: "Matthews", value: "matthews" },
          { title: "Mower", value: "mower" },
          { title: "Pennypacker", value: "pennypacker" },
          { title: "Stoughtom", value: "stoughton" },
          { title: "Straus", value: "straus" },
          { title: "Thayer", value: "thayer" },
          { title: "Weld", value: "weld" },
          { title: "Wigglesworth", value: "wigglesworth" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "year",
      title: "Class Year",
      description: "e.g. 2021",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      description:
        'Write in third-person. Avoid signatories like "junior" because they get outdated.',
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
