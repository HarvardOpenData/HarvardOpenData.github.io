import React from "react";
import { jsx, Button, Styled, Image } from "theme-ui";
import BlockText from "../core/block-text";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import defaultProfile from "../../assets/default-profile.jpg"

export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    const { image, name, _rawBio, position } = this.props.data;
    return (
      <div className="modal" id="modal">
        <div className="modal-content">
            <div>
                {image && image.asset && (
                    <Image 
                        src={imageUrlFor(buildImageObj(image))
                        .width(250)
                        .height(250)
                        .fit("crop")
                        .url()}
                    />
                )}
                {!image && (
                  <Image 
                    src={defaultProfile}
                  />
                )}
            </div>
            {name && (<Styled.h4 className="profile-name">{name}</Styled.h4>)}
            {position.title && (<Styled.p className="profile-title">{position.title}</Styled.p>)}
            {_rawBio && (
                <div className="small preview" id="bio">
                  <BlockText blocks={_rawBio}/>
                </div>
              )}
            <Button onClick={this.props.closeModal}>
                X
            </Button>
        </div>
      </div>
    );
  }
}