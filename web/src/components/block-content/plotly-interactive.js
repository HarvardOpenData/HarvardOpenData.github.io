import React from "react";
import { Alert, Spinner, Text } from "theme-ui";
import Loadable from "react-loadable";

const Plotly = Loadable({
  loader: () => import(`react-plotly.js`),
  loading: ({ timedOut }) =>
    timedOut ? (
      <Alert>Error: Loading Plotly timed out.</Alert>
    ) : (
      <Spinner />
    ),
  timeout: 10000,
});

function PlotlyInteractive(props) {
  return (
    <div style={{alignItems: "center"}}>
      <br />
      {props.json && <Plotly {...JSON.parse(props.json)} />}
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default PlotlyInteractive;
