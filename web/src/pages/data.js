/** @jsx jsx */
import {
  jsx,
  Styled,
  Badge,
  Flex,
  Card,
  Box,
  Text,
  Grid,
  Button,
  Input,
} from "theme-ui";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import BlockContent from "../components/block-content";
import GraphQLErrorList from "../components/core/graphql-error-list";
import Link from "../components/core/link";
import SEO from "../components/core/seo";
import Section from "../components/core/section";
import Spacer from "../components/core/spacer";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useState } from "react";
import * as JsSearch from "js-search";

export const query = graphql`
  query DataPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)data/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
    datasets: allSanityDataset {
      edges {
        node {
          title
          description
          downloadURL
          fileType
          sourceURL
          subjects {
            title
          }
        }
      }
    }
    subjects: allSanitySubject {
      edges {
        node {
          title
        }
      }
    }
  }
`;

const DataPage = (props) => {
  const { data, errors } = props;

  // Ok, this really should come after the error check, but React is crying
  // about rules of hooks otherwise, so...
  const items = mapEdgesToNodes(data.datasets);
  const subjects = mapEdgesToNodes(data.subjects);
  const [activeCategories, setActiveCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Build searcher
  const searcher = new JsSearch.Search("title");
  searcher.addIndex("title");
  searcher.addDocuments(items);

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
      <SEO title="Data" />
      <Container>
        <Styled.h1>Data catalog</Styled.h1>
        <BlockContent blocks={page._rawBody || []} />
        <Spacer height={4} />
        <Grid gap={5} columns={[1, "1fr 3fr", "1fr 5fr"]}>
          <DataCategories
            subjects={subjects}
            activeCategories={activeCategories}
            setActiveCategory={setActiveCategory}
          />
          <div>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <DataList
              items={items}
              activeCategories={activeCategories}
              searcher={searcher}
              searchTerm={searchTerm}
            />
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};

const DataList = (props) => {
  const { items, activeCategories, searcher, searchTerm } = props;

  return (
    <div>
      {activeCategories.length === 0
        ? searchTerm === ""
          ? // Display all items if no categories are selected
            items.map((item) => <DataItem {...item} />)
          : // Display items whose titles match the search term
            searcher.search(searchTerm).map((item) => <DataItem {...item} />)
        : // Display all items tagged with all selected categories
          items.map((item) => {
            const subjects = item.subjects.map((subject) => subject.title);
            if (!activeCategories.every((v) => subjects.includes(v))) {
              return <div></div>;
            }
            return <DataItem {...item} />;
          })}
    </div>
  );
};

const DataCategories = (props) => {
  const { subjects, activeCategories, setActiveCategory } = props;
  return (
    <Section header="Categories">
      {subjects.map((subject) => {
        const { title } = subject;
        const included_idx = activeCategories.findIndex(
          (category) => category === title
        );
        const included = included_idx !== -1;
        return (
          <Card
            variant="list"
            sx={{
              backgroundColor: included ? "primary" : "inherit",
              color: included ? "background" : "inherit",
              wordWrap: "break-word",
              "&:hover": {
                bg: included ? "primary" : "muted",
              },
            }}
            onClick={() => {
              let newActiveCategories = activeCategories;
              if (!included) {
                newActiveCategories = newActiveCategories.concat([title]);
              } else {
                newActiveCategories = newActiveCategories.filter(
                  (category) => category !== title
                );
              }
              setActiveCategory(newActiveCategories);
            }}
          >
            {title}
          </Card>
        );
      })}
    </Section>
  );
};

const DataItem = (props) => {
  const {
    title,
    description,
    downloadURL,
    fileType,
    sourceURL,
    subjects,
  } = props;

  const subjectText = subjects.map((subject) => subject.title).join(", ");

  return (
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
          {subjects &&
            subjects.map((item) => (
              <Badge bg="grey" mr={2}>
                {item.title}
              </Badge>
            ))}
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
};

const SearchBox = (props) => {
  const { searchTerm, setSearchTerm } = props;

  return (
    <div>
      <Input
        value={searchTerm}
        placeholder={"Search datasets"}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
export default DataPage;
