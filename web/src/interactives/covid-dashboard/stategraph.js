import React, { Component } from "react";
import { fetchStateData } from "./data/dataservice";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { Spinner } from "theme-ui";
import theme from "../../styles/theme";

const DAILY = "daily";

const stateOptions = [];

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
      loading: true,
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

  componentDidMount() {
    this.loadData(this.state.state);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state !== this.state.state) {
      this.loadData(this.state.state);
    }
  }

  loadData(state) {
    this.setState({ loading: true });
    fetchStateData(state).then((data) =>
      this.setState({
        loading: false,
        chartData: {
          labels: data.dates,
          datasets:
            this.state.sort === DAILY
              ? [
                  {
                    label: "Hospitalized Currently",
                    data: Object.values(data.hospitalizedCurrently),
                    fill: true,
                    borderColor: theme.colors.navy,
                    pointRadius: 0,
                  },
                  {
                    label: "Increase in Cases",
                    data: Object.values(data.positiveIncrease),
                    fill: true,
                    borderColor: theme.colors.primary,
                    pointRadius: 0,
                  },
                  {
                    label: "Increase in Deaths",
                    data: Object.values(data.deathIncrease),
                    fill: true,
                    borderColor: theme.colors.dark,
                    pointRadius: 0,
                  },
                  {
                    label: "Moving Average of Daily Cases",
                    data: Object.values(data.movingAvgCases),
                    fill: true,
                    borderColor: theme.colors.yellow,
                    pointRadius: 0,
                  },
                ]
              : [
                  {
                    label: "Confirmed",
                    data: data.confirmed,
                    fill: true,
                    borderColor: theme.colors.primary,
                    pointRadius: 0,
                  },
                  {
                    label: "Deaths",
                    data: Object.values(data.deaths),
                    fill: true,
                    borderColor: theme.colors.dark,
                    pointRadius: 0,
                  },
                  {
                    label: "Recovered",
                    data: Object.values(data.recovered),
                    fill: true,
                    borderColor: theme.colors.navy,
                    pointRadius: 0,
                  },
                ],
        },
      })
    );
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
        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <Line data={this.state.chartData} options={options} height={300} />
          )}
        </div>
      </div>
    );
  }
}

export default StateGraph;
