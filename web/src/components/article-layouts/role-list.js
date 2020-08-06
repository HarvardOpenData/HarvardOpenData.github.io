/** @jsx jsx */
import { jsx, Styled, Text } from "theme-ui";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import Link from "../core/link"

function ucfirst(str) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
}

function stringifyRoles(item) {
  let str = "";
  item.roles.forEach((role, idx) => {
    if (idx === 0) {
      str += ucfirst(role);
    } else if (idx === item.roles.length - 1) {
      str += ` & ${role}`;
    } else {
      str += `, ${role} `;
    }
  });
  return str;
}

function Role(item) {
  return (
    <div
      sx={{
        margin: "1rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {item.person && item.person.image && item.person.image.asset && (
        <img
          src={imageUrlFor(buildImageObj(item.person.image))
            .width(100)
            .height(100)
            .fit("crop")
            .url()}
          alt=""
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
          }}
        />
      )}
      <div sx={{ p: [2], flex: "1 1 auto" }}>
        <Link to={`/people/${item.person.slug.current}`}>
          <Text fontSize={0}>
            <strong>
              {(item.person && item.person.name) || <em>Missing</em>}
            </strong>
          </Text>
        </Link>
        {item.roles && <Text variant="small">{stringifyRoles(item)}</Text>}
      </div>
    </div>
  );
}

function RoleList({ items, title }) {
  return (
    <div>
      <Styled.h4>{title}</Styled.h4>
      {items.map((item, key) => (
        <Role key={key} {...item} />
      ))}
    </div>
  );
}

export default RoleList;
