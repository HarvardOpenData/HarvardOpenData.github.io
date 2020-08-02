import React from "react";
import { Container, Grid, Button, Styled, Image } from "theme-ui";
import BlockText from "../core/block-text";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import defaultProfile from "../../assets/default-profile.jpg"

export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    const { image, name, _rawBio, position, concentration, house, year } = this.props.data;
    return (
      <div className="modal" id="modal">
        <div className="modal-content">
            <Container>
                <Grid gap={4} columns={[1, 2, '1fr 2fr']}>
                    <div>
                        {image && image.asset && (
                        <div className="profile-card">
                            <Image 
                                src={imageUrlFor(buildImageObj(image))
                                .width(500)
                                .height(500)
                                .fit("crop")
                                .url()}
                            />
                        </div>
                        )}
                        {!image && (
                        <div className="default-profile">
                            <Image className="default-profile"
                                src={defaultProfile}
                            />
                        </div>
                        )}
                    </div>
                    <div className="modal-bio">
                        {name && (<Styled.h4 className="profile-name">{name}</Styled.h4>)}
                        {position.title && (<Styled.p className="profile-title">{position.title}</Styled.p>)}
                        <div className="very-small">
                            {concentration && (concentration + ", ")}
                            {house && (house + " ")} 
                            {year && (year + " ")}
                        </div>
                        {_rawBio && (
                        <div className="small preview" id="small-bio">
                            <BlockText blocks={_rawBio}/>
                        </div>
                        )}
                        <div className="modal-buttons">
                            <Button onClick={this.props.goToProfile}>View HODP Work</Button>
                            <div className="close-button">
                                <Button onClick={this.props.closeModal}>X</Button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Container>
        </div>
      </div>
    );
  }
}