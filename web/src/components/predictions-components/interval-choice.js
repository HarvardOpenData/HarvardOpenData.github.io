import React, {useState} from "react";
import {Button, Input, Label} from "theme-ui";

function IntervalChoice(props) {
  const [lower, setLower] = useState(props.lower);
  const [upper, setUpper] = useState(props.upper);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={event => afterSubmission(event)}>
      <Label>
        Lower Bound:
      </Label>
      <Input
        name={"lower"}
        type={"number"}
        max={upper}
        min={props.lower}
        onChange={e => setLower(e.target.value)}
        value={lower}
      />
      <br/>
      <Label>
        Upper Bound:
      </Label>
      <Input
        name={"upper"}
        type={"number"}
        max={props.max}
        min={lower}
        onChange={e => setUpper(e.target.value)}
        value={upper}
      />
      <br/>
      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}

export default IntervalChoice;