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
  browseMoreHref,
}) => {
  const featuredArticle = featured === true ? nodes.shift() : {};
  
  return (
    <div>
      {featured && (
        <ArticlePreview
          {...featuredArticle}
          link={`/project/${featuredArticle.slug.current}`}
          container={container}
          horizontal={featuredHorizontal}
          size="large"
          columns={"2.12fr 1fr"}
          gap={4}
          headerAs={"h2"}
        />
      )}
      <Spacer height={space ? space : 4} />
      <ProjectPreviewGrid
        nodes={nodes}
        space={space}
        container={container}
        columns={columns}
        horizontal={horizontal}
        browseMoreHref={browseMoreHref}
      />
    </div>
  );
};

export default PreviewGrid;
