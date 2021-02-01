import React, {useEffect, useState} from "react";
import firebase from "gatsby-plugin-firebase";
import { Box, Grid, Text, Input } from "theme-ui";
import { Range } from "react-range";
import { format } from "date-fns";
import Thumb from "./thumb";
import Track from "./track";

function IntervalChoice(props) {
  const {uid, qid, lower, upper} = props;
  const date_expired = new Date(props.date_expired);
  const [values, setValues] = useState(
    props.prediction ? props.prediction : [lower, upper]
  );

  useEffect(() => {
      updateFirebase();
  }, [values]);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  // Updates Firebase with final values
  const updateFirebase = () => {
    const updates = {};
    updates[qid] = values;
    if (date_expired.getTime() > new Date().getTime()) {
      firebase
          .database()
          .ref("predictions_users/" + uid)
          .update(updates);
    }
  };

  const validateLower = (e) => {
      const bound = Math.min(values[1], upper);
      let value = parseInt(e.target.value);
      if (value < lower || e.target.value === "") {
          value = lower;
      } else if (value > bound) {
          value = bound;
      }
      setValues([value, values[1]]);
  };

  const validateUpper = (e) => {
      const bound = Math.max(values[0], lower);
      let value = parseInt(e.target.value);
      if (value > upper || e.target.value === "") {
          value = upper;
      } else if (value < bound) {
          value = bound;
      }
      setValues([values[0], value]);
  };

  const validateValues = (values) => {
    let min = values[0];
    let max = values[1];

      if (min < lower) {
          min = lower;
      } else if (min > upper) {
          min = upper;
      }

      if (max < lower) {
          max = lower;
      } else if (max > upper) {
          max = upper;
      }

      return [min, max]
  };

  function validateThumb(index) {
      if (values[index] === "") {
          return lower
      } else if (values[index] < lower) {
          return lower
      } else if (values[index] > upper) {
          return upper
      } else {
          return values[index]
      }
  }

  return (
    <form onSubmit={(event) => afterSubmission(event)}>
      <Grid mt={1} mx={3} gap={2} columns={[1, "3fr 5fr"]}>
        <Box>
          <Text
            sx={{
              fontSize: 2,
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Text>
          <Text sx={{ fontSize: 2 }}>
            Your prediction:
          </Text>
          <Input
              sx={{
                  width: "35%",
                  display: "inline",
                  p: 1
              }}
              type='number'
              min={lower}
              max={upper}
              value={values[0]}
              onChange={(e) => setValues([e.target.value && parseInt(e.target.value), values[1]])}
              onBlur={validateLower}
              onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
          />
          {" - "}
          <Input
              sx={{
                  width: "35%",
                  display: "inline",
                  p: 1
              }}
              type='number'
              min={lower}
              max={upper}
              value={values[1]}
              onChange={(e) => setValues([values[0], e.target.value && parseInt(e.target.value)])}
              onBlur={validateUpper}
              onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
          />
          <Text sx={{ fontSize: 1, color: "gray" }}>
            {props.disabled ? "Expired" : "Expires"} on{" "}
            {format(date_expired, "MM-DD-YYYY")}
          </Text>
        </Box>
        <Range
          disabled={props.disabled}
          // draggableTrack
          values={validateValues(values)}
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
            <Thumb val={validateThumb(index)} thumbProps={props} />
          )}
        />
        {props.explanation}
      </Grid>
    </form>
  );
}

export default IntervalChoice;
