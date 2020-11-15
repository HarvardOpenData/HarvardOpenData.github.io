/** @jsx jsx */
import { Box, Grid, jsx } from "theme-ui";
import {
  ClearRefinements,
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import { graphql } from "gatsby";
import Layout from "../containers/layout";
import SEO from "../components/core/seo";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import PropTypes from "prop-types";

const searchClient = algoliasearch(
  "QCACO3FFKP",
  "5e093fa7c6aa1fc410cce68c146fda00"
);

export const query = graphql`
  query SearchPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)search/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const SearchPage = (props) => {
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
      'Missing "Participate" page data. Open the studio at http://localhost:3333 and add "Participate" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <InstantSearch indexName="HODP_Sanity" searchClient={searchClient}>
          <Grid gap={4} columns={[1, "3fr 5fr"]}>
            <Box>
              <ClearRefinements />
              <h2>Brands</h2>
              <RefinementList attribute="brand" />
              <Configure hitsPerPage={8} />
            </Box>
            <Box>
              <SearchBox />
              <Hits hitComponent={Hit} />
              <Pagination />
            </Box>
          </Grid>
        </InstantSearch>
      </Container>
    </Layout>
  );
};

function Hit(props) {
  console.log(props);
  return (
    <div>
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default SearchPage;
