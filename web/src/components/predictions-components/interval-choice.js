import React, { useState } from "react";
import { Box } from "theme-ui";
import { Range, getTrackBackground } from 'react-range';

const STEP = 0.1;

function IntervalChoice(props) {
  const lower = props.lower;
  const upper = props.upper;
  const [values, setValues] = useState([lower, upper]);

  const afterSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={event => afterSubmission(event)}>
      <Box mt={1} mx={3}>
        <Range
          draggableTrack
          values={values}
          step={STEP}
          min={lower}
          max={upper}
          onChange={values => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '5rem',
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '0.3rem',
                  width: '100%',
                  borderRadius: '0.3rem',
                  background: getTrackBackground({
                    values: values,
                    colors: ['#ccc', '#C63F3F', '#ccc'],
                    min: lower,
                    max: upper
                  }),
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '0.8rem',
                width: '0.8rem',
                borderRadius: '0.3rem',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 0.15rem 0.45rem #AAA'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-2rem',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '0.3rem',
                  borderRadius: '0.3rem',
                  backgroundColor: '#2F2F2F'
                }}
              >
                {values[index].toFixed(1)}
              </div>
            </div>
          )}
        />
      </Box>
    </form>
  );
}

export default IntervalChoice;