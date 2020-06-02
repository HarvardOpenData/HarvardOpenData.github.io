/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'

function ProjectPreview(props) {
  return (
    <Link to={`/project/${props.slug.current}`}>
      <div
        sx={{
          position: 'relative',
          paddingBottom: '66.666%',
          background: '#eee'
        }}
      >
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <Styled.h3 sx={{ marginBottom: [1] }}>{props.title}</Styled.h3>
      {props._rawExcerpt && <BlockText blocks={props._rawExcerpt} />}
    </Link>
  )
}

export default ProjectPreview
