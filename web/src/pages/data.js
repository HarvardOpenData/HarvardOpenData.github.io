/** @jsx jsx */
import { jsx, Styled, Grid, Card, Box, Text, Button, Link } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useState } from "react";
import { active } from "d3-transition";

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

const DataPage = props => {
  const { data, errors } = props;

  // Ok, this really should come after the error check, but React is crying
  // about rules of hooks otherwise, so...
  const items = mapEdgesToNodes(data.datasets);
  const subjects = mapEdgesToNodes(data.subjects);
  const [activeCategory, setActiveCategory] = useState(subjects[0].title);

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
        <Grid gap={2} columns={[2, "1fr 4fr"]}>
          <DataCategories
            subjects={subjects}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <DataList items={items} activeCategory={activeCategory} />
        </Grid>
      </Container>
    </Layout>
  );
};

const DataList = props => {
  const { items, activeCategory } = props;

  return (
    <div>
      {items.map(item => {
        if (
          !item.subjects.map(subject => subject.title).includes(activeCategory)
        ) {
          return <div></div>;
        }
        return <DataItem {...item} />;
      })}
    </div>
  );
};

const DataCategories = props => {
  const { subjects, activeCategory, setActiveCategory } = props;
  return (
    <div>
      <Styled.h4>Categories</Styled.h4>
      <Styled.hr />
      {subjects.map(subject => {
        const { title } = subject;
        return (
          <Card
            variant="list"
            sx={{
              backgroundColor: title === activeCategory ? "primary" : "inherit"
            }}
            onClick={() => setActiveCategory(title)}
          >
            {title}
          </Card>
        );
      })}
    </div>
  );
};

const DataItem = props => {
  const {
    title,
    description,
    downloadURL,
    fileType,
    sourceURL,
    subjects
  } = props;

  return (
    <Card
      sx={{
        maxWidth: "90%",
        margin: 3,
        borderRadius: 5,
        backgroundColor: "light",
        padding: 4,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)"
      }}
    >
      <Grid gap={2} columns={[2, "3fr 1fr"]}>
        <Box>
          <Styled.h3>{title}</Styled.h3>
          <Text variant="caption">{description}</Text>
        </Box>
        <Box
          sx={{
            "text-align": "right"
          }}
        >
          <Button variant="catalog" sx={{ maxWidth: "75%", maxHeight: "75%" }}>
            <Link
              sx={{
                color: "inherit",
                fontWeight: "bold",
                textDecoration: "none",
                "&.active": {
                  color: "primary"
                },
                ":hover": {
                  textDecoration: "underline"
                }
              }}
              href={downloadURL}
            >
              Download
            </Link>
          </Button>
        </Box>
      </Grid>
      <Styled.hr />
      <Button
        sx={{
          variant: "buttons.tag",
          backgroundColor: "secondary",
          fontWeight: "bold"
        }}
      >
        <Link href={sourceURL}>Source site</Link>
      </Button>
      {subjects.map(subject => (
        <Button variant="tag">{subject.title}</Button>
      ))}
    </Card>
  );
};
export default DataPage;
