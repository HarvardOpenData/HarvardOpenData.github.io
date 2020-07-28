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
    people: allSanityPerson
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

  const personNodes =
    data &&
    data.people &&
    mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs);

  return (
    <Layout>
      <SEO title={"People"} />
      <Container>
        {personNodes && personNodes.length > 0 && (
          <PeopleGrid items={personNodes} title="People" />
        )}
      </Container>
    </Layout>
  );
};

export default PeoplePage;
