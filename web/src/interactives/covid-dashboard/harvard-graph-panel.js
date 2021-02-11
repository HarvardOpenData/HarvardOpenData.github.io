/** @jsx jsx */
import { Grid, jsx } from "theme-ui";
import Container from "../../components/core/container";
import HarvardDailyGraph from "./harvard-daily-graph";
import HarvardCumulativeGraph from "./harvard-cumulative-graph";

export default function HarvardGraphPanel() {
  return (
    <Container>
      <br />
      <Grid columns={[1, 2]}>
        <HarvardDailyGraph />
        <HarvardCumulativeGraph />
      </Grid>
      <br />
    </Container>
  );
}
