/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

// styles
const defaultSx = {
  color: "inherit",
  textDecoration: "none",
  ":hover": {
    textDecoration: "none",
    color: "inherit",
  },
};

const highlightedSx = {
  color: "primary",
  fontWeight: "bold",
  textDecoration: "none",
  "&:hover": {
    color: "deep",
  },
};

export default (props) => {
  const sx = props.variant === "highlighted" ? highlightedSx : defaultSx;

  if (props.to && props.to[0] === "/") {
    return <Link className={`${props.variant}-link`} {...props} sx={sx} />;
  }
  return (
    <a className={`${props.variant}-link`} {...props} sx={sx} target="_blank" />
  );
};
