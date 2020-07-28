import React from "react";
import { Image, Text, Styled } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import { buildImageObj, resolveInternalLink } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockContent from "../block-content";
import Link from "../core/link"

function Preview(props) {
  const {
    date,
    description,
    header,
    image,
    link,
  } = props;

  // Either no link, internalLink, or externalLink
  const { internalLink, externalLink } = link;
  const linkProps = externalLink
    ? { href: externalLink }
    : { to: resolveInternalLink(internalLink) };

  // Image handling: If no image specified, attempts to get the link image
  const linkPreviewAvailable = link.internalLink && link.internalLink.reference !== null;
  let coverImage = image
  if ((!image || !image.asset) && linkPreviewAvailable) {
    coverImage = link.internalLink.reference.mainImage;
  }

  return (
    <div className="preview">
      {coverImage && coverImage.asset && (
        <Image
          src={imageUrlFor(buildImageObj(coverImage)).width(1200).url()}
          alt={header}
        />
      )}
      {header && (
        <Link {...linkProps}>
          <Styled.h3>
            {header}
          </Styled.h3>
        </Link>
      )}
      {description && <BlockContent blocks={description || []} />}
      {date && (
        <Text variant="caps">
          {differenceInDays(new Date(date), new Date()) > 3
            ? distanceInWords(new Date(date), new Date())
            : format(new Date(date), "MM-DD-YYYY")}
        </Text>
      )}
      <br />
    </div>
  );
}

export default Preview;
