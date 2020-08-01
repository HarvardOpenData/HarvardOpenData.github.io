/** @jsx jsx */
import { jsx } from "theme-ui";
import { formatDate } from "../../lib/helpers";

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

  return (
    <div sx={{ fontWeight: "medium" }}>
      {/* <b> */}
        {`By `}
        {contributors.map((item, i) => (
          <span key={item._key}>
            {item.person && `${item.person.name}`}
            {i < numContributors - 2
              ? `, `
              : i === numContributors - 2 && ` & `}
          </span>
        ))}
      {/* </b> */}
      {contributors.length > 0 && showDate && publishedAt &&
        <span>{` • `}</span>
      }
      {showDate && publishedAt && (
        <span>{`${formatDate(publishedAt)}`}</span>
      )}
    </div>
  );
}

export default ArticleByline;
