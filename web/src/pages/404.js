/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import SEO from "../components/core/seo";
import Container from "../components/core/container";
import Layout from "../containers/layout";
import Login from "../components/users/login";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <Styled.h1>Not found</Styled.h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <iframe
        src="https://giphy.com/embed/j8p5vtTax8HTO"
        width="480"
        height="240"
        frameBorder="0"
        allowFullScreen
      />
      <Login />
    </Container>
  </Layout>
);

export default NotFoundPage;
