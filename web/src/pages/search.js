/** @jsx jsx */
import React, { useState } from "react";
import { Button, Card, Divider, Grid, Input, jsx, Styled } from "theme-ui";
import {
  Configure,
  connectHits,
  connectMenu,
  connectPagination,
  createConnector,
  InstantSearch,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import qs from "qs";
import { graphql, navigate } from "gatsby";
import Layout from "../containers/layout";
import ArticlePreview from "../components/article-layouts/article-preview";
import ProfileBio from "../components/people-layouts/profile-bio";
import DatasetPreview from "../components/search-layouts/dataset-preview";
import BlockContent from "../components/block-content";
import SEO from "../components/core/seo";
import Container from "../components/core/container";
import Section from "../components/core/section";
import Spacer from "../components/core/spacer";
import GraphQLErrorList from "../components/core/graphql-error-list";

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
        <Styled.h1>Search</Styled.h1>
        <Spacer height={4} />
        <InstantSearch
          indexName="HODP_Sanity"
          searchClient={searchClient}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        >
          <Grid gap={[3, 5]} columns={[1, "4fr 1fr"]}>
            <div>
              <ConnectedSearchBox />
              <Spacer height={4} />
              <Grid gap={[3, 5]} columns={[1, "1fr 3fr"]}>
                <ConnectedMenu attribute={"type"} />
                <div>
                  <Configure hitsPerPage={10} />
                  <CustomHits />
                  <CustomPagination />
                </div>
              </Grid>
            </div>
            <Section header="Featured" showDivider={false}>
              <br />
              <BlockContent blocks={page._rawBodySecondary || []} />
            </Section>
          </Grid>
        </InstantSearch>
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

const Menu = ({ items, refine }) => (
  <Section header="Categories">
    {items.map((item) => (
      <Card
        key={item.value}
        variant="list"
        sx={{
          backgroundColor: item.isRefined ? "primary" : "inherit",
          color: item.isRefined ? "background" : "inherit",
          wordWrap: "break-word",
          "&:hover": {
            bg: item.isRefined ? "primary" : "muted",
          },
          ":first-letter": {
            textTransform: "capitalize",
          },
        }}
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
        }}
      >
        {item.label} ({item.count})
      </Card>
    ))}
  </Section>
);

const ConnectedMenu = connectMenu(Menu);

const Hits = ({ hits }) => (
  <Grid columns={1} gap={4}>
    {hits.map((hit, index, array) => {
      let preview;
      switch (hit.type) {
        case "person":
          preview = <ProfileBio {...hit} />;
          break;
        case "dataset":
          preview = <DatasetPreview {...hit} />;
          break;
        default:
          preview = (
            <ArticlePreview
              horizontal={true}
              link={hit.slug.current}
              {...hit}
            />
          );
      }
      return (
        <React.Fragment key={index}>
          {preview}
          {index !== array.length - 1 && <Divider mb={3} />}
        </React.Fragment>
      );
    })}
  </Grid>
);

const CustomHits = connectHits(Hits);

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) =>
  nbPages > 1 && (
    <div>
      <Spacer height={4} />
      <div className="pagination" style={{ textAlign: "center" }}>
        {currentRefinement > 3 && (
          <Button
            color="text"
            bg="white"
            href={createURL(1)}
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
            href={createURL(nbPages)}
            onClick={(event) => {
              event.preventDefault();
              refine(nbPages);
            }}
          >
            <b>{` Last `}</b>
          </Button>
        )}
      </div>
    </div>
  );

const CustomPagination = connectPagination(Pagination);

export default SearchPage;
