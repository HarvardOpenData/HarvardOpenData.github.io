/** @jsx jsx */
import { jsx } from 'theme-ui'
import DefaultArticle from './article-layouts/default-article'

function Project (props) {
  switch (props.layout) {
    case 'custom':
      return <DefaultArticle {...props} />
    default:
      return <DefaultArticle {...props} />
  }
}

export default Project
