/** @jsx jsx */
import BaseBlockContent from '@sanity/block-content-to-react'
import { jsx, Styled } from 'theme-ui'
import Figure from './figure'
import EmbeddedComponent from './embedded-component'
import Slideshow from './slideshow'

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <Styled.h1>{props.children}</Styled.h1>

        case 'h2':
          return <Styled.h2>{props.children}</Styled.h2>

        case 'h3':
          return <Styled.h3>{props.children}</Styled.h3>

        case 'h4':
          return <Styled.h4>{props.children}</Styled.h4>

        case 'blockquote':
          return <Styled.blockquote>{props.children}</Styled.blockquote>

        default:
          return <Styled.p>{props.children}</Styled.p>
      }
    },
    figure(props) {
      return <Figure {...props.node} />
    },
    slideshow(props) {
      return <Slideshow {...props.node} />
    },
    embeddedComponent(props) {
      return (
        <Styled.root>
          <EmbeddedComponent {...props.node} />
        </Styled.root>
      )
    }
  }
}

const BlockContent = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockContent
