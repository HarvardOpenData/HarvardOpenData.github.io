/** @jsx jsx */
import BaseBlockContent from '@sanity/block-content-to-react'
import { jsx, Styled } from 'theme-ui'

const serializers = {
  types: {
    block (props) {
      switch (props.node.style) {
        default:
          return (
            <Styled.p
              sx={{
                fontSize: [1,2]
              }}
            >
              {props.children}
            </Styled.p>
          )
      }
    }
  }
}

const BlockText = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockText
