import React from "react";
import { jsx, Text } from "theme-ui";

function IFrame(props) {
  return (
    <div style={{ alignItems: "center" }}>
      <br />
      {/* 56.25% is for 16:9 aspect ratio */}
      <div style={{ paddingBottom: "56.25%", position: "relative" }}>
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
