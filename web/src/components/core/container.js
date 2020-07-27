/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

const Container = ({ maxWidth, margin, align, children }) => {
  return (
    <div
      sx={{
        ml: [margin ? margin : "1.5em"],
        mr: [margin ? margin : "1.5em"],
      }}
    >
      <div
        sx={{
          maxWidth: ["100%", maxWidth ? maxWidth : "1280px"],
          margin: align !== "left" && "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
