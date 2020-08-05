export default {
  type: "object",
  name: "postAuthor",
  title: "Post author",
  fields: [
    {
      title: "Person",
      name: "person",
      type: "reference",
      to: { type: "person" },
    },
    {
      title: "Roles",
      name: "roles",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "radio",
        list: [
          { title: "Designer", value: "designer" },
          { title: "Author", value: "author" },
          { title: "Developer", value: "developer" },
          { title: "Contributor", value: "contributor" },
          { title: "Editor", value: "editor" },
          { title: "Manager", value: "manager" },
          { title: "Illustration", value: "illustration" },
        ],
      },
    },
  ],
  preview: {
    select: {
      personName: "person.name",
      roles: "roles",
      image: "person.image",
    },
    prepare(data) {
      return {
        ...data,
        title: data.personName,
        subtitle: data.roles && data.roles.join("/"),
        media: data.image,
      };
    },
  },
};
