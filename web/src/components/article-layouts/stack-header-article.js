/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import ArticleHeader from "./article-header";
import ArticleBody from "./article-body";

function StackHeaderArticle(props) {
  const { mainImage } = props;

  return (
    <div>
      <div sx={{ maxWidth: "1156px", margin: "0 auto", mt: ["1em", "3em"] }}>
        <div sx={{ margin: [4, 4, 0], maxWidth: "95vw" }}>
          <ArticleHeader {...props} />
        </div>
        <br />
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
                width: "100%",
                verticalAlign: "top",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
      <ArticleBody {...props} />
    </div>
  );
}

export default StackHeaderArticle;
