/** @jsx jsx */
import { jsx, Grid, Styled, Text } from 'theme-ui'
import { format, distanceInWords, differenceInDays } from 'date-fns'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import ArticleSidebar from './article-sidebar'
import BlockContent from '../block-content'
import Container from '../container'
import RoleList from '../role-list'

function DefaultHeader(props) {
  const { _rawExcerpt, title, mainImage, members, authors, publishedAt } = props
  return (
    <Grid
      gap={4}
      columns={[1, '1.5fr 2fr']}
      sx={{
        marginLeft: [0, '5%', '8%', '14%'],
        marginRight: [0, '5%', '8%', '14%'],
        marginTop: ['2%', '5%']
      }}
    >
      <div sx={{ padding: [4, 0] }}>
        {publishedAt && (
          <Text variant="caps">
            {differenceInDays(new Date(publishedAt), new Date()) > 3
              ? distanceInWords(new Date(publishedAt), new Date())
              : format(new Date(publishedAt), 'MMMM Do YYYY')}
          </Text>
        )}
        {title && (
          <Styled.h2
            sx={{
              fontSize: [5, 4, 5, 6],
              marginBottom: [1],
              marginTop: [1]
            }}
          >
            {title}
          </Styled.h2>
        )}
        {_rawExcerpt && <BlockContent blocks={_rawExcerpt || []} />}
      </div>
      {props.mainImage && mainImage.asset && (
        <img
          src={imageUrlFor(buildImageObj(mainImage))
            .width(1200)
            .height(Math.floor((9 / 16) * 1200))
            .fit('crop')
            .url()}
          alt={mainImage.alt}
          sx={{
            maxWidth: '100%',
            marginTop: ['-30px', 0]
          }}
        />
      )}
    </Grid>
  )
}

function DefaultArticle(props) {
  const { _rawBody, authors, members, categories, subjects, relatedProjects } = props
  const defaultSidebarProps = { authors, members, categories, subjects, relatedProjects }
  return (
    <article>
      <DefaultHeader {...props} />
      <Container>
        <Grid gap={4} columns={[1, '3fr 1fr']}>
          <div>{_rawBody && <BlockContent blocks={_rawBody || []} />}</div>
          <ArticleSidebar {...defaultSidebarProps} />
        </Grid>
      </Container>
    </article>
  )
}

export default DefaultArticle
