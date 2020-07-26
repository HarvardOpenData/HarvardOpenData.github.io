/** @jsx jsx */
import { jsx, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import BlockContent from "../block-content";

function ArticleHeader(props) {
  const {
    _rawExcerpt,
    title,
    members,
    authors,
    publishedAt,
  } = props;
  const contributors = [...(members ? members : []), ...(authors ? authors : [])];
  const numContributors = contributors.length;

  return (
    <div>
      {publishedAt && (
        <Text variant="caps">
          {differenceInDays(new Date(publishedAt), new Date()) > 3
            ? distanceInWords(new Date(publishedAt), new Date())
            : format(new Date(publishedAt), "MM-DD-YYYY")}
        </Text>
      )}
      {title && (
        <Styled.h1 sx={{ mt: 2, mb: 0, fontSize: [4, 4, 5], }}>{title}</Styled.h1>
      )}
      {_rawExcerpt && <BlockContent blocks={_rawExcerpt || []} />}
      {numContributors > 0 &&
        <div>
          <b>
            {`By: `}
            {contributors.map((item, i) =>
              <span key={item._id}>
                {item.person && `${item.person.name}`}
                {i < numContributors - 2
                  ? `, `
                  : i == numContributors - 2 && ` & `
                }
              </span>
            )}
          </b>
        </div>
      }
    </div>
  );
}

export default ArticleHeader;
