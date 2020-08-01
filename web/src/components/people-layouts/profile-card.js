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
        this.state = {
        }
    }

    render() {
        const {image, name, _rawBio, position } = this.props.data;
        return (
            <div>
              <div className="profile-card">
                {image && image.asset && (
                  <Image 
                    src={imageUrlFor(buildImageObj(image))
                      .width(400)
                      .height(400)
                      .fit("crop")
                      .url()}
                    onClick={this.props.showModal}
                  />
                )}
                {!image && (
                  <Image 
                    src={defaultProfile}
                  />
                )}
              </div>
              {name && (<Styled.h4>{name}</Styled.h4>)}
              {position.title && (<Styled.p>{position.title}</Styled.p>)}
              {_rawBio && (
                <div className="small preview" id="bio">
                  <BlockText blocks={_rawBio}/>
                </div>
              )}
            </div>
          );
    }
}

export default ProfileCard