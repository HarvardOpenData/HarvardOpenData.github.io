import React from "react";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import BlogPost from "../components/blog-layouts/blog-post";
import { toPlainText } from "../lib/helpers"
import { previewImageUrlFor } from "../lib/image-url";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      subjects {
        _id
        title
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        person {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
        }
        roles
      }
    }
  }
`;

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;
  const mainImageUrl = post && previewImageUrlFor(post.mainImage);
  
  console.log(mainImageUrl)

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {post &&
        <SEO
          title={post.title || "Untitled Post"}
          description={toPlainText(post._rawExcerpt) || null}
          image={mainImageUrl}
        />
      }

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost {...post} />}
    </Layout>
  );
};

export default BlogPostTemplate;
