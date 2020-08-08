import sanityConfig from "../../../studio/sanity.json";
import imageUrlBuilder from "@sanity/image-url";
import { buildImageObj } from "./helpers";

const builder = imageUrlBuilder(sanityConfig.api);

export function imageUrlFor(source) {
  return builder.image(source);
}

export function previewImageUrlFor(image) {
  // Use standard 1200 x 627 dimensions for preview images
  return (
    image &&
    image.asset &&
    imageUrlFor(buildImageObj(image)).width(1200).height(750).url()
  );
}
