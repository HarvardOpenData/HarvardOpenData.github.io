/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Section from "../components/core/section";
import Login from "../components/users/login";
import GatedContent from "../components/users/gated-content";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query SurveysPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)surveys/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
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
        <Grid gap={[4, 5, 6]} columns={[1, 1, "3fr 1fr"]}>
          <div>
            <Styled.h1>Survey Group</Styled.h1>
            <Login />
            <GatedContent
              renderPublic={() => <div>Hello generic person</div>}
              renderPrivate={(user) => <div>Hello {user.displayName}</div>}
            />
            <BlockContent blocks={page._rawBody || []} />
          </div>
          <Section header="Survey Projects" className="small preview">
            <BlockContent blocks={page._rawBodySecondary || []} />
          </Section>
        </Grid>
      </Container>
    </Layout>
  );
};

export default SurveysPage;
