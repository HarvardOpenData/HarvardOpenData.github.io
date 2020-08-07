import Link from "../core/link";
import React from "react";
import { Styled, Grid } from "theme-ui";
import ArticlePreview from "../article-layouts/article-preview";

function ProjectPreviewGrid(props) {
  return (
    <div>
      {props.title && (
        <h4>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h4>
      )}
      <Grid
        gap={props.space ? props.space : 4}
        columns={props.columns ? props.columns : [1, 2, 3]}
      >
        {props.nodes &&
          props.nodes.map((node, key) => (
            <ArticlePreview
              key={key}
              horizontal={props.horizontal}
              container={props.container}
              size={props.size}
              {...node}
              link={node.slug.current}
            />
          ))}
      </Grid>
      {props.browseMoreHref &&
        <Link to={props.browseMoreHref} style={{ textAlign: "right" }}>
          <h3>Browse more →</h3>
        </Link>
      }
    </div>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
};

export default ProjectPreviewGrid;
