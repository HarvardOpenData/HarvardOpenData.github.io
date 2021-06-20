/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import ArticleHeader from "../article-layouts/article-header";
import ArticleSidebar from "../article-layouts/article-sidebar";
import Slideshow from "../block-content/slideshow";
import Container from "../core/container";
import { DiscussionEmbed } from "disqus-react";

function ShortForm(props) {
  const {
    title,
    slideshow,
    authors,
    members,
    categories,
    subjects,
    relatedProjects,
  } = props;
  const defaultSidebarProps = {
    authors,
    members,
    categories,
    subjects,
    relatedProjects,
  };
  const disqusConfig = {
    shortname: `${process.env.DISQUS_NAME}`,
    config: {
      identifier: title,
      title: title,
    },
  };

  return (
    <div>
      <Container>
        <Grid pt={3} gap={[3, 4, 5]} columns={[1, "1fr 1fr", "2.5fr 1fr"]}>
          {slideshow && <Slideshow {...props.slideshow} />}
          <div sx={{ display: "flex", alignItems: "center" }}>
            <ArticleHeader {...props} />
          </div>
        </Grid>
        <br />
        <Grid sx={{ mt: 4 }} gap={[3, 4, 5]} columns={[1, "2.5fr 1fr"]}>
          <div
            sx={{
              margin: ["0 auto"],
              mr: [0, 0, 2],
              minWidth: [null, "640px", "640px"],
              maxWidth: "640px",
            }}
          >
            <DiscussionEmbed {...disqusConfig} />
          </div>
          <div sx={{ maxWidth: ["100%", 8] }}>
            <ArticleSidebar {...defaultSidebarProps} />
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default ShortForm;
