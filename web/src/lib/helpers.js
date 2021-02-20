import { format, distanceInWords, differenceInDays } from "date-fns";

export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map((edge) => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(publishedAt, "YYYY/MM")}/${slug.current || slug}/`;
}

export function resolveInternalLink(link) {
  if (!link || !link.reference) {
    return null;
  }

  const { slug = {}, internal = {}, publishedAt = {} } = link.reference;
  const { type = {} } = internal;
  switch (type) {
    // TODO: Update for dataset
    case "SanityProject":
      return `/project/${slug.current}`;

    case "SanityPost":
      return getBlogUrl(publishedAt, slug.current);

    default:
      return `/${slug.current}`;
  }
}

export function resolveAttachmentLink(attachment) {
  if (!attachment || !attachment.file) {
    return null;
  }

  const { asset = {} } = attachment.file;
  return asset.url;
}

export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export function toPlainText(blocks = []) {
  if (!blocks) {
    return null;
  }

  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== "block" || !block.children) {
          return "";
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join("");
      })
      // join the paragraphs leaving split by two linebreaks
      .join("\n\n")
  );
}

export function formatDate(date) {
  return differenceInDays(new Date(date), new Date()) > 3
    ? distanceInWords(new Date(date), new Date())
    : format(new Date(date), "MM-DD-YYYY");
}
