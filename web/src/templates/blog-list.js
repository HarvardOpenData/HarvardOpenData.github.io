/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import ProjectPreviewGrid from "../components/project-layouts/project-preview-grid";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import Pagination from "../components/core/pagination";
import SEO from "../components/core/seo";
import Spacer from "../components/core/spacer";
import Layout from "../containers/layout";

export const query = graphql`
  query BlogListPageQuery($skip: Int!, $limit: Int!) {
    posts: allSanityPost(
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
          _rawMembers(resolveReferences: {maxDepth: 5})
          slug {
            current
          }
          categories {
            _id
            title
          }
        }
      }
    }
  }
`;

const BlogListTemplate = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <Styled.h1>HODP Blog</Styled.h1>
        <Styled.p>For the fun stuff.</Styled.p>
        <Spacer height={4}/>
        {postNodes && postNodes.length > 0 && (
          <ProjectPreviewGrid nodes={postNodes} type="blog" />
        )}
        <Pagination prefix="/blog" pageContext={props.pageContext} />
      </Container>
    </Layout>
  );
};

export default BlogListTemplate;
