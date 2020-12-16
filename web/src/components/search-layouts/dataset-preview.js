/** @jsx jsx */
import { Badge, Box, Button, Card, Flex, jsx, Text } from "theme-ui";
import Spacer from "../core/spacer";
import Link from "../core/link";

const DatasetPreview = ({title, description, downloadURL, sourceURL, subjects}) => (
  <Card
    sx={{
      mt: 3,
      borderRadius: 5,
      backgroundColor: "light",
      padding: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    }}
  >
    <Flex>
      <Box>
        {subjects &&
        subjects.map((item) => (
          <Badge bg="grey" mr={2}>
            {item.title}
          </Badge>
        ))}
        <Spacer height={3}/>
        <Text variant="h3">{title}</Text>
        <Text variant="caption">{description}</Text>
      </Box>
    </Flex>
    <Spacer height={3}/>
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
  </Card>
);

export default DatasetPreview;