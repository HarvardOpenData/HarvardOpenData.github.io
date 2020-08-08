import React from "react";
import { Image, Text, Styled } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import { buildImageObj, resolveInternalLink } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockContent from "../block-content";
import Link from "../core/link";
import Spacer from "../core/spacer";

function Preview(props) {
  let { date, description, header, headerAs, image, link } = props;

  // Either no link, internalLink, or externalLink
  const { internalLink, externalLink } = link || {};
  const linkProps = externalLink
    ? { href: externalLink }
    : { to: resolveInternalLink(internalLink) };

  // Default: Use back-up image, header, and date if necessary
  const linkPreviewAvailable =
    link && link.internalLink && link.internalLink.reference;
  if (linkPreviewAvailable) {
    const { mainImage, title, publishedAt } = link.internalLink.reference;

    image = image && image.asset ? image : mainImage;
    header = header ? header : title;
    date = date ? date : publishedAt;
  }

  return (
    <div className="small preview">
      {image && image.asset && (
        <Image
          src={imageUrlFor(buildImageObj(image)).width(1200).url()}
          alt={header}
        />
      )}
      <Spacer height={3} />
      {header && (
        <Link {...linkProps}>
          <Text variant={headerAs ? headerAs : "h3"}>{header}</Text>
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
