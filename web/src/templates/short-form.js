import React from "react";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import ShortForm from "../components/project-layouts/short-form";
import SEO from "../components/core/seo";
import { toPlainText } from "../lib/helpers";
import { previewImageUrlFor } from "../lib/image-url";
import Layout from "../containers/layout";

export const query = graphql`
  query ShortFormTemplateQuery($id: String) {
    shortForm: sanityShortForm(id: { eq: $id }) {
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
      relatedProjects {
        title
        _id
        slug {
          current
        }
        _rawMainImage
        _rawExcerpt
      }
      slideshow {
        title
        slides {
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
      }
      title
      slug {
        current
      }
      _rawExcerpt
      members {
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
          slug {
            current
          }
        }
        roles
      }
    }
  }
`;

const ShortFormTemplate = (props) => {
  const { data, errors } = props;
  const shortForm = data && data.shortForm;
  const mainImageUrl =
    shortForm && previewImageUrlFor(shortForm.slideshow.slides[0]);

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {shortForm && (
        <SEO
          title={shortForm.title || "Untitled Project"}
          description={toPlainText(shortForm._rawExcerpt) || null}
          image={mainImageUrl}
        />
      )}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {shortForm && <ShortForm {...shortForm} />}
    </Layout>
  );
};

export default ShortFormTemplate;
