/** @jsx jsx */
import { jsx } from "theme-ui";
import ArticlePreview from "../article-layouts/article-preview";
import ProjectPreviewGrid from "../project-layouts/project-preview-grid";
import Spacer from "../core/spacer";

// Currently only works for projects
const PreviewGrid = ({
  featured,
  featuredHorizontal,
  container,
  columns,
  horizontal,
  space,
  nodes,
}) => {
  const featuredArticle = featured === true ? nodes.shift() : {};
  console.log(featured)
  return (
    <div>
      {featured && <ArticlePreview
        {...featuredArticle}
        link={`/project/${featuredArticle.slug.current}`}
        container={container}
        horizontal={featuredHorizontal}
        size="large"
        headerAs={"h2"}
      />}
      <Spacer height={space ? space : 4} />
      <ProjectPreviewGrid
        nodes={nodes}
        space={space}
        container={container}
        columns={columns}
        horizontal={horizontal}
        browseMoreHref="/projects/"
      />
    </div>
  );
};

export default PreviewGrid;
