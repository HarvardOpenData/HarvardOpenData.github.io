/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Preview from "../components/block-content/preview"
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query ParticipatePageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)participate/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const ParticipatePage = (props) => {
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
      'Missing "Participate" page data. Open the studio at http://localhost:3333 and add "Participate" page data and restart the development server.'
    );
  }

  const blocks = page._rawBody || [];
  console.log("blocks", blocks);

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <Preview blocks={[blocks[0]]} />
        <Grid gap={4} columns={[1, 2, 4]}>
          {blocks.map(block => <Preview {...block} headerAs="h2" />)}
        </Grid>
      </Container>
    </Layout>
  );
};

export default ParticipatePage;
