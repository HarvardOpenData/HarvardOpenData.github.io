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
      validation: Rule => Rule.required()
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
      }, validation: Rule => Rule.required()
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
      type: "reference",
      to: [{type: 'position'}],
      validation: Rule => Rule.required()
    },
    {
      name: "house",
      title: "House",
      description: "(or dorm!)",
      type: "string",
      options: {
        list: [
          { title: "Adams", value: "Adams" },
          { title: "Cabot", value: "Cabot" },
          { title: "Currier", value: "Currier" },
          { title: "Dudley Co-op", value: "Dudley" },
          { title: "Dunster", value: "Dunster" },
          { title: "Eliot", value: "Eliot" },
          { title: "Leverett", value: "Leverett" },
          { title: "Kirkland", value: "Kirkland" },
          { title: "Lowell", value: "Lowell" },
          { title: "Mather", value: "Mather" },
          { title: "Pforzheimer", value: "Pforzheimer" },
          { title: "Quincy", value: "Quincy" },
          { title: "Winthrop", value: "Winthrop" },
          { title: "Apley Court", value: "Apley Court" },
          { title: "Canaday", value: "Canaday" },
          { title: "Grays", value: "Grays" },
          { title: "Greenough", value: "Greenough" },
          { title: "Hollis", value: "Hollis" },
          { title: "Holworthy", value: "Holworthy" },
          { title: "Hurlbut", value: "Hurlbut" },
          { title: "Lionel", value: "Lionel" },
          { title: "Massachusetts Hall", value: "Massachusetts Hall" },
          { title: "Matthews", value: "Matthews" },
          { title: "Mower", value: "Mower" },
          { title: "Pennypacker", value: "Pennypacker" },
          { title: "Stoughtom", value: "Stoughton" },
          { title: "Straus", value: "Straus" },
          { title: "Thayer", value: "Thayer" },
          { title: "Weld", value: "Weld" },
          { title: "Wigglesworth", value: "Wigglesworth" },
          { title: "Other", value: "Other" },
        ],
      },
    },
    {
      name: "year",
      title: "Class Year",
      description: "e.g. 2021",
      type: "number",
      validation: Rule => Rule.integer().positive().error('Your year must be a positive integer')
    },
    {
      name: "bio",
      title: "Bio",
      description:
        'Write in third-person. Avoid terms like "junior" because they get outdated.',
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
