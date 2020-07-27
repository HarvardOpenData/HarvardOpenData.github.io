/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PreviewGrid from "../components/article-layouts/preview-grid";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
query ProjectListPageQuery($skip: Int!, $limit: Int!) {
  projects: allSanityProject(
    limit: $limit
    skip: $skip
    sort: { fields: [publishedAt], order: DESC }
  ) {
    edges {
      node {
        id
        publishedAt
        mainImage {
          asset {
            _id
          }
          alt
        }
        title
        _rawExcerpt
        slug {
          current
        }
      }
    }
  }
}
`;

const ProjectListTemplate = (props) => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const projectNodes =
    data &&
    data.projects &&
    mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);
  return (
    <Layout>
      <SEO title="Projects" />
      <br />
      <Container maxWidth={"1152px"}>
        {projectNodes && projectNodes.length > 0 && (
          <PreviewGrid
            nodes={projectNodes}
            container
            featuredHorizontal
            columns={[1, 3, 3]}
          />
        )}
      </Container>
    </Layout>
  );
};

export default ProjectListTemplate;
