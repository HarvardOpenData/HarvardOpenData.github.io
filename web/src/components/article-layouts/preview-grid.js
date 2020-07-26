/** @jsx jsx */
import { jsx } from "theme-ui";
import ArticlePreview from "../article-layouts/article-preview"
import ProjectPreviewGrid from "../project-layouts/project-preview-grid"

// Currently only works for projects
const PreviewGrid = ({
  featuredHorizontal,
  container,
  columns,
  horizontal,
  nodes
}) => {
  const featuredArticle = nodes.shift()
  return (
    <div>
      <ArticlePreview
        {...featuredArticle}
        link={`/project/${featuredArticle.slug.current}`}
        container={container}
        horizontal={featuredHorizontal}
        size="large"
        headerAs={"h2"}
      />
      <br />
      <ProjectPreviewGrid
        nodes={nodes}
        container={container}
        columns={columns}
        horizontal={horizontal}
        browseMoreHref="/projects/"
      />
    </div>
  )
}

export default PreviewGrid;
