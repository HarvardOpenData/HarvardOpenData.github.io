import React from "react";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import ProfileBio from "../components/people-layouts/profile-bio.js"
import ProfileProjects from "../components/people-layouts/profile-projects";


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
        <br></br>
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
            {profile && <ProfileBio data={profile}></ProfileBio>}
            {profile && <ProfileProjects data={profile}/>}
        </Container>
    </Layout>
  );
};

export default ProfileTemplate;