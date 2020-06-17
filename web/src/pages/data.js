/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/core/container'
import BannerHeader from '../components/core/banner-header'
import GraphQLErrorList from '../components/core/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

export const query = graphql`
  query DataPageQuery {
    datasets: allSanityDataset {
      edges {
        node {
          title
          description
          downloadURL
          fileType
          sourceURL
        }
      }
    }
  }
`

const DataPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title='Data' />
      <Container>
        <BannerHeader title={'Data'} />
        <div>[Insert data catalog components here]</div>
      </Container>
    </Layout>
  )
}

export default DataPage
