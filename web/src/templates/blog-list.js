/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-layouts/blog-post-preview-grid";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import Pagination from "../components/core/pagination";
import SEO from "../components/core/seo";
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
          _rawAuthors(resolveReferences: {maxDepth: 5})
          slug {
            current
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
        <BannerHeader title={"Blog"} />
        {postNodes && postNodes.length > 0 && (
          <BlogPostPreviewGrid nodes={postNodes} />
        )}
        <Pagination prefix="/blog" pageContext={props.pageContext} />
      </Container>
    </Layout>
  );
};

export default BlogListTemplate;
