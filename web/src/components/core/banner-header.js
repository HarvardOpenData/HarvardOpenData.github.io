/** @jsx jsx */
import { jsx, AspectImage, Styled } from 'theme-ui'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'

const BannerHeader = ({ title, image }) => {
  const imageUrl = image
    ? imageUrlFor(buildImageObj(image))
    : require('../../assets/default-banner.png')

  return (
    <div sx={{position: 'relative', mt: 4, mb: 4}}>
      <AspectImage
        ratio={7}
        src={imageUrl}
        sx={{userSelect: 'none'}}
      />
      <Styled.h2
        sx={{
          margin: '0px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          verticalAlign: 'middle',
          pl: [3, 3, 4]
        }}
      >
        {title}
      </Styled.h2>
    </div>
  )
}

export default BannerHeader
