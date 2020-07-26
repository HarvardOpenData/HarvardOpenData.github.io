/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import ArticleHeader from "./article-header";
import ArticleSidebar from "./article-sidebar";
import BlockContent from "../block-content";
import Container from "../core/container";

function ArticleBody(props) {
  const {
    _rawExcerpt,
    _rawBody,
    authors,
    members,
    categories,
    subjects,
    publishedAt,
    relatedProjects,
    title,
    showHeader,
  } = props;
  const headerProps = {
    _rawExcerpt,
    title,
    members,
    authors,
    publishedAt,
  };
  const defaultSidebarProps = {
    authors,
    members,
    categories,
    subjects,
    relatedProjects,
  };

  return (
    <div>
      <Container>
        <Grid sx={{ mt: 4 }} gap={[3, 4, 5]} columns={[1, "2.5fr 1fr"]}>
          <div sx={{ margin: ["0 auto"], maxWidth: "640px" }}>
            {showHeader && <ArticleHeader {...headerProps} />}
            <br />
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <div sx={{ maxWidth: ["100%", 8] }}>
            <ArticleSidebar {...defaultSidebarProps} />
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default ArticleBody;
