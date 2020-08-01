/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PeopleList from "../components/people-layouts/people-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

export const query = graphql`
  query PeoplePageQuery {
    contributors: allSanityPerson(
      filter: { 
        position: { title: { eq: "Contributor" } }
      }
      sort: { fields: [name], order: ASC }
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
          year
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
            year
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
          position {
            title
            group
          }
        }
      }
    }
    founder: allSanityPerson(
      filter: {
        position: { title: { eq: "Founder and President Emeritus"}}
      }
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
    boardEmeritus: allSanityPerson(
      filter: { 
        position: { title: { eq: "Board Emeritus" } }
      }
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
          year
        }
      }
    }
  }
`;

// TODO could query for current year's board and allow them to store past years in sanity as well

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

  var boardNodes = 
    data &&
    data.board && 
    data.board.edges[0].node.members

  var contributorNodes =
    data &&
    data.contributors &&
    mapEdgesToNodes(data.contributors).filter(filterOutDocsWithoutSlugs);
  
  // Returns a list of current contributors and a list of alumni
  // Gatsby unforunately does not allow string interpolation in our graphql queries
  // unless we're doing page generation
  function filterAlumni(allContributors) {
    // Return today's date and time
    var currentTime = new Date()

    // returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1

    // returns the year (four digits)
    var year = currentTime.getFullYear()

    var currentContributors, alumni;

    // check if spring graduation has happened yet. May = month 4
    if (month > 4) {
      currentContributors = allContributors.filter(contributor => contributor.year > year);
      alumni = allContributors.filter(contributor => contributor.year <= year);
    } else {
      currentContributors = allContributors.filter(contributor => contributor.year >= year);
      alumni = allContributors.filter(contributor => contributor.year < year);
    }

    return [currentContributors, alumni];
  }

  var allContributors = filterAlumni(contributorNodes);
  contributorNodes = allContributors[0];
  var alumniNodes = allContributors[1];

  var founderNode =
    data && 
    data.founder &&
    mapEdgesToNodes(data.founder).filter(filterOutDocsWithoutSlugs);
  
  var boardEmeritusNodes =
    data &&
    data.boardEmeritus && 
    mapEdgesToNodes(data.boardEmeritus).filter(filterOutDocsWithoutSlugs);

  boardEmeritusNodes = founderNode.concat(boardEmeritusNodes);


  var facultyNodes =
    data &&
    data.faculty &&
    mapEdgesToNodes(data.faculty).filter(filterOutDocsWithoutSlugs);

  return (
    <Layout>
      <Container>
        <SEO title={"People"} />
      </Container>
        <PeopleList
          board={boardNodes}
          faculty={facultyNodes}
          contributors={contributorNodes}
          boardEmeritus={boardEmeritusNodes}
          alumni={alumniNodes}
          />
    </Layout>
  );
};

export default PeoplePage;
