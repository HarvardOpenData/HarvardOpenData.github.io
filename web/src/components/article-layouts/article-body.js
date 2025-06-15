/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import ArticleHeader from "./article-header";
import ArticleSidebar from "./article-sidebar";
import BlockContent from "../block-content";
import Container from "../core/container";
import { DiscussionEmbed } from "disqus-react";

import React, { useEffect, useRef } from "react";

/*const DatawrapperEmbed = ({ url, caption }) => {
  const iframeRef = useRef(null);
  const chartId = url.match(/\/([a-zA-Z0-9]+)\/\d+\/?$/)?.[1];

  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log("📩 Raw message received:", e.data);
    });
    
    const receiveMessage = (e) => {
      if (!e.data || !e.data["datawrapper-height"]) return;

      const heights = e.data["datawrapper-height"];
      const iframe = iframeRef.current;

      Object.keys(heights).forEach((id) => {
        if (iframe?.id === `datawrapper-chart-${id}`) {
          const height = heights[id];
          console.log("🔧 Setting dynamic height for", id, ":", height);
          iframe.style.setProperty("height", `${height}px`, "important");
        }
      });
    };

    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return (
    <div style={{ width: "100%", margin: "2rem 0" }}>
      <iframe
        ref={iframeRef}
        src={url}
        title={caption || "Datawrapper Chart"}
        id={`datawrapper-chart-${chartId}`}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        data-external="1"
        style={{
          width: "0",
          minWidth: "100%",
          border: "none",
          transition: "height 0.2s ease",
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
};*/

const DatawrapperEmbed = ({ chartId }) => {
  return (
    <div style={{ minHeight: "400px" }} id={`datawrapper-${chartId}`}>
      <script
        type="text/javascript"
        defer
        src={`https://datawrapper.dwcdn.net/${chartId}/embed.js`}
        data-target={`#datawrapper-${chartId}`}
      ></script>
      <noscript>
        <img
          src={`https://datawrapper.dwcdn.net/${chartId}/full.png`}
          alt="Chart"
        />
      </noscript>
    </div>
  );
};


const serializers = {
  types: {
    iframe: ({ node }) => {
      const chartId = node.url.match(/\/([a-zA-Z0-9]+)\/\d+\/?$/)?.[1];
      if (!chartId) return <p style={{ color: "red" }}>Invalid Datawrapper URL</p>;
      return <DatawrapperEmbed chartId={chartId} />;
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
