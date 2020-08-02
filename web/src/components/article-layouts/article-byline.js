/** @jsx jsx */
import { jsx } from "theme-ui";
import { formatDate } from "../../lib/helpers";
import Spacer from "../../components/core/spacer"

function ArticleByline({ members, authors, publishedAt, showDate }) {
  const includeInByline = person => person
    && person.roles
    && (person.roles.includes("developer") || person.roles.includes("author"))

  let contributors = [
    ...(members ? members : []),
    ...(authors ? authors : []),
  ].filter(includeInByline);

  // filter contributors who aren't developers or authors
  const numContributors = contributors.length;
  const showDemarcation = showDate && publishedAt && numContributors > 0;

  return (
    <div sx={{ fontWeight: "medium" }}>
      {contributors.length > 0 && `By `}
      {contributors.map((item, i) => (
        <span key={item._key}>
          {item.person && `${item.person.name}`}
          {i < numContributors - 2
            ? `, `
            : i === numContributors - 2 && ` & `}
        </span>
      ))}
      {showDemarcation && (numContributors < 3
        ? <span>{` • `}</span>
        : <Spacer height={3} />)
      }
      {showDate && publishedAt && (
        <span>{`${formatDate(publishedAt)}`}</span>
      )}
    </div>
  );
}

export default ArticleByline;
