/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/core/container'
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
      <SEO title="Data" />
      <Container>
        <Styled.h1>Data</Styled.h1>
        <div>[Insert data catalog components here]</div>
      </Container>
    </Layout>
  )
}

export default DataPage
