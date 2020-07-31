/** @jsx jsx */
import { jsx, Button, Grid, Styled } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import { resolveInternalLink } from "../lib/helpers"
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import Link from "../components/core/link"
import Spacer from "../components/core/spacer";

export const query = graphql`
  query AboutPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const resolveLink = (link) => {
  if (!link) {
    return null;
  }

  const { internalLink, externalLink } = link;
  return internalLink ? resolveInternalLink(internalLink) : externalLink;
}

const FeatureCard = ({header, description, link, key}) =>
  <div
    className={`feature-${key}`}
    sx={{
      height: 0,
      overflow: "hidden",
      paddingTop: "100%",
      position: "relative",
    }}
  >
    <div
      sx={{
        position: "absolute",
        p: 4,
        bg: "container",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <Link to={resolveLink(link)} href={resolveLink(link)}>
        <Styled.h2>{header}</Styled.h2>
      </Link>
      <div className={["preview", "preview", "small preview"]}>
        <BlockContent blocks={description || []} />
      </div>
    </div>
  </div>

const AboutPage = (props) => {
  const { data, errors } = props;

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
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <Grid gap={5} columns={[1, 1, 2]}>
          <BlockContent blocks={(page._rawBody && page._rawBody[0]) || []} />
          <div>
            <BlockContent blocks={(page._rawBody && page._rawBody.slice(1)) || []} />
            {/* Placeholder before we implement CTAs */}
            <Link to="/people">
              <Button>Meet the team</Button>
            </Link>
            <Link to="/join">
              <Button>Join HODP</Button>
            </Link>
          </div>
        </Grid>
      </Container>
      <Spacer height={5} />
      <div className="theme-background" >
        <Container>
          <Spacer height={5} />
          <Styled.h1>Our work</Styled.h1>
          <Grid gap={4} columns={[1, 2, 4]}>
            {page._rawBodySecondary && page._rawBodySecondary.map((block) =>
              <FeatureCard {...block} />
            )}
          </Grid>
          <Spacer height={5} />
        </Container>
      </div>
    </Layout>
  );
};

export default AboutPage;
