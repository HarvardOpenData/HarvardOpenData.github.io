import React, { useState } from "react";
import { Box, Label } from "theme-ui";
import { Range } from "react-range";
import Thumb from "./thumb";
import Track from "./track";

function MultipleCategoryChoice(props) {
  const [values, setValues] = useState(
    Array(props.choices.length).fill({ max: 100, current: 0 })
  );

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  const handleChange = (value, index) => {
    const newValues = values.map((slider, i) => {
      if (index === i) {
        return {
          max: slider.max,
          current: value,
        };
      } else {
        return {
          max: slider.max + values[index].current - value,
          current: slider.current,
        };
      }
    });
    setValues(newValues);
  };

  return (
    <form onSubmit={(event) => afterSubmission(event)}>
      {props.choices &&
        props.choices.map((choice, index) => (
          <Box>
            <Label>
              {choice.name}: {values[index].current.toFixed(1)}
            </Label>
            <Box mt={1} mx={3}>
              <Range
                name={choice.name}
                id={index}
                step={props.step}
                max={values[index].max}
                min={0}
                values={[values[index].current]}
                onChange={(values) => handleChange(values[0], index)}
                renderTrack={({ props, children }) => (
                  <Track
                    {...props}
                    values={[values[index].current]}
                    upper={values[index].max}
                    lower={0}
                    colors={["#C63F3F", "#ccc"]}
                  >
                    {children}
                  </Track>
                )}
                renderThumb={({ props }) => (
                  <Thumb
                    val={values[index].current.toFixed(1)}
                    thumbProps={props}
                  />
                )}
              />
            </Box>
          </Box>
        ))}
    </form>
  );
}

export default MultipleCategoryChoice;
