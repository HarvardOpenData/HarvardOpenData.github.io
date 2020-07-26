/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import SEO from "../components/core/seo";
import Container from "../components/core/container";
import Layout from "../containers/layout";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <Styled.h1>Not found</Styled.h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <p>[Add a fun graphic so people feel less sad]</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
