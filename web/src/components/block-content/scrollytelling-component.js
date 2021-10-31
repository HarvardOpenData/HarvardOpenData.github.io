import React, { useState } from "react";
import { Scrollama, Step } from 'react-scrollama';
import BlockContent from "../block-content";

function ScrollytellingComponent(props) {
  const [currentEnterIndex, setCurrentEnterIndex] = useState(null);
  const [currentExitIndex, setCurrentExitIndex] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentEnterIndex(data);
  };
  const onStepExit = ({ data }) => {
    setCurrentExitIndex(data);
  };
  const onStepProgress = ({ progress }) => {
    setCurrentProgress(progress);
  };

  return (
    <div>
      <div style={{ position: 'sticky', top: '10vh', left: '-50%', margin: 'auto', zIndex: 0 }}>
        {currentEnterIndex !== null ? <BlockContent blocks={props.scrollyTellingBlocks[currentEnterIndex].graphic} /> : null}
        {/* I'm sticky. The current triggered step index is: {currentEnterIndex}. The current triggered step exit is: {currentExitIndex}. The current triggered progress is: {currentProgress}. */}
      </div>
      <Scrollama onStepEnter={onStepEnter} onStepExit={onStepExit} onStepProgress={onStepProgress} threshold={1} offset={1} progress>
        {
          props.scrollyTellingBlocks.map((block, i) => {
            return (
              <Step data={i} key={i}>
                <div
                  style={{
                    margin: "100vh 0",
                    padding: '1vh 5vh',
                    position: 'relative',
                    zIndex: 1,
                    background: '#ffffff',
                    opacity: 0.9,
                  }}
                >
                  <BlockContent blocks={block.textContent || []} />
                </div>
              </Step>
            )
          })
        }
      </Scrollama>
    </div>
  );
}

export default ScrollytellingComponent;
