/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Section from "../components/core/section"
import Sponsor from "../components/sponsor"
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query SponsorsPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)sponsors/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
    sponsors: allSanitySponsor {
      edges {
        node {
          _rawImage
          _rawDescription
          link
          tier
        }
      }
    }
  }
`;

const SponsorsPage = (props) => {
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
      'Missing "Sponsors" page data. Open the studio at http://localhost:3333 and add "Sponsors" page data and restart the development server.'
    );
  }

  const sponsorNodes =
    data &&
    data.sponsors &&
    mapEdgesToNodes(data.sponsors);

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <Grid gap={[4, 5, 6]} columns={[1, 1, "2.5fr 1fr"]}>
          <div>
            <div sx={{ p: 4, bg: "muted" }}>
              <Styled.h1>Corporate sponsors</Styled.h1>
              { sponsorNodes && sponsorNodes.map(node => <Sponsor {...node} />) }
            </div>
            <BlockContent blocks={page._rawBody || []} />
          </div>
          <Section className="small preview" header="Sponsored events">
            <BlockContent blocks={page._rawBodySecondary || []} />
          </Section>
        </Grid>
      </Container>
    </Layout>
  );
};

export default SponsorsPage;
