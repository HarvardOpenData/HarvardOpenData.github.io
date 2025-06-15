/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import ArticleHeader from "./article-header";
import ArticleSidebar from "./article-sidebar";
import BlockContent from "../block-content";
import Container from "../core/container";
import { DiscussionEmbed } from "disqus-react";

import React, { useEffect, useRef } from "react";

// Define the iframe serializer
const serializers = {
  types: {
    iframe: ({ node }) => {
      const { url, caption } = node;
      const containerRef = useRef(null);

      useEffect(() => {
        if (!url || !containerRef.current) return;

        const match = url.match(/dwcdn\.net\/([^/]+)/);
        if (!match) return;

        const chartId = match[1];
        const scriptId = `dw-script-${chartId}`;

        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.src = `https://datawrapper.dwcdn.net/${chartId}/embed.js`;
          script.defer = true;
          script.id = scriptId;
          document.body.appendChild(script);
        }
      }, [url]);

      const chartId = url.match(/dwcdn\.net\/([^/]+)/)?.[1];

      return (
        <div ref={containerRef} style={{ width: "100%", margin: "2rem 0" }}>
          <iframe
            id={`datawrapper-chart-${chartId}`}
            title={caption || "Embedded chart"}
            src={url}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            data-external="1"
            style={{
              width: "0",
              minWidth: "100%",
              border: "none",
              height: "400px", // fallback height, will get resized
            }}
          />
          {caption && (
            <p
              style={{
                textAlign: "center",
                fontSize: "0.9rem",
                color: "#555",
                marginTop: "0.5rem",
              }}
            >
              {caption}
            </p>
          )}
        </div>
      );
    },
  },
};



function ArticleBody(props) {
  const {
    _rawExcerpt,
    _rawBody,
    authors,
    members,
    categories,
    subjects,
    publishedAt,
    relatedProjects,
    title,
    showHeader,
  } = props;
  const headerProps = {
    _rawExcerpt,
    title,
    members,
    authors,
    publishedAt,
  };
  const defaultSidebarProps = {
    authors,
    members,
    categories,
    subjects,
    relatedProjects,
  };
  const disqusConfig = {
    shortname: `${process.env.DISQUS_NAME}`,
    config: {
      identifier: title,
      title: title,
    },
  };

  return (
    <div>
      <Container>
        <Grid sx={{ mt: 4 }} gap={[3, 4, 5]} columns={[1, "2.5fr 1fr"]}>
          <div
            sx={{
              margin: ["0 auto"],
              mr: [0, 0, 2],
              minWidth: [null, "640px", "640px"],
              maxWidth: "640px",
            }}
          >
            {showHeader && <ArticleHeader {...headerProps} />}
            <br />
            {_rawBody && <BlockContent blocks={_rawBody} serializers={serializers} />}
            <br />
            <DiscussionEmbed {...disqusConfig} />
          </div>
          <div sx={{ maxWidth: ["100%", 8] }}>
            <ArticleSidebar {...defaultSidebarProps} />
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default ArticleBody;
