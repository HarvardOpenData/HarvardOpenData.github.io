import React from 'react';
/** @jsx jsx */
import { jsx, Grid, Input, Image, Styled, Text } from "theme-ui";
import Link from "../core/link";
import Container from "../core/container";
import BlockText from "../core/block-text";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import defaultProfile from "../../assets/default-profile.jpg"

function ProfileCard(props) {
      const {image, name, _rawBio, position, year, concentration } = props.data;
      return (
          <div>
              {image && image.asset && (
                <div className="default-profile">
                  <Image 
                      src={imageUrlFor(buildImageObj(image))
                      .width(500)
                      .height(500)
                      .fit("crop")
                      .url()}
                      onClick={() => props.showModal(props.data)}
                  />
                </div>
              )}
              {!image && (
                <div className="default-profile">
                  <Image
                      src={defaultProfile}
                      onClick={() => this.props.showModal(props.data)}
                  />
                </div>
              )}
            {name && 
            <div className="profile-name">
              <Link to={`/people/${props.data.slug.current}`}>
                <Text variant="h4">
                  {name}
                </Text>
              </Link>
            </div>}
            {position.title && (<Styled.p className="profile-title">{position.title}</Styled.p>)}
            {concentration && (
              <div className="very-small">{concentration}</div>
            )}
          </div>
        );
}

export default ProfileCard