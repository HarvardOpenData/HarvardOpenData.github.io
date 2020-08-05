import React from "react";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import ProfileCard from "../components/people-layouts/profile-card.js"

export const query = graphql`
  query ProfileTemplateQuery($id: String!) {
    people: sanityPerson(id: { eq: $id }) {
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
      concentration
    }
  }
`;

const ProfileTemplate = (props) => {
  const { data, errors } = props;
  const profile = data && data.people;
  console.log(profile);
  
  return (
    <Layout>
        <Container>
            {errors && <SEO title="GraphQL Error" />}
            {profile &&
                <SEO title={profile.name || "Unnamed Contributor"}/>
            }
            {errors && (
                <Container>
                <GraphQLErrorList errors={errors} />
                </Container>
            )}
            {profile && <ProfileCard data={profile}/>}
        </Container>
    </Layout>
  );
};

export default ProfileTemplate;