/** @jsx jsx */
import { jsx, Button, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PeopleGrid from "../components/people-grid";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Link from "../components/core/link"
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query AboutPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const AboutPage = (props) => {
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
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <Grid gap={5} columns={[1, 1, 2]}>
          <BlockContent blocks={(page._rawBody && page._rawBody[0]) || []} />
          <div>
            <BlockContent blocks={(page._rawBody && page._rawBody.slice(1)) || []} />
            {/* Placeholder before we implement CTAs */}
            <Link to="/people">
              <Button>Meet the team</Button>
            </Link>
            <Link to="/join">
              <Button>Join HODP</Button>
            </Link>
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AboutPage;
