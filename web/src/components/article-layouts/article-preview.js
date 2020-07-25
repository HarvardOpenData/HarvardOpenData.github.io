/** @jsx jsx */
import { jsx, Grid, Styled, Text } from 'theme-ui'
import { format, distanceInWords, differenceInDays } from 'date-fns'
import Link from '../core/link'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import BlockText from '../core/block-text'

function PreviewText(props) {
  return (
    <div>
      <Link to={props.link}>
        {props.size == 'large'
          ? <Styled.h2>{props.title}</Styled.h2>
          : <Styled.h4 style={{ margin: '0.5em 0.5em 0.5em 0em' }}>{props.title}</Styled.h4>
        }
      </Link>
      {props._rawExcerpt && <BlockText blocks={props._rawExcerpt} />}
      {props.publishedAt && (
        <Text variant="caps">
          {differenceInDays(new Date(props.publishedAt), new Date()) > 3
            ? distanceInWords(new Date(props.publishedAt), new Date())
            : format(new Date(props.publishedAt), 'MM-DD-YYYY')}
        </Text>
      )}
    </div>
  )
}

function HorizontalArticlePreview(props) {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
  }
  return (
    <div sx={{ bg: props.container ? 'container' : '#FFFFFF' }}>
      <Grid gap={props.size == 'large' ? 4 : 3} columns={props.size == 'large' ? ['2fr 1fr'] : ['1fr 2fr']}>
        <Link to={props.link}>
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((5 / 8) * 600))
                .url()}
              sx={{
                width: '100%',
                objectFit: 'cover'
              }}
              alt={props.mainImage.alt}
            />
          )}
        </Link>
        <div sx={(props.container || props.size == 'large') && containerStyles}>
          <PreviewText {...props} />
        </div>
      </Grid>
    </div>
  )
}

function VerticalArticlePreview(props) {
  return (
    <div sx={{ bg: props.container ? 'container' : '#FFFFFF' }}>
      <Link to={props.link}>
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
      </Link>
      <div sx={props.container && {p: [2, 3]}}>
        <PreviewText {...props} />
      </div>
    </div>
  )
}

function ArticlePreview(props) {
  return props.horizontal
    ? <HorizontalArticlePreview {...props} />
    : <VerticalArticlePreview {...props} />
}

export default ArticlePreview
