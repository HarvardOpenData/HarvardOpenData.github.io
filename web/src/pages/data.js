/** @jsx jsx */
import {
  jsx,
  Styled,
  Flex,
  Card,
  Box,
  Text,
  Button,
  Link,
  Input,
} from "theme-ui";
import { graphql } from "gatsby";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useState } from "react";
import * as JsSearch from "js-search";

export const query = graphql`
  query DataPageQuery {
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

  return (
    <Layout>
      <SEO title="Data" />
      <Container>
        <BannerHeader title={"Data"} />
        <Styled.p>
          This is Harvard's first open data catalog, featuring dozens of
          publicly-available datasets from around Harvard University – with many
          more to come!
        </Styled.p>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Flex>
          <DataCategories
            subjects={subjects}
            activeCategories={activeCategories}
            setActiveCategory={setActiveCategory}
          />
          <DataList
            items={items}
            activeCategories={activeCategories}
            searcher={searcher}
            searchTerm={searchTerm}
          />
        </Flex>
      </Container>
    </Layout>
  );
};

const DataList = (props) => {
  const { items, activeCategories, searcher, searchTerm } = props;

  return (
    <div sx={{}}>
      {activeCategories.length == 0
        ? searchTerm == ""
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
    <div sx={{ width: "20%" }}>
      <Styled.h4>Categories</Styled.h4>
      <Styled.hr />
      {subjects.map((subject) => {
        const { title } = subject;
        const included_idx = activeCategories.findIndex(
          (category) => category == title
        );
        const included = included_idx != -1;
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
                  (category) => category != title
                );
              }
              setActiveCategory(newActiveCategories);
            }}
          >
            {title}
          </Card>
        );
      })}
    </div>
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

  return (
    <Card
      sx={{
        maxWidth: "90%",
        margin: 3,
        borderRadius: 5,
        backgroundColor: "light",
        padding: 4,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      }}
    >
      <Flex>
        <Box>
          <Styled.h3>{title}</Styled.h3>
          <Text variant="caption">{description}</Text>
        </Box>
      </Flex>
      <Styled.hr />
      <Button
        variant="tag"
        sx={{
          backgroundColor: "deep",
        }}
      >
        <Link variant="outbound" href={sourceURL}>
          Source site
        </Link>
      </Button>
      <Button
        variant="tag"
        sx={{
          backgroundColor: "deep",
        }}
      >
        <Link variant="outbound" href={downloadURL}>
          Download
        </Link>
      </Button>
      {subjects.map((subject) => (
        <Button variant="tag">{subject.title}</Button>
      ))}
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
