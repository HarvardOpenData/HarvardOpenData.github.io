/** @jsx jsx */
import { Badge, Box, Button, Flex, jsx, Text } from "theme-ui";
import Spacer from "../core/spacer";
import Link from "../core/link";

const DatasetPreview = ({
  title,
  description,
  downloadURL,
  sourceURL,
  subjects,
}) => (
  <div>
    <Flex>
      <Box>
        {subjects &&
          subjects.map((item) => (
            <Badge bg="grey" mr={2}>
              {item.title}
            </Badge>
          ))}
        <Spacer height={3} />
        <Text variant="h3">{title}</Text>
        <Spacer height={0} />
        <Text variant="caption">{description}</Text>
      </Box>
    </Flex>
    <Spacer height={3} />
    <Button bg="deep">
      <Link variant="outbound" href={sourceURL}>
        <Text variant="small">
          <b>Source site</b>
        </Text>
      </Link>
    </Button>
    <Button>
      <Link variant="outbound" href={downloadURL}>
        <Text variant="small">
          <b>Download</b>
        </Text>
      </Link>
    </Button>
  </div>
);

export default DatasetPreview;
