/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";
import ProfileCard from "./profile-card.js";

function PeopleGrid(props) {
  const items = props.items;
  const title = props.title;
  return (
    <div>
      <Styled.h2>{title}</Styled.h2>
      <Grid gap={2} columns={[2, 4, 6]}>
        {items.map((item, key) => (
          <ProfileCard key={key} data={item} showModal={props.showModal} />
        ))}
      </Grid>
    </div>
  );
}

export default PeopleGrid;
