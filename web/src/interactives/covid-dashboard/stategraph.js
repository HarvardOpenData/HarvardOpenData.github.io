import React, { Component } from "react";
import { fetchStateData } from "./data/dataservice";
import { Line } from "react-chartjs-2";
import Select from "react-select";

let stateOptions = [];

const statesData = require("./assets/states.json");

statesData.forEach((state) =>
  stateOptions.push({
    value: state.abbreviation,
    label: state.name,
  })
);

class StateGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "MA",
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Cases",
            data: [],
            fill: true,
            borderColor: "red",
          },
        ],
      },
      sort: props.sort,
    };
  }

  async componentDidMount() {
    this.loadData(this.state.state);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state !== this.state.state) {
      this.loadData(this.state.state);
    }
  }

  async loadData(state) {
    const data = await fetchStateData(state);
    console.log(data)
    this.setState({
      chartData: {
        labels: data.dates,
        datasets:
          this.state.sort === "daily"
            ? [
                {
                  label: "Hospitalized Currently",
                  data: Object.values(data.hospitalizedCurrently),
                  fill: true,
                  borderColor: "#455574",
                },
                {
                  label: "Increase in Cases",
                  data: Object.values(data.positiveIncrease),
                  fill: true,
                  borderColor: "#C63F3F",
                },
                {
                  label: "Increase in Deaths",
                  data: Object.values(data.deathIncrease),
                  fill: true,
                  borderColor: "#251616",
                },
                {
                  label: "Moving Average of Daily Cases",
                  data: Object.values(data.movingAvgCases),
                  fill: true,
                  borderColor: "#F4B436",
                },
              ]
            : [
                {
                  label: "Confirmed",
                  data: data.confirmed,
                  fill: true,
                  borderColor: "#C63F3F",
                },
                {
                  label: "Deaths",
                  data: Object.values(data.deaths),
                  fill: true,
                  borderColor: "#251616",
                },
                {
                  label: "Recovered",
                  data: Object.values(data.recovered),
                  fill: true,
                  borderColor: "#455574",
                },
              ],
      },
    });
  }

  handleChange = (event) => this.setState({ state: event.value });

  render() {
    const options = {
      maintainAspectRatio: false, // Don't maintain w/h ratio
    };

    return (
      <div className={"chart"}>
        <Select
          placeholder={"Select State"}
          value={stateOptions.find((obj) => obj.value === this.state.state)}
          options={stateOptions}
          onChange={this.handleChange}
        />
        <div style={{ maxHeight: "300px" }}>
          <Line data={this.state.chartData} options={options} height={300} />
        </div>
      </div>
    );
  }
}

export default StateGraph;
