/** @jsx jsx */
import { jsx, Grid, Image, Styled, Text } from 'theme-ui'
import BlockText from './block-text'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

function ProfileCard({ image, name, _rawBio }) {
  return (
    <div>
      <div>
        {image && image.asset && (
          <Image
            src={imageUrlFor(buildImageObj(image))
              .width(600)
              .height(600)
              .fit('crop')
              .url()}
          />
        )}
      </div>
      <Styled.h4>{name}</Styled.h4>
      {_rawBio && (
        <Text variant="small">
          <BlockText blocks={_rawBio} />
        </Text>
      )}
    </div>
  )
}

function PeopleGrid({ items, title }) {
  return (
    <div>
      <Styled.h2>{title}</Styled.h2>
      <Grid gap={3} columns={[1, 2, 3, 3]}>
        {items.map((item, key) => (
          <ProfileCard key={key} {...item} />
        ))}
      </Grid>
    </div>
  )
}

export default PeopleGrid
