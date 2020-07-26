/** @jsx jsx */
import { jsx, Divider, Text } from "theme-ui";

function Section({ header, showDivider, children }) {
  return (
    <div sx={{ mb: 5 }}>
      <Text variant="caps">{header}</Text>
      {showDivider !== false && <Divider mb={3} color="text" />}
      {children}
    </div>
  );
}

export default Section