/** @jsx jsx */
import { jsx, Text } from "theme-ui";
import { useEffect, useRef, useState } from "react";

function IFrame(props) {
  const iframeRef = useRef(null);

  const chartId = props.url?.includes("datawrapper.dwcdn.net")
    ? props.url.match(/dwcdn\.net\/([a-zA-Z0-9]+)\//)?.[1]
    : null;

  const [dwHeight, setDwHeight] = useState(400);

  useEffect(() => {
    if (!chartId) return;

    const scriptId = `dw-script-${chartId}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = `https://datawrapper.dwcdn.net/${chartId}/embed.js`;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }

    function onMessage(event) {
      if (event.data?.["datawrapper-height"]?.[chartId]) {
        setDwHeight(event.data["datawrapper-height"][chartId]);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [props.url, chartId]);

  const ratioValues = props.aspectRatio ? props.aspectRatio.split(":") : ["16", "9"];
  const aspectRatio = `${((ratioValues[1] * 100) / ratioValues[0]).toFixed(2)}%`;

  return (
    <div style={{ alignItems: "center" }}>
      <br />
      {chartId ? (
        <iframe
          ref={iframeRef}
          src={props.url}
          id={`datawrapper-chart-${chartId}`}
          title={props.caption || "Embedded content"}
          scrolling="no"
          style={{
            width: "0",
            minWidth: "100%",
            height: `${dwHeight}px`,
            border: "none",
            display: "block",
          }}
          data-external="1"
        />
      ) : (
        <div style={{ paddingBottom: aspectRatio, position: "relative" }}>
          {props.url && (
            <iframe
              ref={iframeRef}
              src={props.url}
              title={props.caption || "Embedded content"}
              scrolling="no"
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                border: "none",
              }}
              data-external="1"
            />
          )}
        </div>
      )}
      <Text variant="caption">{props.caption}</Text>
      <br />
    </div>
  );
}

export default IFrame;
