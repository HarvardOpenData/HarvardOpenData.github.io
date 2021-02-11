import React from "react";
import { jsx, Text } from "theme-ui";

function IFrame(props) {
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
        {props.url && (
          <iframe
            src={props.url}
            scrolling={"no"}
            style={{ height: "100%", width: "100%", position: "absolute" }}
            seamless={"seamless"}
          />
        )}
      </div>
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default IFrame;
