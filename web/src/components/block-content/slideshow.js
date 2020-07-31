/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState } from "react";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";

import styles from "./slideshow.module.css";

function Slideshow(props) {
  const [index, setIndex] = useState(0);
  if (!props.slides) return null;
  const len = props.slides.length;
  function handlePrev() {
    setIndex(Math.max(index - 1, 0));
  }
  function handleNext() {
    setIndex(Math.min(index + 1, len - 1));
  }
  return (
    <div
      className="root"
      sx={{
        color: "dark",
        margin: ["margin: 2rem -2rem", "margin: 2rem 0", "2rem -1.5rem"],
        overflow: "hidden",
        padding: "1rem",
      }}
    >
      <ul
        className={styles.carousel}
        data-index={index}
        style={{ transform: `translate3d(${index * -100}%, 0, 0)` }}
      >
        {props.slides.map((slide) => (
          <li key={slide._key} className={styles.slide}>
            {slide.asset && (
              <img
                src={imageUrlFor(buildImageObj(slide))
                  .width(1200)
                  .height(Math.floor((5 / 8) * 1200))
                  .fit("crop")
                  .url()}
              />
            )}
          </li>
        ))}
      </ul>
      <div className={styles.nav}>
        <button onClick={handlePrev} disabled={index === 0}>
          Prev
        </button>
        <span>
          {index + 1} of {len}
        </span>
        <button onClick={handleNext} disabled={index === len - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Slideshow;
