import React from "react";

function Thumb(props) {
  return (
    <div
      {...props.thumbProps}
      style={{
        ...props.thumbProps.style,
        height: "0.8rem",
        width: "0.8rem",
        borderRadius: "0.3rem",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0.15rem 0.45rem #AAA",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-2rem",
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
}

export default Thumb;
