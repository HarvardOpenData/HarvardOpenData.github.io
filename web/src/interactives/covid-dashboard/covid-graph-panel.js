/** @jsx jsx */
import { Grid, jsx } from "theme-ui";
import CountryGraph from "./countrygraph";
import StateGraph from "./stategraph";
import Container from "../../components/core/container";

export default function CovidGraphPanel() {
  return (
    <Container>
      <br />
      <Grid columns={[1, 1, 3]}>
        <CountryGraph />
        <StateGraph sort={"cumulative"} />
        <StateGraph sort={"daily"} />
      </Grid>
      <br />
    </Container>
  );
}
