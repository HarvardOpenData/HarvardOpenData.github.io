import React, { useState } from "react";
import { Box, Grid, Text } from "theme-ui";
import { Range } from "react-range";
import { format } from "date-fns";
import Thumb from "./thumb";
import Track from "./track";
import firebase from "gatsby-plugin-firebase";

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
  const uid = props.uid;
  const qid = props.qid;
  const choices = props.choices.length === 0 ? ["yes"] : props.choices;
  let colors = [];
  let arr = [];
  let displayArr = [];

  if (props.choices.length === 0) {
    colors = ["#C63F3F", "#ccc"];
    arr = props.prediction ? [props.prediction[0]] : [50];
    displayArr = props.prediction ? props.prediction : [50];
  } else {
    // Populate with gradient color values between #C63F3F and #ccc
    colors = Array.from(Array(props.choices.length).keys()).map((index) => {
      const pct = index / (props.choices.length - 1);
      const diffRed = (end_red - start_red) * pct + start_red;
      const diffGreen = (end_green - start_green) * pct + start_green;
      const diffBlue = (end_blue - start_blue) * pct + start_blue;
      return `rgb(${diffRed},${diffGreen},${diffBlue})`;
    });

    if (props.prediction) {
      for (let i = 0; i < props.choices.length - 1; i++) {
        const newVal =
          i === 0 ? props.prediction[i] : props.prediction[i] + arr[i - 1];
        arr.push(newVal);
      }
      displayArr = props.prediction;
    } else {
      // Populate arr with values of thumbs and displayArr with displayed ranges
      for (let i = 0; i < props.choices.length - 1; i++) {
        const val = 100 / props.choices.length;
        arr.push((i + 1) * val);
        displayArr.push(decimalRound(val));
      }
      displayArr.push(decimalRound(100 - arr[props.choices.length - 2]));
    }
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
    if (props.choices.length !== 0) {
      newValues.push(decimalRound(100 - values[props.choices.length - 2]));
    }
    setDisplayValues(newValues);
  };

  // Updates Firebase with final values
  const updateFirebase = () => {
    const updates = {};
    updates[qid] = displayValues;
    firebase.database().ref('predictions_users/' + uid).update(updates);
  };

  const predictionDisplay =
    props.choices.length === 0 ? (
      <Text sx={{ fontSize: 2 }}>
        {`Your prediction: ${displayValues[0]}%`}
      </Text>
    ) : (
      <div>
        <Text sx={{ fontSize: 2 }}>Your prediction:</Text>
        {displayValues &&
          displayValues.map((val, i) => (
            <Text sx={{ fontSize: 1 }}>{`Prediction of ${choices[i]}: ${val}%`}</Text>
          ))}
      </div>
    );

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
          {predictionDisplay}
          <Text sx={{ fontSize: 1, color: "gray" }}>
            Expires on {format(new Date(props.date_expired), "MM-DD-YYYY")}
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
