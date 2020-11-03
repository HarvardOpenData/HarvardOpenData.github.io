import React from "react";

const Thumb = (props) => {
  const renderValue =
    props.val === "" ? null : (
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
    );

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
        boxShadow: "0rem 0.15rem 0.45rem #AAA",
      }}
    >
      {renderValue}
    </div>
  );
};

export default Thumb;
