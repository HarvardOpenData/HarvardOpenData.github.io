import React from "react";
import { jsx, Alert, Spinner, Text } from "theme-ui";
import Loadable from "react-loadable";

const Plotly = Loadable({
  loader: () => import(`react-plotly.js`),
  loading: ({ timedOut }) =>
    timedOut ? <Alert>Error: Loading Plotly timed out.</Alert> : <Spinner />,
  timeout: 10000,
});

function PlotlyInteractive(props) {
  return (
    <div style={{ alignItems: "center" }}>
      <br />
      {/* 56.25% is for 16:9 aspect ratio */}
      <div style={{ paddingBottom: "56.25%", position: "relative" }}>
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
