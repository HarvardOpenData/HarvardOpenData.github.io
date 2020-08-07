export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Some frontend will require a slug to be set to be able to show the post",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage",
    },
    {
      name: "publishedAt",
      title: "Published at",
      description:
        "You can use this field to schedule post where you show them",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "blockText",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "projectMember" }],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: Rule => Rule.required()
    },
    {
      name: "subjects",
      title: "Subjects",
      type: "array",
      of: [{ type: "reference", to: { type: "subject" } }],
    },
    {
      name: "facebookUrl",
      title: "Facebook post link",
      type: "url",
    },
  ],
  orderings: [
    {
      title: "Publishing date new–>old",
      name: "publishingDateAsc",
      by: [
        { field: "publishedAt", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "Publishing date old->new",
      name: "publishingDateDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      image: "mainImage",
    },
    prepare({ title = "No title", publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : "Missing publishing date",
        media: image,
      };
    },
  },
};
