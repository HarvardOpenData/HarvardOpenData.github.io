import React, { useState } from "react";
import { Box, Grid, Text } from "theme-ui";
import { Range } from "react-range";
import Thumb from "./thumb";
import Track from "./track";

function IntervalChoice(props) {
  const lower = props.lower;
  const upper = props.upper;
  const [values, setValues] = useState(
    props.prediction ? props.prediction : [lower, upper]
  );

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  // Updates Firebase with final values
  const updateFirebase = () => {
    console.log(values);
  };

  return (
    <form onSubmit={(event) => afterSubmission(event)}>
      <Grid mt={1} mx={3} gap={2} columns={[1, "3fr 5fr"]}>
        <Box>
          <Text
            sx={{
              fontSize: 3,
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Text>
          <Text sx={{ fontSize: 2 }}>
            Your prediction: {values.join(" - ")}
          </Text>
          <Text sx={{ fontSize: 1, color: "gray" }}>
            Expires on {props.date_expired}
          </Text>
        </Box>
        <Range
          disabled={props.disabled}
          draggableTrack
          values={values}
          step={props.step}
          min={lower}
          max={upper}
          onChange={(values) => setValues(values)}
          onFinalChange={updateFirebase}
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
            <Thumb val={values[index]} thumbProps={props} />
          )}
        />
      </Grid>
    </form>
  );
}

export default IntervalChoice;
