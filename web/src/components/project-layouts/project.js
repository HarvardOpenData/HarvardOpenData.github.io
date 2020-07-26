/** @jsx jsx */
import { jsx } from "theme-ui";
import DefaultArticle from "../article-layouts/default-article";
import FullImageArticle from "../article-layouts/full-image-article";

function Project(props) {
  switch (props.layout) {
    case "custom":
      return <DefaultArticle {...props} />;
    case "fullImage":
      return <FullImageArticle {...props} />;
    default:
      return <DefaultArticle {...props} />;
  }
}

export default Project;
