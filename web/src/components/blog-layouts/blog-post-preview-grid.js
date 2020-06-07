import { Link } from 'gatsby'
import React from 'react'
import { Styled, Grid, Text } from 'theme-ui'
import BlogPostPreview from './blog-post-preview'

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
        {props.nodes && props.nodes.map((node, key) => <BlogPostPreview key={key} {...node} />)}
      </Grid>
      {props.browseMoreHref && <Link to={props.browseMoreHref}>Browse more</Link>}
    </Styled.root>
  )
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewGrid
