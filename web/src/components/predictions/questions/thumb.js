import React from "react";

const Thumb = (props) => (
  <div
    {...props.thumbProps}
    style={{
      ...props.thumbProps.style,
      height: "1rem",
      width: "1rem",
      borderRadius: "0.5rem",
      border: "0.2rem solid #C63F3F",
      backgroundColor: "#FFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0rem 0.15rem 0.45rem #AAA",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "-2.2rem",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1rem",
        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
        padding: "0.3rem",
        borderRadius: "0.3rem",
        backgroundColor: "#2F2F2F",
      }}
    >
      {props.val}
    </div>
  </div>
);

export default Thumb;
