import React from "react";

function Track(props) {
  return (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
        height: "5rem",
        display: "flex",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

export default Track;
