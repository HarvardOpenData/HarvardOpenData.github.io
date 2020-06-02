import { Link } from 'gatsby'
import React from 'react'
import { Styled, Grid, Text } from 'theme-ui'
import ProjectPreview from './project-preview'

function ProjectPreviewGrid (props) {
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
      <Grid
        gap={4}
        columns={[1, 2, 3 ]}
      >
        {props.nodes &&
          props.nodes.map((node, key) => (
            <ProjectPreview key={key} {...node} />
          ))}
      </Grid>
      {props.browseMoreHref && (
        <Link to={props.browseMoreHref}>Browse more</Link>
      )}
    </Styled.root>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewGrid
