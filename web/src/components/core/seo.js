import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { previewImageUrlFor } from "../../lib/image-url";

const detailsQuery = graphql`
  query SEOQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      defaultSeoImage {
        asset {
          _id
        }
        alt
      }
      keywords
      author
    }
  }
`;

function SEOContainer({
  description,
  image,
  lang,
  meta,
  keywords = [],
  title,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        if (!data.site) {
          return;
        }
        const metaDescription = description || data.site.description;
        const imageUrl = image || previewImageUrlFor(data.site.defaultSeoImage);

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={
              title === data.site.title ? "%s" : `%s | ${data.site.title}`
            }
            meta={[
              {
                name: "description",
                content: metaDescription,
              },
              {
                property: "og:title",
                content: title,
              },
              {
                name: "og:image",
                content: imageUrl,
              },
              {
                property: "og:description",
                content: metaDescription,
              },
              {
                property: "og:type",
                content: "website",
              },
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:creator",
                content: data.site.author,
              },
              {
                name: "twitter:title",
                content: title,
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", "),
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEOContainer.defaultProps = {
  lang: "en",
  meta: [],
  keywords: [],
};

SEOContainer.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEOContainer;
