/** @jsx jsx */
import { useState } from "react";
import { Box, Button, Card, Flex, Grid, Input, jsx, Text } from "theme-ui";
import {
  Configure,
  connectHits,
  connectPagination,
  createConnector,
  InstantSearch,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import qs from "qs";
import { graphql, navigate } from "gatsby";
import Layout from "../containers/layout";
import ArticlePreview from "../components/article-layouts/article-preview";
import BlockContent from "../components/block-content";
import SEO from "../components/core/seo";
import Link from "../components/core/link";
import Container from "../components/core/container";
import Section from "../components/core/section";
import Spacer from "../components/core/spacer";
import GraphQLErrorList from "../components/core/graphql-error-list";
import ProfileBio from "../components/people-layouts/profile-bio";

const DEBOUNCE_TIME = 400;
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_TOKEN
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

const createURL = (state) => {
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    state.refinementList &&
    state.refinementList.brand.length === 0 &&
    state.menu &&
    !state.menu.categories;

  if (isDefaultRoute) {
    return "";
  }

  const queryParameters = {};

  if (state.attributeForMyQuery) {
    queryParameters.query = encodeURIComponent(state.attributeForMyQuery);
  }
  if (state.page !== 1) {
    queryParameters.page = state.page;
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: "repeat",
  });

  return `/search/${queryString}`;
};

const searchStateToUrl = (searchState) =>
  searchState ? createURL(searchState) : "";

const urlToSearchState = (location) => {
  const { query = "", page = 1 } = qs.parse(location.search.slice(1));

  return {
    attributeForMyQuery: decodeURIComponent(query),
    page,
  };
};

const SearchPage = (props) => {
  const { data, errors } = props;
  const [searchState, setSearchState] = useState(
    urlToSearchState(props.location)
  );
  const [debouncedSetState, setDebouncedSetState] = useState(null);

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
      'Missing "Search" page data. Open the studio at http://localhost:3333 and add "Search" page data and restart the development server.'
    );
  }

  const onSearchStateChange = (updatedSearchState) => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        navigate(searchStateToUrl(updatedSearchState), {
          state: updatedSearchState,
        });
      }, DEBOUNCE_TIME)
    );

    setSearchState(updatedSearchState);
  };

  return (
    <Layout isSearch={true}>
      <SEO title={page.title} />
      <Container>
        <Grid gap={[5, 5, 6]} columns={[1, "4fr 1fr"]}>
          <InstantSearch
            indexName="HODP_Sanity"
            searchClient={searchClient}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
            createURL={createURL}
          >
            <Box>
              <ConnectedSearchBox />
              <Configure hitsPerPage={10} />
              <Spacer height={4} />
              <CustomHits />
              <Spacer height={4} />
              <CustomPagination />
            </Box>
          </InstantSearch>
          <Section header="Featured" showDivider={false}>
            <br />
            <BlockContent blocks={page._rawBodySecondary || []} />
          </Section>
        </Grid>
      </Container>
    </Layout>
  );
};

const connectWithQuery = createConnector({
  displayName: "WidgetWithQuery",
  getProvidedProps(props, searchState) {
    // Since the `attributeForMyQuery` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.attributeForMyQuery || "";

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    // When the `attributeForMyQuery` state entry changes, we update the query
    return searchParameters.setQuery(searchState.attributeForMyQuery || "");
  },
  cleanUp(props, searchState) {
    // When the widget is unmounted, we omit the entry `attributeForMyQuery`
    // from the `searchState`, then on the next request the query will
    // be empty
    const { attributeForMyQuery, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

const MySearchBox = ({ currentRefinement, refine }) => (
  <Input
    placeholder={"Search"}
    value={currentRefinement}
    onChange={(e) => refine(e.currentTarget.value)}
  />
);

const ConnectedSearchBox = connectWithQuery(MySearchBox);

const DataItem = ({ title, description, downloadURL, sourceURL }) => (
  <Card
    sx={{
      mt: 3,
      borderRadius: 5,
      backgroundColor: "light",
      padding: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    }}
  >
    <Flex>
      <Box>
        <Spacer height={3} />
        <Text variant="h3">{title}</Text>
        <Text variant="caption">{description}</Text>
      </Box>
    </Flex>
    <Spacer height={3} />
    <Button bg="deep">
      <Link variant="outbound" href={sourceURL}>
        <Text variant="small">
          <b>Source site</b>
        </Text>
      </Link>
    </Button>
    <Button>
      <Link variant="outbound" href={downloadURL}>
        <Text variant="small">
          <b>Download</b>
        </Text>
      </Link>
    </Button>
  </Card>
);

const Hits = ({ hits }) => (
  <Grid columns={1}>
    {hits.map((hit) => {
      switch (hit.type) {
        case "person":
          return <ProfileBio data={hit} />;
        case "dataset":
          return <DataItem {...hit} />;
        default:
          return (
            <ArticlePreview
              horizontal={true}
              link={hit.slug.current}
              {...hit}
            />
          );
      }
    })}
  </Grid>
);

const CustomHits = connectHits(Hits);

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
  <div className="pagination" style={{ textAlign: "center" }}>
    {currentRefinement > 3 && (
      <Button
        color="text"
        bg="white"
        href={createURL(currentRefinement - 1)}
        onClick={(event) => {
          event.preventDefault();
          refine(1);
        }}
      >
        <b>{` First `}</b>
      </Button>
    )}
    {currentRefinement !== 1 && (
      <Button
        color="text"
        bg="white"
        href={createURL(currentRefinement - 1)}
        onClick={(event) => {
          event.preventDefault();
          refine(currentRefinement - 1);
        }}
      >
        <b>{`← Previous `}</b>
      </Button>
    )}
    {new Array(nbPages < 5 ? nbPages : 5).fill(null).map((_, index) => {
      let shift = currentRefinement - 1;
      if (currentRefinement < 3) {
        shift = 2;
      } else if (currentRefinement > nbPages - 2) {
        shift = nbPages - 3;
      }
      const page = shift + index - 1;
      const style = {
        border: (theme) =>
          currentRefinement === page && `1px solid ${theme.colors.text}`,
        ":hover": {
          bg: "container",
        },
        ":focus": {
          outline: "none",
          boxShadow: "none",
        },
      };

      return (
        <Button
          key={index}
          color="text"
          bg="white"
          sx={style}
          href={createURL(page)}
          onClick={(event) => {
            event.preventDefault();
            refine(page);
          }}
        >
          <b>{page}</b>
        </Button>
      );
    })}
    {currentRefinement !== nbPages && (
      <Button
        color="text"
        bg="white"
        href={createURL(currentRefinement + 1)}
        onClick={(event) => {
          event.preventDefault();
          refine(currentRefinement + 1);
        }}
      >
        <b>{` Next →`}</b>
      </Button>
    )}
    {currentRefinement < nbPages - 2 && (
      <Button
        color="text"
        bg="white"
        href={createURL(currentRefinement + 1)}
        onClick={(event) => {
          event.preventDefault();
          refine(nbPages);
        }}
      >
        <b>{` Last `}</b>
      </Button>
    )}
  </div>
);

const CustomPagination = connectPagination(Pagination);

export default SearchPage;
