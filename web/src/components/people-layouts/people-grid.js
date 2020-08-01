import React from 'react';
/** @jsx jsx */
import { jsx, Grid, Image, Styled, Text } from "theme-ui";
import ProfileCard from "./profile-card.js"
import Modal from "../core/modal.js"

class PeopleGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showModal = () => {
    this.setState({show: !this.state.show})
  }

  render() {
    const items = this.props.items;
    const title = this.props.title;
    return (
      <div>
        <Styled.h2>{title}</Styled.h2>
        <Modal show={this.state.show}/>
        <Grid gap={3} columns={[1, 3, 6]}>
          {items.map((item, key) => (
            <ProfileCard key={key} data={item} showModal={this.showModal}/>
          ))}
        </Grid>
      </div>
    );
  }
}

export default PeopleGrid;