import React from "react";
import {Button, Label, Radio} from "theme-ui";

function BinaryChoice(props) {
  const afterSubmission = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form onSubmit={event => afterSubmission(event)}>
      <Label>
        <Radio
          name='binary-choice'
          value='true'
          defaultChecked={true}
        />
        {props.choices.first}
      </Label>
      <Label>
        <Radio
          name='binary-choice'
          value='false'
        />
        {props.choices.second}
      </Label>
      <br/>
      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}

export default BinaryChoice;