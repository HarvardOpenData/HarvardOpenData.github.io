/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PreviewGrid from "../components/article-layouts/preview-grid";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Link from "../components/core/link";
import Spacer from "../components/core/spacer"
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
  
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
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
        <div style={{ textAlign: "center" }}>
          {!isFirst && (
            <Link to={`/projects/${prevPage}`} rel="prev">
              <b>{`← Previous `}</b>
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <Link key={`pagination-number${i + 1}`} to={`/projects/${i === 0 ? "" : i + 1}`}>
              <b>{`   ${i + 1}   `}</b> 
            </Link>
          ))}
          {!isLast && (
            <Link to={`/projects/${nextPage}`} rel="next">
              <b>{` Next →`}</b>
            </Link>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default ProjectListTemplate;
