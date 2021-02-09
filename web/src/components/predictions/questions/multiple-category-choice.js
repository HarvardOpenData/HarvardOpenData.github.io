import React, { useState } from "react";
import { Box, Grid, Text } from "theme-ui";
import { Range } from "react-range";
import { format } from "date-fns";
import Thumb from "./thumb";
import Track from "./track";
import theme from "../../../styles/theme.js";
import firebase from "gatsby-plugin-firebase";
import { calculateScore, displayScore, displayMessage } from "../utils";

// Rounding to first decimal value
function decimalRound(val) {
  return Math.round(val * 10) / 10;
}

function MultipleCategoryChoice(props) {
  const { uid, qid, answer } = props;
  const choices = props.choices ? props.choices : [true];
  const date_expired = new Date(props.date_expired);
  let colors = [];
  let arr = [];
  let displayArr = [];

  if (!props.choices) {
    colors = [theme.colors.primary, theme.colors.grey];
    arr = props.prediction ? [props.prediction[0]] : [50];
    displayArr = props.prediction ? props.prediction : [50];
  } else {
    colors = Object.values(theme.colors).splice(0, props.choices.length);
    if (props.prediction) {
      for (let i = 0; i < props.choices.length; i++) {
        const newVal =
          i === 0 ? props.prediction[i] : props.prediction[i] + arr[i - 1];
        arr.push(newVal);
      }
      displayArr = props.prediction;
    } else {
      // Populate arr with values of thumbs and displayArr with displayed ranges
      for (let i = 0; i < props.choices.length; i++) {
        const val = 100 / props.choices.length;
        arr.push((i + 1) * val);
        displayArr.push(decimalRound(val));
      }
    }
  }

  const [values, setValues] = useState(arr);
  const [displayValues, setDisplayValues] = useState(displayArr);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  // Populating with new values on change
  const handleChange = (values) => {
    if (values.length >= 2 && values[values.length - 1] !== 100) {
      values[values.length - 1] = 100;
    }
    setValues(values);
    const newValues = values.map((val, i) =>
      i === 0 ? decimalRound(val) : decimalRound(val - values[i - 1])
    );
    setDisplayValues(newValues);
  };

  // Updates Firebase with final values
  const updateFirebase = () => {
    const updates = {};
    updates[qid] = displayValues;
    if (date_expired.getTime() > new Date().getTime()) {
      firebase
        .database()
        .ref("predictions_users/" + uid)
        .update(updates);
    }
  };

  const predictionDisplay = props.choices ? (
    <div>
      <Text sx={{ fontSize: 2 }}>Your prediction:</Text>
      {displayValues &&
        displayValues.map((val, i) => (
          <Text sx={{ fontSize: 1 }}>{`${choices[i]}: ${val}%`}</Text>
        ))}
    </div>
  ) : (
    <Text sx={{ fontSize: 2 }}>{`Your prediction: ${displayValues[0]}%`}</Text>
  );

  return (
    <form onSubmit={(event) => afterSubmission(event)}>
      <Grid mt={1} mx={3} gap={0} columns={[2, "3fr 5fr"]}>
        <Box>
          <Text
            sx={{
              fontSize: 2,
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Text>
        </Box>
        <Box sx={{ pl: 3 }}>
          <Range
            disabled={props.disabled}
            // draggableTrack
            values={values}
            step={props.step}
            min={0}
            max={100}
            onChange={(values) => handleChange(values)}
            onFinalChange={updateFirebase}
            renderTrack={({ props, children }) => (
              <Track
                {...props}
                values={values.length >= 2 ? values.slice(0, -1) : values}
                upper={100}
                lower={0}
                colors={colors}
              >
                {children}
              </Track>
            )}
            renderThumb={({ index, props }) => (
              <Thumb
                val={String(displayValues[index]) + "%"}
                thumbProps={props}
                color={colors[index]}
              />
            )}
          />
        </Box>
        <Box>
          {predictionDisplay}
          <Text sx={{ fontSize: 1, color: "gray" }}>
            {!props.disabled ? "Answer locks on " : "Answer locked on "}
            {format(date_expired, "MM-DD-YYYY")}
          </Text>
        </Box>
        <Box sx={{ pl: 3 }}>
          {answer !== null
            ? displayScore(
                calculateScore(true, props.prediction, answer),
                props.explanation
              )
            : displayMessage(true, props.prediction)}
        </Box>
      </Grid>
    </form>
  );
}

export default MultipleCategoryChoice;
