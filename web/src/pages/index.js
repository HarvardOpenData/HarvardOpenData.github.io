import React from "react";
import { graphql } from "gatsby";
import { Grid, Divider } from "theme-ui";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-layouts/blog-post-preview-grid";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import ArticlePreview from "../components/article-layouts/article-preview";
import ProjectPreviewGrid from "../components/project-layouts/project-preview-grid";
import SEO from "../components/core/seo";
import Section from "../components/core/section";
import Layout from "../containers/layout";
import PreviewGrid from "../components/article-layouts/preview-grid";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanityProject(
      limit: 10
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
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
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }

    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
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
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
    : [];
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const ProjectPreviews = (nodes) => {
    const featuredArticle = nodes.nodes.shift();
    return (
      <div>
        <ArticlePreview
          {...featuredArticle}
          link={`/project/${featuredArticle.slug.current}`}
          container
          horizontal
          size="large"
          headerAs="h2"
        />
        <br />
        <ProjectPreviewGrid
          nodes={nodes.nodes}
          container
          browseMoreHref="/projects/"
        />
      </div>
    );
  };

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <br />
        <Grid gap={5} columns={[1, 1, "3fr 1fr"]}>
          {projectNodes && (
            <PreviewGrid
              nodes={projectNodes}
              featured
              featuredHorizontal
              container
              browseMoreHref="/projects/"
            />
          )}
          <div>
            <Section header={"Predictions updates"}>Section content</Section>
            <Section header={"Another section"}>Another section</Section>
          </div>
        </Grid>
        {/* {postNodes && (
          <BlogPostPreviewGrid
            title="Latest blog posts"
            nodes={postNodes}
            browseMoreHref="/blog/"
          />
        )} */}
      </Container>
    </Layout>
  );
};

export default IndexPage;
