/** @jsx jsx */
import { jsx, Grid, Image, Styled, Text } from "theme-ui";
import ProfileCard from "./profile-card.js"

function PeopleGrid({ items, title }) {
  return (
    <div>
      <Styled.h2>{title}</Styled.h2>
      <Grid gap={3} columns={[1, 3, 6]}>
        {items.map((item, key) => (
          <ProfileCard key={key} data={item} />
        ))}
      </Grid>
    </div>
  );
}

export default PeopleGrid;