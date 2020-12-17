import React from "react";
import { Card, Grid, Image, Styled } from "theme-ui";
import BlockText from "../core/block-text";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import Link from "../core/link";
import defaultProfile from "../../assets/default-profile.jpg";

function ProfileBio(props) {
  const {
    image,
    name,
    _rawBio,
    position,
    concentration,
    house,
    year,
    slug,
  } = props.data;
  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 5,
        backgroundColor: "light",
        padding: 4,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      }}
    >
      <Grid gap={4} columns={[1, "2fr 4fr", "1fr 4fr 1fr"]}>
        <div className="profile-page">
          {image && image.asset && (
            <Image
              src={imageUrlFor(buildImageObj(image))
                .width(300)
                .height(300)
                .fit("crop")
                .url()}
              sx={
                {
                  //borderRadius: "50%",
                }
              }
            />
          )}
          {!image && (
            <Image
              src={defaultProfile}
              sx={{
                width: "300px",
              }}
            />
          )}
        </div>
        <div>
          {name && (
            <Link to={`/people/${slug.current}`}>
              <Styled.h2 className="bio-name">{name}</Styled.h2>
            </Link>
          )}
          {position && position.title && (
            <Styled.p className="profile-title">{position.title}</Styled.p>
          )}
          <div className="very-small">
            {concentration && concentration + ", "}
            {house && house + " "}
            {year && year + " "}
          </div>
          {_rawBio && (
            <div className="small preview" id="small-bio">
              <BlockText blocks={_rawBio} />
            </div>
          )}
        </div>
      </Grid>
    </Card>
  );
}

export default ProfileBio;
