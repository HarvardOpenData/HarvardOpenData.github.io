/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import { graphql } from "gatsby";
import BannerHeader from "../components/core/banner-header";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PreviewGrid from "../components/article-layouts/preview-grid";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Link from "../components/core/link";
import Section from "../components/core/section";
import Spacer from "../components/core/spacer";
import Pagination from "../components/core/pagination";
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

const CoverGrid = ({ nodes }) => {
  return (
    <PreviewGrid
      nodes={nodes}
      container
      featured
      featuredHorizontal
      columns={[1, 3, 3]}
    />
  );
};

const ProjectList = ({ header, showDivider, nodes }) => {
  return (
    <Section header={header} showDivider={showDivider}>
      <PreviewGrid nodes={nodes} horizontal columns={[1]} />
    </Section>
  );
};

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

  const { currentPage } = props.pageContext;
  const firstPage = currentPage === 1;
  // Temporarily geting rid of unique first page layout
  // const coverGridNodes = firstPage
  //   ? projectNodes.splice(0, Math.min(4, projectNodes.length))
  //   : [];
  const coverGridNodes = []

  return (
    <Layout>
      <SEO title="Projects" />
      <br />
      <Container>
        <Container maxWidth={"1152px"} align="left" margin="0px">
          <div>
            {coverGridNodes && coverGridNodes.length > 0 && (
              <div>
                <CoverGrid nodes={coverGridNodes} />
                <Spacer height={6} />
              </div>
            )}
            {projectNodes && projectNodes.length > 0 && (
              <Grid gap={[5, 5, 6]} columns={[1, "1fr 4fr"]}>
                <Section header="Featured">Add featured projects</Section>
                <div>
                  {!firstPage && <BannerHeader title="Past projects" />}
                  <ProjectList
                    header={firstPage && "Latest"}
                    showDivider={firstPage}
                    nodes={projectNodes}
                  />
                </div>
              </Grid>
            )}
          </div>
          <Pagination prefix="/projects" pageContext={props.pageContext} />
        </Container>
      </Container>
    </Layout>
  );
};

export default ProjectListTemplate;
