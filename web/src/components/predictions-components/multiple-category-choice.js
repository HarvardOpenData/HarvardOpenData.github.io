import React, { Component } from "react";
import { Box, Button, Label } from "theme-ui";
import { Range, getTrackBackground } from 'react-range';

class MultipleCategoryChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Array(props.choices.length).fill({ max: 100, current: 0 })
    };

    this.handleChange = this.handleChange.bind(this);
  }

  afterSubmission(event) {
    event.preventDefault();
    if (!this.state.values.every(slider => slider.max === slider.current)) {
      console.log("false");
    }
  };

  handleChange(value, index) {
    const diff = this.state.values[index].current - value;

    const values = [...this.state.values].map((slider, i) => {
      if (index === i) {
        return {
          max: slider.max,
          current: value
        };
      } else {
        return {
          max: slider.max + diff,
          current: slider.current
        };
      }
    });
    this.setState({ values });
  }

  render() {
    return (
      <form onSubmit={event => this.afterSubmission(event)}>
        {this.props.choices && this.props.choices.map((choice, index) =>
          <Box>
            <Label>
              {choice.name}: {this.state.values[index].current.toFixed(1)}
            </Label>
            <Box p={3}>
              <Range
                name={choice.name}
                id={index}
                step={0.1}
                max={this.state.values[index].max}
                min={0}
                values={[this.state.values[index].current]}
                onChange={values => this.handleChange(values[0], index)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '2.5rem',
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
                          values: [this.state.values[index].current],
                          colors: ['#C63F3F', '#ccc'],
                          min: 0,
                          max: this.state.values[index].max
                        }),
                        alignSelf: 'center'
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props }) => (
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
                      {this.state.values[index].current.toFixed(1)}
                    </div>
                  </div>
                )}
              />
            </Box>
          </Box>
        )}
        <br />
        <Button type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default MultipleCategoryChoice;