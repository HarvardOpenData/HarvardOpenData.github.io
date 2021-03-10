import React from "react";
import { jsx, Alert, Spinner, Text } from "theme-ui";
import Loadable from "react-loadable";

const Plotly = Loadable({
  loader: () => import(`react-plotly.js`),
  loading: ({ timedOut }) =>
    timedOut ? (
      <Alert>Error: Loading Plotly timed out.</Alert>
    ) : (
      <Spinner
        sx={{
          margin: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    ),
  timeout: 10000,
});

function PlotlyInteractive(props) {
  // Sets padding percentage based off aspect ratio
  const ratioValues = props.aspectRatio
    ? props.aspectRatio.split(":")
    : ["16", "9"];
  const aspectRatio = `${((ratioValues[1] * 100) / ratioValues[0]).toFixed(
    2
  )}%`;

  return (
    <div style={{ alignItems: "center" }}>
      <br />
      <div style={{ paddingBottom: aspectRatio, position: "relative" }}>
        {props.json && (
          <Plotly
            {...JSON.parse(props.json)}
            useResizeHandler={true}
            style={{ height: "100%", width: "100%", position: "absolute" }}
          />
        )}
      </div>
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default PlotlyInteractive;
