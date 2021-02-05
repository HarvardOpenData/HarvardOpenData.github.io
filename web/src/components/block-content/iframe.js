import React from "react";
import { jsx, Text } from "theme-ui";

function IFrame(props) {
  return (
    <div style={{ alignItems: "center" }}>
      <br />
      {props.url && (
        <iframe
          src={props.url}
          scrolling={"no"}
          style={{ border: "None" }}
          seamless={"seamless"}
          height={"525"}
          width={"100%"}
        />
      )}
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default IFrame;
