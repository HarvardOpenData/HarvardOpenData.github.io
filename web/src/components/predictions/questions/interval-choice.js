import React, { useState } from "react";
import firebase from "gatsby-plugin-firebase";
import { Box, Grid, Text } from "theme-ui";
import { Range } from "react-range";
import { format } from "date-fns";
import Thumb from "./thumb";
import Track from "./track";

function IntervalChoice(props) {
  const uid = props.uid;
  const qid = props.qid;
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
    let updates = {};
    updates[qid] = values;
    if (new Date(props.date_expired).getTime() > new Date().getTime()) {
      firebase
          .database()
          .ref("predictions_users/" + uid)
          .update(updates);
    }
  };

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
            Your prediction: {values.join(" - ")}
          </Text>
          <Text sx={{ fontSize: 1, color: "gray" }}>
            {props.disabled ? "Expired" : "Expires"} on{" "}
            {format(new Date(props.date_expired), "MM-DD-YYYY")}
          </Text>
        </Box>
        <Range
          disabled={props.disabled}
          // draggableTrack
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
        {props.explanation}
      </Grid>
    </form>
  );
}

export default IntervalChoice;
