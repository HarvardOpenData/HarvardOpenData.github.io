import React, {Component} from "react";
import {Box, Button, Label, Slider} from "theme-ui";

class MultipleCategoryChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Array(props.choices.length).fill({max: 100, current: 0})
    };

    this.handleChange = this.handleChange.bind(this);
  }

  afterSubmission(event) {
    event.preventDefault();
    if (!this.state.values.every(slider => slider.max === slider.current)) {
      console.log("false");
    }
  };

  handleChange(event) {
    const value = parseInt(event.target.value);
    const index = parseInt(event.target.id);
    const diff = this.state.values[event.target.id].current - value;

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
    this.setState({values});
  }

  render() {
    return (
      <form onSubmit={event => this.afterSubmission(event)}>
        {this.props.choices && this.props.choices.map((choice, index) =>
          <Box>
            <Label>
              {choice.name}: {this.state.values[index].current}
            </Label>
            <Slider
              name={choice.name}
              id={index}
              max={this.state.values[index].max}
              min={0}
              onChange={this.handleChange}
              value={this.state.values[index].current}
            />
          </Box>
        )}
        <br/>
        <Button type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default MultipleCategoryChoice;