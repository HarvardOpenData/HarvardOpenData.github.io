import React, { useState } from "react";
import { Box, Grid, Text } from "theme-ui";
import { Range } from "react-range";
import Thumb from "./thumb";
import Track from "./track";

// RGB Values for #C63F3F and #ccc
const start_red = 198;
const start_green = 63;
const start_blue = 63;
const end_red = 204;
const end_green = 204;
const end_blue = 204;

// Rounding to first decimal value
function decimalRound(val) {
  return Math.round(val * 10) / 10;
}

function MultipleCategoryChoice(props) {
  const length = props.choices.length;
  let arr = [];
  let displayArr = [];

  // Populate with gradient color values between #C63F3F and #ccc
  let colors = Array.from(Array(length).keys()).map((index) => {
    const pct = index / (length - 1);
    const diffRed = (end_red - start_red) * pct + start_red;
    const diffGreen = (end_green - start_green) * pct + start_green;
    const diffBlue = (end_blue - start_blue) * pct + start_blue;
    return `rgb(${diffRed},${diffGreen},${diffBlue})`;
  });

  if (props.prediction) {
    // In case binary choice, set predictions array to [prediction, 100 - prediction]
    const prediction =
      length === 2
        ? [props.prediction[0], 100 - props.prediction[0]]
        : props.prediction;

    for (let i = 0; i < length - 1; i++) {
      const newVal = i === 0 ? prediction[i] : prediction[i] + arr[i - 1];
      arr.push(newVal);
    }
    displayArr = prediction;
  } else {
    // Populate arr with values of thumbs and displayArr with displayed ranges
    for (let i = 0; i < length - 1; i++) {
      const val = 100 / length;
      arr.push((i + 1) * val);
      displayArr.push(decimalRound(val));
    }
    displayArr.push(decimalRound(100 - arr[length - 2]));
  }

  const [values, setValues] = useState(arr);
  const [displayValues, setDisplayValues] = useState(displayArr);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  // Populating with new values on change
  const handleChange = (values) => {
    setValues(values);
    const newValues = values.map((val, i) =>
      i === 0 ? decimalRound(val) : decimalRound(val - values[i - 1])
    );
    newValues.push(decimalRound(100 - values[length - 2]));
    setDisplayValues(newValues);
  };

  // Updates Firebase with final values
  const updateFirebase = () => {
    console.log(displayValues);
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
          <Text sx={{ fontSize: 2 }}>Your prediction:</Text>
          {displayValues &&
            displayValues.map((val, i) => (
              <Text sx={{ fontSize: 1 }}>
                {`Probability of ${props.choices[i]}: ${val}%`}
              </Text>
            ))}
          <Text sx={{ fontSize: 1, color: "gray" }}>
            Expires on {props.date_expired}
          </Text>
        </Box>
        <Range
          disabled={props.disabled}
          draggableTrack
          values={values}
          step={props.step}
          min={0}
          max={100}
          onChange={(values) => handleChange(values)}
          onFinalChange={updateFirebase}
          renderTrack={({ props, children }) => (
            <Track
              {...props}
              values={values}
              upper={100}
              lower={0}
              colors={colors}
            >
              {children}
            </Track>
          )}
          renderThumb={({ index, props }) => (
            <Thumb val={displayValues[index]} thumbProps={props} />
          )}
        />
      </Grid>
    </form>
  );
}

export default MultipleCategoryChoice;
