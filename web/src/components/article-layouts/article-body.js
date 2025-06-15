/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import ArticleHeader from "./article-header";
import ArticleSidebar from "./article-sidebar";
import BlockContent from "../block-content";
import Container from "../core/container";
import { DiscussionEmbed } from "disqus-react";

import React, { useEffect, useRef } from "react";

const serializers = {
  types: {
    iframe: ({ node }) => {
      const { url, caption } = node;
      const containerRef = useRef(null);

      useEffect(() => {
        if (!url) return;

        // Extract chart ID from URL
        const match = url.match(/dwcdn\.net\/([^/]+)/);
        if (!match) return;

        const chartId = match[1];
        const scriptId = `datawrapper-script-${chartId}`;

        // Prevent adding script multiple times
        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.src = `https://datawrapper.dwcdn.net/${chartId}/embed.js`;
          script.defer = true;
          script.id = scriptId;
          containerRef.current.appendChild(script);
        }
      }, [url]);

      return (
        <div ref={containerRef} style={{ width: "100%", margin: "2rem 0" }}>
          <noscript>
            <img
              src={url.replace("/1/", "/full.png")}
              alt={caption || "Embedded chart"}
              style={{ width: "100%" }}
            />
          </noscript>
          {caption && (
            <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#555" }}>
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
