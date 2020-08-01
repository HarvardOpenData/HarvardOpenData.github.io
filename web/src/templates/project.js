import React from "react";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import Project from "../components/project-layouts/project";
import SEO from "../components/core/seo";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import Layout from "../containers/layout";

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
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
      layout
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
        }
        roles
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const project = data && data.project;
  const mainImageUrl = data.mainImage && data.mainImage.asset &&
    imageUrlFor(buildImageObj(props.mainImage))
      .width(600)
      .height(Math.floor((5 / 8) * 600))
      .url();

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {project &&
        <SEO
          title={project.title || "Untitled Project"}
          description={project._rawExcerpt || null}
          image={mainImageUrl}
        />
      }
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} />}
    </Layout>
  );
};

export default ProjectTemplate;
