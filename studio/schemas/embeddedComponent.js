export default {
  type: "object",
  name: "embeddedComponent",
  title: "React Component",
  fields: [
    {
      title: "Component name",
      name: "name",
      type: "string",
      description: "E.g. WheelOfFortune",
    },
    {
      title: "Props",
      name: "props",
      type: "array",
      description: "Currently only allows string props",
      of: [{ type: "stringProp" }],
    },
  ],
};
