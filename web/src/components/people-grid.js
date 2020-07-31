/** @jsx jsx */
import { jsx, Grid, Image, Styled, Text } from "theme-ui";
import BlockText from "./core/block-text";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function ProfileCard({ image, name, _rawBio, position }) {
  return (
    <div>
      <div>
        {image && image.asset && (
          <Image
            src={imageUrlFor(buildImageObj(image))
              .width(400)
              .height(400)
              .fit("crop")
              .url()}
          />
        )}
      </div>
      <Styled.h4>{name}</Styled.h4>
      <Styled.p>{position.title}</Styled.p>
      {_rawBio && (
        <div className="small preview">
          <BlockText blocks={_rawBio} style="profile"/>
        </div>
      )}
    </div>
  );
}

function PeopleGrid({ items, title }) {
  return (
    <div>
      <Styled.h2>{title}</Styled.h2>
      <Grid gap={3} columns={[1, 2, 4]}>
        {items.map((item, key) => (
          <ProfileCard key={key} {...item} />
        ))}
      </Grid>
    </div>
  );
}

export default PeopleGrid;
