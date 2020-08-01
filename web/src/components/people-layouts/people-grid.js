import React from 'react';
/** @jsx jsx */
import { jsx, Grid, Image, Styled, Text } from "theme-ui";
import ProfileCard from "./profile-card.js"

class PeopleGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items;
    const title = this.props.title;
    return (
      <div>
        <Styled.h2>{title}</Styled.h2>
        <Grid gap={2} columns={[1, 3, 6]}>
          {items.map((item, key) => (
            <ProfileCard key={key} data={item} showModal={this.props.showModal}/>
          ))}
        </Grid>
      </div>
    );
  }
}

export default PeopleGrid;