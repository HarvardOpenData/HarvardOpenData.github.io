import Link from "../core/link";
import React from "react";
import { getBlogUrl } from "../../lib/helpers";
import { Styled, Grid } from "theme-ui";
import ArticlePreview from "../article-layouts/article-preview";

function BlogPostPreviewGrid(props) {
  return (
    <Styled.root>
      {props.title && (
        <h4>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h4>
      )}
      <Grid gap={4} columns={[1, 2, 3]}>
        {props.nodes &&
          props.nodes.map((node, key) => (
            <ArticlePreview
              key={key}
              container={props.container}
              size={props.size}
              {...node}
              link={getBlogUrl(node.publishedAt, node.slug.current)}
            />
          ))}
      </Grid>
    </Styled.root>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
};

export default BlogPostPreviewGrid;
