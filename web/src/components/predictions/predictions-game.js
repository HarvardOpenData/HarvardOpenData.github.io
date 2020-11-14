import React, { useState } from "react";
import IntervalChoice from "./questions/interval-choice"
import MultipleCategoryChoice from "./questions/multiple-category-choice"

function PredictionsGame(props) {
  const lower = props.lower;
  const upper = props.upper;
  const [values, setValues] = useState([lower, upper]);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      Predictions Game Goes Here
    </div>
  );
}

export default PredictionsGame;
