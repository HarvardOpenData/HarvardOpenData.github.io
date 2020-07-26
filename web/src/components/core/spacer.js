/** @jsx jsx */
import { jsx } from "theme-ui";

const Spacer = ({ height, width, children }) => {
  return (
    <div sx={{ minHeight: `${height}`, minWidth: `${width}`, maxWidth: '100vw' }}>
        {children}
    </div>
  );
};

export default Spacer;
