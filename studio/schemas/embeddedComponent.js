import { MdAspectRatio } from "react-icons/md";

export default {
  type: "object",
  name: "embeddedComponent",
  icon: MdAspectRatio,
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
