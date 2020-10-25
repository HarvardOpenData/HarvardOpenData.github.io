import React from "react";
import { getTrackBackground } from "react-range";

const Track = React.forwardRef((props, ref) => (
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
    <div
      ref={ref}
      style={{
        height: "0.3rem",
        width: "100%",
        borderRadius: "0.3rem",
        background: getTrackBackground({
          values: props.values,
          colors: props.colors,
          min: props.lower,
          max: props.upper,
        }),
        alignSelf: "center",
      }}
    >
      {props.children}
    </div>
  </div>
));

export default Track;
