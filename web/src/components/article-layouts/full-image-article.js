/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import ArticleBody from "./article-body";

function FullImageArticle(props) {
  const { mainImage } = props;

  return (
    <div>
      {mainImage && mainImage.asset && (
        <div>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1500)
              .height(Math.floor((5 / 8) * 1500))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
            sx={{
              mt: "-0.6em",
              width: "100%",
              verticalAlign: "top",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <ArticleBody showHeader {...props} />
    </div>
  );
}

export default FullImageArticle;
