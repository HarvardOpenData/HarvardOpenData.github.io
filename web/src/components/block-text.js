import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import { Styled } from 'theme-ui'

const serializers = {
  types: {
    block (props) {
      switch (props.node.style) {
        default:
          return <Styled.p>{props.children}</Styled.p>
      }
    }
  }
}

const BlockText = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockText
