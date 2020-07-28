/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PeopleGrid from "../components/people-grid";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query PeoplePageQuery {
    contributors: allSanityPerson(
      filter: { position: {group: {eq: "Contributors"}}}
    )
    {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          name
          _rawBio(resolveReferences: { maxDepth: 5 })
          slug {
            current
          }
          house
          position {
            title
            group
          }
        }
      }
    }
    board: allSanityBoard
    {
      edges {
        node {
          title
          members {
            _key
            id
            image {
              asset {
                _id
              }
            }
            name
            _rawBio(resolveReferences: { maxDepth: 5 })
            slug {
              current
            }
            house
            position {
              title
              group
            }
          }
        }
      }
    }
    faculty: allSanityPerson(filter: {position: {group: {eq: "Mentors"}}})
    {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          name
          _rawBio(resolveReferences: { maxDepth: 5 })
          slug {
            current
          }
          house
          position {
            title
            group
          }
        }
      }
    }
    alumni: allSanityPerson(filter: {position: {title: {eq: "Alumni"}}})
    {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          name
          _rawBio(resolveReferences: { maxDepth: 5 })
          slug {
            current
          }
          house
          position {
            title
            group
          }
        }
      }
    }
    bootcampers: allSanityPerson(filter: {position: {title: {eq: "Bootcampers"}}})
    {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          name
          _rawBio(resolveReferences: { maxDepth: 5 })
          slug {
            current
          }
          house
          position {
            title
            group
          }
        }
      }
    }
  }
`;

const PeoplePage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  // Commented page query, since we're only pulling content from the people object for now
  // const page = data && data.page;
  // if (!page) {
  //   throw new Error(
  //     'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
  //   );
  // }

  const boardNodes = 
    data &&
    data.board && 
    data.board.edges[0].node.members

  const contributorNodes =
    data &&
    data.contributors &&
    mapEdgesToNodes(data.contributors).filter(filterOutDocsWithoutSlugs);

  const alumniNodes =
    data &&
    data.alumni &&
    mapEdgesToNodes(data.alumni).filter(filterOutDocsWithoutSlugs);

  const facultyNodes =
    data &&
    data.faculty &&
    mapEdgesToNodes(data.faculty).filter(filterOutDocsWithoutSlugs);
  
   const bootcamperNodes =
    data &&
    data.bootcampers &&
    mapEdgesToNodes(data.bootcampers).filter(filterOutDocsWithoutSlugs);

  return (
    <Layout>
      <SEO title={"People"} />
      <Container>
        {boardNodes && boardNodes.length > 0 && (
          <PeopleGrid items={boardNodes} title="Board" />
        )}
        {facultyNodes && facultyNodes.length > 0 && (
          <PeopleGrid items={facultyNodes} title="Faculty Mentors" />
        )}
        {contributorNodes && contributorNodes.length > 0 && (
          <PeopleGrid items={contributorNodes} title="Contributors" />
        )}
        {bootcamperNodes && bootcamperNodes.length > 0 && (
          <PeopleGrid items={bootcamperNodes} title="Bootcampers" />
        )}
        {alumniNodes && alumniNodes.length > 0 && (
          <PeopleGrid items={alumniNodes} title="Alumni" />
        )}
      </Container>
    </Layout>
  );
};

export default PeoplePage;
