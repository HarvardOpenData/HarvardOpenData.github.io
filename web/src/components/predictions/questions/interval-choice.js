import React, { useEffect, useState } from "react";
import firebase from "gatsby-plugin-firebase";
import { Box, Grid, Text, Input } from "theme-ui";
import { Range } from "react-range";
import { format } from "date-fns";
import theme from "../../../styles/theme.js";
import Thumb from "./thumb";
import Track from "./track";
import { calculateScore, displayMessage, displayScore } from "../utils";
import Spacer from "../../core/spacer.js";

function IntervalChoice(props) {
  const { uid, qid, answer, lower, upper, step } = props;
  const date_expired = new Date(props.date_expired);
  const [values, setValues] = useState(
    props.prediction ? props.prediction : [lower, upper]
  );
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (props.prediction) {
      updateFirebase();
      setFlag(false);
    }
  }, [flag, props.prediction]);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  const parseValue = (value) => {
    return step === 1 ? parseInt(value) : parseFloat(value);
  }

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
    let value = parseValue(e.target.value);
    if (value < lower || e.target.value === "") {
      value = lower;
    } else if (value > bound) {
      value = bound;
    }
    setValues([value, values[1]]);
    setFlag(true);
  };

  const validateUpper = (e) => {
    const bound = Math.max(values[0], lower);
    let value = parseValue(e.target.value);
    if (value > upper || e.target.value === "") {
      value = upper;
    } else if (value < bound) {
      value = bound;
    }
    setValues([values[0], value]);
    setFlag(true);
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

    return [min, max];
  };

  function validateThumb(index) {
    if (values[index] === "") {
      return lower;
    } else if (values[index] < lower) {
      return lower;
    } else if (values[index] >= upper) {
      return String(upper) + "+";
    } else {
      return values[index];
    }
  }

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
                colors={[
                  theme.colors.grey,
                  theme.colors.primary,
                  theme.colors.grey,
                ]}
              >
                {children}
              </Track>
            )}
            renderThumb={({ index, props }) => (
              <Thumb val={validateThumb(index)} thumbProps={props} />
            )}
          />
        </Box>
        <Box>
          <Text sx={{ fontSize: 2 }}>Your prediction:</Text>
          <Spacer height={0} />
          <Input
            sx={{
              width: "35%",
              display: "inline",
              p: 1,
            }}
            type="number"
            min={lower}
            max={upper}
            value={values[0]}
            disabled={props.disabled}
            onChange={(e) =>
              setValues([e.target.value && parseValue(e.target.value), values[1]])
            }
            onBlur={validateLower}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
          />
          {" - "}
          <Input
            sx={{
              width: "35%",
              display: "inline",
              p: 1,
            }}
            type="number"
            min={lower}
            max={upper}
            value={values[1]}
            disabled={props.disabled}
            onChange={(e) =>
              setValues([values[0], e.target.value && parseValue(e.target.value)])
            }
            onBlur={validateUpper}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
          />
          <Spacer height={0} />
          <Text sx={{ fontSize: 1, color: "gray" }}>
            {!props.disabled ? "Answer locks on " : "Answer locked on "}
            {format(date_expired, "MM-DD-YYYY")}
          </Text>
        </Box>
        <Box sx={{ pl: 3 }}>
          {answer !== null
            ? displayScore(
                calculateScore(false, props.prediction, answer, [lower, upper]),
                props.explanation
              )
            : displayMessage(false, props.prediction, [lower, upper])}
        </Box>
      </Grid>
    </form>
  );
}

export default IntervalChoice;
