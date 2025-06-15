/** @jsx jsx */
import { jsx, Text } from "theme-ui";
import { useEffect, useRef } from "react";

function IFrame(props) {
  const iframeRef = useRef(null);

  const ratioValues = props.aspectRatio ? props.aspectRatio.split(":") : ["16", "9"];
  const aspectRatio = `${((ratioValues[1] * 100) / ratioValues[0]).toFixed(2)}%`;

  useEffect(() => {
    if (!props.url) return;

    // Only inject script for Datawrapper charts
    if (props.url.includes("datawrapper.dwcdn.net")) {
      const match = props.url.match(/dwcdn\.net\/([^/]+)/);
      const chartId = match?.[1];
      const scriptId = `dw-script-${chartId}`;
      
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.src = `https://datawrapper.dwcdn.net/${chartId}/embed.js`;
        script.defer = true;
        script.id = scriptId;
        document.body.appendChild(script);
      }
    }
  }, [props.url]);

  return (
    <div style={{ alignItems: "center" }}>
      <br />
      <div style={{ paddingBottom: aspectRatio, position: "relative" }}>
        {props.url && (
          <iframe
            ref={iframeRef}
            src={props.url}
            scrolling="no"
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              border: "none",
            }}
            id={
              props.url.includes("datawrapper.dwcdn.net")
                ? `datawrapper-chart-${props.url.match(/dwcdn\.net\/([^/]+)/)?.[1]}`
                : undefined
            }
            title={props.caption || "Embedded content"}
            data-external="1"
          />
        )}
      </div>
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default IFrame;
