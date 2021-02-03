/** @jsx jsx */
import { Grid, jsx } from "theme-ui";
import Container from "../../components/core/container";
import HarvardDailyGraph from "./harvard-daily-graph";
import HarvardGraph from "./harvardgraph";

export default function HarvardGraphPanel() {
  return (
    <Container>
      <br />
      <Grid columns={[1, 2]}>
        <HarvardDailyGraph />
        <HarvardGraph />
      </Grid>
      <br />
    </Container>
  );
}
