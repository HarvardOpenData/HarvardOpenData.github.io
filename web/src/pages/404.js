/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import SEO from '../components/seo'
import Container from '../components/layout'
import Layout from '../containers/layout'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <Styled.h1>Not found</Styled.h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <div>Insert something cute here!</div>
    </Container>
  </Layout>
)

export default NotFoundPage
