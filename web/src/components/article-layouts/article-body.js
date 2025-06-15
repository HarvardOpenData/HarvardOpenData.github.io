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
      const iframeRef = useRef(null);

      useEffect(() => {
        const handleMessage = (event) => {
          if (
            event.data &&
            typeof event.data === "object" &&
            event.data["datawrapper-height"]
          ) {
            const chartId = Object.keys(event.data["datawrapper-height"])[0];
            const height = event.data["datawrapper-height"][chartId];
            if (iframeRef.current) {
              iframeRef.current.style.height = `${height}px`;
            }
          }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
      }, []);

      return (
        <div style={{ width: "100%", margin: "1.5rem 0" }}>
          <iframe
            ref={iframeRef}
            src={url}
            title={caption || "Embedded visualization"}
            width="100%"
            height="400" // fallback height
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            data-external="1"
            style={{
              border: "none",
              backgroundColor: "transparent",
              width: "100%",
              display: "block",
              transition: "height 0.2s ease",
            }}
          />
          {caption && (
            <p
              style={{
                fontSize: "0.9rem",
                color: "#555",
                marginTop: "0.5rem",
                textAlign: "center",
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
