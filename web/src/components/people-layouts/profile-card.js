import React from 'react';
/** @jsx jsx */
import { jsx, Grid, Input, Image, Styled } from "theme-ui";
import Container from "../core/container";
import BlockText from "../core/block-text";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import defaultProfile from "../../assets/default-profile.jpg"

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {image, name, _rawBio, position, year, concentration } = this.props.data;
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
                        onClick={() => this.props.showModal(this.props.data)}
                    />
                  </div>
                )}
                {!image && (
                  <div className="default-profile">
                    <Image
                        src={defaultProfile}
                        onClick={() => this.props.showModal(this.props.data)}
                    />
                  </div>
                )}
              {name && (<Styled.h4 className="profile-name">{name}</Styled.h4>)}
              {position.title && (<Styled.p className="profile-title">{position.title}</Styled.p>)}
              {concentration && (
                <div className="very-small">{concentration}</div>
              )}
            </div>
          );
    }
}

export default ProfileCard