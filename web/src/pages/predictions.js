/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Section from "../components/core/section"
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query PredictionsPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)predictions/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const PredictionsPage = (props) => {
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
      'Missing "Predictions" page data. Open the studio at http://localhost:3333 and add "Predictions" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <Grid gap={[4, 5, 6]} columns={[1, 1, "2.5fr 1fr"]}>
          <div>
            <BannerHeader title={page.title} />
            <BlockContent blocks={page._rawBody || []} />
          </div>
          <div className="small preview" sx={{ p: 4, bg: "pink", }}>
            <BlockContent blocks={page._rawBodySecondary || []} />
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};

export default PredictionsPage;
