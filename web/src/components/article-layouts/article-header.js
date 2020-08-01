/** @jsx jsx */
import { jsx, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import BlockContent from "../block-content";
import ArticleByline from "./article-byline"

function ArticleHeader(props) {
  const { _rawExcerpt, title, members, authors, publishedAt } = props;

  return (
    <div className="preview">
      {title && (
        <Styled.h1 sx={{ fontSize: [4, 4, 5] }}>
          {title}
        </Styled.h1>
      )}
      {_rawExcerpt && <BlockContent blocks={_rawExcerpt || []} />}
      <br />
      <ArticleByline members={members} authors={authors} publishedAt={publishedAt} showDate/>
    </div>
  );
}

export default ArticleHeader;
