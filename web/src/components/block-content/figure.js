import React from 'react'
import { Image, Text } from 'theme-ui'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'

function Figure (props) {
  return (
    <fig>
      {props.asset && (
        <Image
          src={imageUrlFor(buildImageObj(props))
            .width(1200)
            .url()}
          alt={props.alt}
        />
      )}
      <Text variant='caption'>{props.caption}</Text>
    </fig>
  )
}

export default Figure
