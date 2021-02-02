/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

// styles
const defaultSx = {
  color: "inherit",
  textDecoration: "none",
  ":hover": {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
};

const highlightedSx = {
  color: "primary",
  fontWeight: "bold",
  textDecoration: "none",
  "&:hover": {
    color: "deep",
    cursor: "pointer",
  },
};

function Link(props) {
  const sx = props.variant === "highlighted" ? highlightedSx : defaultSx;

  if (props.to && props.to[0] === "/") {
    return (
      <GatsbyLink className={`${props.variant}-link`} {...props} sx={sx} />
    );
  }
  return (
    <a className={`${props.variant}-link`} {...props} sx={sx} target="_blank" />
  );
}

export default Link;
