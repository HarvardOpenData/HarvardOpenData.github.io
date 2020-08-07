const { format } = require("date-fns");

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges.forEach((edge, index) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/blog/${slug}/`;

    reporter.info(`Creating blog post page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { id },
    });
  });
}

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanityProject || {}).edges || [];

  projectEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/project/${slug}/`;

    reporter.info(`Creating project page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/project.js"),
      context: { id },
    });
  });
}

async function createPeoplePages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPerson(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const peopleEdges = (result.data.allSanityPerson || {}).edges || [];

  peopleEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/people/${slug}/`;

    reporter.info(`Creating profile page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/profile.js"),
      context: { id },
    });
  });
}

async function createProjectListPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanityProject || {}).edges || [];
  const projectsPerPage = 10;
  const numPages = Math.ceil(projectEdges.length / projectsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/projects` : `/projects/${i + 1}`,
      component: require.resolve("./src/templates/project-list.js"),
      context: {
        limit: projectsPerPage,
        skip: i * projectsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
}

async function createBlogListPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];
  const postsPerPage = 12;
  const numPages = Math.ceil(postEdges.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: require.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
}

async function createRedirects(graphql, actions, reporter) {
  const {createRedirect} = actions

  reporter.info(`Creating redirect page`);

  // fetch data from a collection which contains list of urls mapping for redirection
  const result = await graphql(`
    {
      allSanityRedirect(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            name
            url
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors;

  const redirectEdges = (result.data.allSanityRedirect || {}).edges || [];

  redirectEdges.forEach((edge) => {
    const slug = edge.node.slug.current;
    const url = edge.node.url;

    reporter.info(`Creating redirect page: ${url}`);

    createRedirect({ fromPath: `/${slug}/`, toPath: `${url}/`, isPermanent: true });
  });
}


exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter);
  await createProjectPages(graphql, actions, reporter);
  await createPeoplePages(graphql, actions, reporter);
  await createProjectListPages(graphql, actions, reporter);
  await createBlogListPages(graphql, actions, reporter);
  await createRedirects(graphql, actions, reporter);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;
  createFieldExtension({
    name: `defaultArray`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return [];
          }
          return source[info.fieldName];
        },
      };
    },
  });
  const typeDefs = `
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]!
    }
    type MenuLinks {
      name: String!
      link: String!
      subMenu: [SubMenu] @defaultArray
    }
    type SubMenu {
      name: String
      link: String
    }
  `;
  createTypes(typeDefs);
};
