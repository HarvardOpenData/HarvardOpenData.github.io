import Link from '../core/link'
import React from 'react'
import { Styled, Grid, Text } from 'theme-ui'
import ProjectPreview from './project-preview'
import ArticlePreview from '../article-layouts/article-preview'

function ProjectPreviewGrid(props) {
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
        {props.nodes && props.nodes.map((node, key) =>
          <ArticlePreview key={key} container {...node} link={`/project/${node.slug.current}`} />)
        }
      </Grid>
    </Styled.root>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewGrid
