/** @jsx jsx */
import { jsx, Grid, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import Link from "../core/link";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockText from "../core/block-text";

function PreviewText(props) {
  return (
    <div>
      <Link to={props.link}>
        {props.size == "large" ? (
          <Styled.h1>{props.title}</Styled.h1>
        ) : (
          <Styled.h3 style={{ margin: "0.5em 0.5em 0.5em 0em" }}>
            {props.title}
          </Styled.h3>
        )}
      </Link>
      {props._rawExcerpt && <BlockText blocks={props._rawExcerpt} />}
      {props.publishedAt && (
        <Text variant="caps">
          {differenceInDays(new Date(props.publishedAt), new Date()) > 3
            ? distanceInWords(new Date(props.publishedAt), new Date())
            : format(new Date(props.publishedAt), "MM-DD-YYYY")}
        </Text>
      )}
      {props.children}
    </div>
  );
}

function HorizontalArticlePreview(props) {
  const containerStyles = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <div sx={{ bg: props.container ? "container" : "#FFFFFF" }}>
      <Grid
        gap={props.size == "large" ? 4 : 3}
        columns={props.size == "large" ? ["2fr 1fr"] : ["1fr 2fr"]}
      >
        <Link to={props.link}>
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((5 / 8) * 600))
                .url()}
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
              alt={props.mainImage.alt}
            />
          )}
        </Link>
        <div sx={(props.container || props.size == "large") && containerStyles}>
          <PreviewText {...props}>{props.children}</PreviewText>
        </div>
      </Grid>
    </div>
  );
}

function VerticalArticlePreview(props) {
  console.log(props.mainImage);
  console.log(props.mainImage && props.mainImage.asset);
  return (
    <div sx={{ width: "100%", bg: props.container ? "container" : "#FFFFFF" }}>
      <Link to={props.link}>
        <div>
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((5 / 8) * 600))
                .url()}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt={props.mainImage.alt}
            />
          )}
        </div>
      </Link>
      <div sx={props.container && { p: [2, 3] }}>
        <PreviewText {...props}>{props.children}</PreviewText>
      </div>
    </div>
  );
}

function ArticlePreview(props) {
  return props.horizontal ? (
    <HorizontalArticlePreview className="preview" {...props} />
  ) : (
    <VerticalArticlePreview className="preview" {...props} />
  );
}

export default ArticlePreview;
