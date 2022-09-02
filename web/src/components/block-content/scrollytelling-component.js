import React, { useState } from "react";
import { Scrollama, Step } from 'react-scrollama';
import BlockContent from "../block-content";

function ScrollytellingImage(props) {
  if (props.index === null) {
    return null;
  } else if (props.index === 0 || props.progress === 1) {
    return (
      <BlockContent blocks={props.images[props.index].graphic} />
    );
  } else if (props.progress > 0) {
    return (
      <>
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: 1 - props.progress}}>
          <BlockContent blocks={props.images[props.index - 1].graphic} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: props.progress}}>
          <BlockContent blocks={props.images[props.index].graphic} />
        </div>
      </>
    );
  }
  return (
    <BlockContent blocks={props.images[props.index].graphic} />
  );
}

function ScrollytellingComponent(props) {
  const [currentEnterIndex, setCurrentEnterIndex] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentEnterIndex(data);
  };
  const onStepProgress = ({ progress }) => {
    setCurrentProgress(progress);
  };

  return (
    <div style={{ border: '2px dashed white' }}>
      <div style={{ position: 'sticky', top: '10vh', margin: 'auto', zIndex: 0 }}>
        <ScrollytellingImage index={currentEnterIndex} images={props.scrollyTellingBlocks} progress={currentProgress} />
      </div>
      <Scrollama onStepEnter={onStepEnter} onStepProgress={onStepProgress} threshold={1} offset={1} progress>
        {
          props.scrollyTellingBlocks.map((block, i) => {
            return (
              <Step data={i} key={i}>
                <div
                  style={{
                    margin: '100vh 0',
                    background: '#ffffff',
                    opacity: 0.9,
                  }}
                >
                  <BlockContent blocks={block.textContent || []} />
                <br style={{clear: 'both'}}/>
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
