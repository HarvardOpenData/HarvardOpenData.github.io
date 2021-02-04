import React from "react";
import { Image, Text } from "theme-ui";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";

function HTMLFile(props) {
  return (
    <div>
      <br />
      {props.asset && (
        <Image
          src={imageUrlFor(buildImageObj(props)).width(1200).url()}
          alt={props.alt}
        />
      )}
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default HTMLFile;
