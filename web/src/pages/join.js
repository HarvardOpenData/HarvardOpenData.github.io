/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEOContainer from "../components/core/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query JoinPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)join/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const JoinPage = (props) => {
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
      'Missing "Join" page data. Open the studio at http://localhost:3333 and add "Join" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEOContainer title={page.title} />
      <Container>
        <Grid gap={5} columns={[1, 1, 2]}>
          <BlockContent blocks={(page._rawBody && page._rawBody[0]) || []} />
          <BlockContent
            blocks={(page._rawBody && page._rawBody.slice(1)) || []}
          />
        </Grid>
      </Container>
    </Layout>
  );
};

export default JoinPage;
