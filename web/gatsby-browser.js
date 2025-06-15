/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/global.css";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";

export const onClientEntry = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("message", (e) => {
        if (e.data["datawrapper-height"]) {
          for (const id in e.data["datawrapper-height"]) {
            const height = e.data["datawrapper-height"][id];
            const iframe = document.getElementById(`datawrapper-chart-${id}`);
            if (iframe) iframe.style.height = height + "px";
          }
        }
      });
    }
  };
  