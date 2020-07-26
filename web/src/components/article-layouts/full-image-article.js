/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import ArticleSidebar from "./article-sidebar";
import BlockContent from "../block-content";
import Container from "../core/container";

function FullImageArticle(props) {
  const {
    _rawBody,
    authors,
    categories,
    subjects,
    title,
    mainImage,
    publishedAt,
  } = props;
  return (
    <article>
      {mainImage && mainImage.asset && (
        <div>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1500)
              .height(Math.floor((9 / 16) * 1500))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
            sx={{
              width: "100%",
              verticalAlign: "top",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <Container>
        <Grid gap={4} columns={[1, "3fr 1fr"]}>
          <div>
            {title && <Styled.h1>{title}</Styled.h1>}
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <ArticleSidebar {...props} />
        </Grid>
      </Container>
    </article>
  );
}

export default FullImageArticle;
