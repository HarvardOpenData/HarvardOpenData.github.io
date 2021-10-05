export default {
    name: "shortForm",
    title: "Short Form",
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
          "Some frontend will require a slug to be set to be able to show the short form",
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
        name: "slideshow",
        title: "Slideshow",
        type: "slideshow",
      },
      {
        name: "publishedAt",
        title: "Published at",
        description:
          "You can use this field to schedule short forms where you show them",
        type: "datetime",
      },
      {
        name: "excerpt",
        title: "Excerpt",
        type: "blockText",
      },
      {
        name: "facebookUrl",
        title: "Facebook post link",
        type: "url",
      },
      {
        name: "members",
        title: "Members",
        type: "array",
        of: [{ type: "projectMember" }],
      },
      {
        name: "dataset",
        title: "Dataset",
        type: "array",
        of: [{ type: "reference", to: { type: "dataset" } }],
      },
      {
        name: "categories",
        title: "Categories",
        type: "array",
        of: [{ type: "reference", to: { type: "category" } }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: "subjects",
        title: "Subjects",
        type: "array",
        of: [{ type: "reference", to: { type: "subject" } }],
      },
      {
        name: "relatedProjects",
        title: "Related projects",
        type: "array",
        of: [{ type: "reference", to: { type: "project" } }],
      },
    ],
    preview: {
      select: {
        title: "title",
        publishedAt: "publishedAt",
        slideshow: "slideshow",
      },
      prepare({ title = "No title", publishedAt, slideshow }) {
        return {
          title,
          subtitle: publishedAt
            ? new Date(publishedAt).toLocaleDateString()
            : "Missing publishing date",
          media: slideshow.slides[0],
        };
      },
    },
    initialValue: {
      layout: "default",
    },
  };
  