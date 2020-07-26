/** @jsx jsx */
import { jsx, Grid, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import ArticleHeader from './article-header'
import ArticleSidebar from "./article-sidebar";
import BlockContent from "../block-content";
import Container from "../core/container";

function DefaultHeader(props) {
  const {
    _rawExcerpt,
    title,
    mainImage,
    members,
    authors,
    publishedAt,
  } = props;
  return (
    <Container>
      <Grid
        pt={3}
        gap={[3, 4, 5]}
        columns={[1, "1fr 1fr", "2.5fr 1fr"]}
      >
        {props.mainImage && mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
            sx={{ maxWidth: "100%", mb: [3, 0, 0]}}
          />
        )}
        <div sx={{ display: "flex", alignItems: "center" }}>
          <ArticleHeader {...props} />
        </div>
      </Grid>
    </Container>
  );
}

function DefaultArticle(props) {
  const {
    _rawBody,
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
  return (
    <article>
      <DefaultHeader {...props} />
      <Container>
        <Grid sx={{ mt: 4 }} gap={[3, 4, 5]} columns={[1, "2.5fr 1fr"]}>
          <div sx={{ margin: ['0 auto'], maxWidth: '640px' }}>
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <div sx={{ maxWidth: ['100%', 8] }}>
            <ArticleSidebar {...defaultSidebarProps} /> 
          </div>
        </Grid>
      </Container>
    </article>
  );
}

export default DefaultArticle;
