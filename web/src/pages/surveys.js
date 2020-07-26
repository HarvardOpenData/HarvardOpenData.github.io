/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query SurveysPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)surveys/" }) {
      id
      title
      _rawBody
    }
  }
`;

const SurveysPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;

  if (!page) {
    throw new Error(
      'Missing "Surveys" page data. Open the studio at http://localhost:3333 and add "Surveys" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <BannerHeader title={page.title} />
        <BlockContent blocks={page._rawBody || []} />
      </Container>
    </Layout>
  );
};

export default SurveysPage;
