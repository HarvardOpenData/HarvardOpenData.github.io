/** @jsx jsx */
import { jsx, Grid, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import Link from "../core/link";
import { buildImageObj, formatDate } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockText from "../core/block-text";
import ArticleByline from "./article-byline";

function PreviewText(props) {
  return (
    <div>
      <Link to={props.newLink}>
        <Text variant={props.headerAs ? props.headerAs : "h3"}>
          {props.title}
        </Text>
      </Link>
      {props._rawExcerpt && <BlockText blocks={props._rawExcerpt} />}
      {props._rawMembers &&
        <ArticleByline
          members={props._rawMembers}
        />
      }
      {props.children}
    </div>
  );
}

function HorizontalArticlePreview(props) {
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    pr: 3,
  };
  return (
    <div
      className="small preview"
      sx={{ bg: props.container ? "container" : "#FFFFFF" }}
    >
      <Grid
        gap={props.gap || 3}
        columns={props.columns || ["1fr 2fr"]}
      >
        <Link to={props.newLink}>
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(1200)
                .height(Math.floor((5 / 8) * 1200))
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
          <PreviewText {...props} link={props.link}>{props.children}</PreviewText>
        </div>
      </Grid>
    </div>
  );
}

function VerticalArticlePreview(props) {
  return (
    <div
      className="small preview"
      sx={{ width: "100%", bg: props.container ? "container" : "#FFFFFF" }}
    >
      <Link to={props.newLink}>
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
      <div className={`${props.size}-block`} sx={props.container && { p: [3] }}>
        {!props.container && <br />}
        <PreviewText {...props} link={props.link}>{props.children}</PreviewText>
      </div>
    </div>
  );
}

function ArticlePreview(props) {
  let blog = props.categories && props.categories.filter((category) => {
    return (category.title === "Blog")
  }).length > 0;
  const newLink = blog ? `/blog/${props.link}` : `/project/${props.link}`;
  // Collapse large horizontal previews to vertical
  if (props.horizontal && props.size === "large") {
    return (
      <div>
        <div sx={{ display: ["none", "initial", "initial"] }}>
          <HorizontalArticlePreview newLink={newLink} {...props}/>
        </div>
        <div sx={{ display: ["initial", "none", "none"] }}>
          <VerticalArticlePreview newLink={newLink} headerAs={null} {...props} />
        </div>
      </div>
    );
  }
  return props.horizontal ? (
    <HorizontalArticlePreview {...props}  newLink={newLink} />
  ) : (
    <VerticalArticlePreview {...props}  newLink={newLink} />
  );
}

export default ArticlePreview;
