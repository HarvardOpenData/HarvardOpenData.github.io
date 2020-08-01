/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import CountryGraph from "./countrygraph"
import StateGraph from "./stategraph"
import Container from "../../components/core/container"

export default function CovidGraphPanel() {
  return (
    <Container maxWidth="1280px">
      <br />
      <Grid columns={[1, 3, 3]}>
          <CountryGraph/>
          <StateGraph sort={'cumulative'}/>
          <StateGraph  sort={'daily'}/>
      </Grid>
      <br />
    </Container>
  );
}