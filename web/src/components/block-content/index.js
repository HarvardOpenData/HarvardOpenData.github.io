/** @jsx jsx */
import BaseBlockContent from "@sanity/block-content-to-react";
import { jsx, Styled, Text } from "theme-ui";
import Link from "../core/link";
import Figure from "./figure";
import EmbeddedComponent from "./embedded-component";
import Slideshow from "./slideshow";
import { getBlogUrl } from "../../lib/helpers";

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case "h1":
          return <Styled.h1>{props.children}</Styled.h1>;

        case "h2":
          return <Styled.h2>{props.children}</Styled.h2>;

        case "h3":
          return <Styled.h3>{props.children}</Styled.h3>;

        case "h4":
          return <Styled.h4>{props.children}</Styled.h4>;

        case "blockquote":
          return (
            <div
              className="blockquote"
              style={{
                paddingLeft: "1.5em",
                borderLeft: "2px solid #C63F3F",
              }}
            >
              <Text variant="quote">{props.children}</Text>
            </div>
          );

        default:
          return <Styled.p>{props.children}</Styled.p>;
      }
    },
    figure(props) {
      return <Figure {...props.node} />;
    },
    slideshow(props) {
      return <Slideshow {...props.node} />;
    },
    embeddedComponent(props) {
      return (
        <Styled.root>
          <EmbeddedComponent {...props.node} />
        </Styled.root>
      );
    },
  },
  marks: {
    //_rawBody(resolveReferences: { maxDepth: 5 })
    internalLink: ({mark, children}) => {
      const {slug = {}, internal = {}, publishedAt = {}} = mark.reference
      const {type = {}} = internal
      let fullSlug = ""
      switch (type) {
        // TODO: Update for dataset
        case "SanityProject":
          fullSlug = `/project/${slug.current}`;
          break;

        case "SanityPost":
          fullSlug = getBlogUrl(publishedAt, slug.current);
          break;

        default:
          fullSlug = `/${slug.current}`;
          break;

      }
      return <Link to={fullSlug}>{children}</Link>
    },
  }
};

const BlockContent = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
);

export default BlockContent;
