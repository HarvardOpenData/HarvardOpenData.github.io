/** @jsx jsx */
import { jsx } from "theme-ui";
import DefaultArticle from "../article-layouts/default-article";

function BlogPost(props) {
  return <DefaultArticle {...props} />;
}

export default BlogPost;
