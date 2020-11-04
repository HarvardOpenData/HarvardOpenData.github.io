import React, { useState } from "react";
import { Box, Text } from "theme-ui";
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
  const arr = [];
  const displayArr = [];

  // Populate with gradient color values between #C63F3F and #ccc
  let colors = Array.from(Array(length).keys()).map((index) => {
    const pct = index / (length - 1);
    const diffRed = (end_red - start_red) * pct + start_red;
    const diffGreen = (end_green - start_green) * pct + start_green;
    const diffBlue = (end_blue - start_blue) * pct + start_blue;
    return `rgb(${diffRed},${diffGreen},${diffBlue})`;
  });

  // Populate arr with values of thumbs and displayArr with displayed ranges
  for (let i = 0; i < length - 1; i++) {
    const val = 100 / length;
    arr.push((i + 1) * val);
    displayArr.push(decimalRound(val));
  }
  displayArr.push(decimalRound(100 - arr[length - 2]));

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
      <Box mt={1} mx={3}>
        <Range
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
          renderThumb={({ props }) => <Thumb val={""} thumbProps={props} />}
        />
        {displayValues &&
          displayValues.map((val, i) => (
            <Text sx={{ fontWeight: "bold" }}>
              {`Probability of ${props.choices[i].name}: ${val}%`}
            </Text>
          ))}
      </Box>
    </form>
  );
}

export default MultipleCategoryChoice;
