/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import firebase from "gatsby-plugin-firebase";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEOContainer from "../components/core/seo";
import Layout from "../containers/layout";
import Login from "../components/users/login";
import PredictionsGame from "../components/predictions/predictions-game";

export const query = graphql`
  query PredictionsPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)predictions/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const PredictionsPage = (props) => {
  const { data, errors } = props;
  const { auth } = firebase;
  const [user, setUser] = useState();
  useEffect(() => auth().onAuthStateChanged(setUser), [auth]);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;

  if (!page) {
    throw new Error(
      'Missing "Predictions" page data. Open the studio at http://localhost:3333 and add "Predictions" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEOContainer title={page.title} />
      <Container>
        {user && user.email.endsWith("harvard.edu") ? (
          <div>
            <Styled.h1>{page.title}</Styled.h1>
            <PredictionsGame user={user} />
          </div>
        ) : (
          <div>
            <Styled.h1>{page.title}</Styled.h1>
            <Grid gap={[4, 5, 6]} columns={[1, 1, "2.5fr 1fr"]}>
              <div>
                <Login />
                <BlockContent blocks={page._rawBody || []} />
                <BannerHeader />
              </div>
              <div className="small preview" sx={{ p: 4, bg: "pink" }}>
                <BlockContent blocks={page._rawBodySecondary || []} />
              </div>
            </Grid>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default PredictionsPage;
