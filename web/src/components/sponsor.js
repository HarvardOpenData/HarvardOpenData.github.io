/** @jsx jsx */
import { jsx, Grid, Image, Styled } from "theme-ui";
import BlockText from "./core/block-text";
import Link from "./core/link";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function Sponsor({ link, name, _rawDescription, _rawImage }) {
  return (
    <Grid className="" gap={4} columns={[1, "1fr 5fr", "1fr 5fr"]}>
      <Link href={link} sx={{ display: "flex", alignItems: "center" }}>
        {_rawImage && _rawImage.asset ? (
          <Image
            src={imageUrlFor(buildImageObj(_rawImage))
              .width(400)
              .fit("crop")
              .url()}
          />
        ) : (
          <Styled.h4>{name}</Styled.h4>
        )}
      </Link>
      {_rawDescription && <BlockText blocks={_rawDescription} />}
    </Grid>
  );
}

export default Sponsor;
