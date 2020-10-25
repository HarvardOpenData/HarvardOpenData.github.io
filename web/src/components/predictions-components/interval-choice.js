import React, { useState } from "react";
import { Box } from "theme-ui";
import { Range } from "react-range";
import Thumb from "./thumb";
import Track from "./track";

function IntervalChoice(props) {
  const lower = props.lower;
  const upper = props.upper;
  const [values, setValues] = useState([lower, upper]);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={(event) => afterSubmission(event)}>
      <Box mt={1} mx={3}>
        <Range
          draggableTrack
          values={values}
          step={props.step}
          min={lower}
          max={upper}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <Track
              {...props}
              values={values}
              upper={upper}
              lower={lower}
              colors={["#ccc", "#C63F3F", "#ccc"]}
            >
              {children}
            </Track>
          )}
          renderThumb={({ index, props }) => (
            <Thumb val={values[index].toFixed(1)} thumbProps={props} />
          )}
        />
      </Box>
    </form>
  );
}

export default IntervalChoice;
