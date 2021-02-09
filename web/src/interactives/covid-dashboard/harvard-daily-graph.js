import React, { Component } from "react";
import { fetchDailyHarvardData } from "./data/dataservice";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { Spinner } from "theme-ui";
import theme from "../../styles/theme";

const sortOptions = [
  {
    value: "tests",
    label: "Daily Tests",
  },
  {
    value: "undergrad_pos",
    label: "Daily Undergrad Positive Results",
  },
  {
    value: "grad_pos",
    label: "Daily Grad Positive Results",
  },
  {
    value: "staff_pos",
    label: "Daily Staff Positive Results",
  },
];

class HarvardDailyGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        value: "tests",
        label: "Daily Tests",
      },
      loading: true,
      fallData: {},
      springData: {},
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
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchDailyHarvardData(3).then((data) => {
      this.setState({ fallData: data });
      fetchDailyHarvardData(5).then((data) => {
        this.setState({ loading: false, springData: data });
        this.switchData(this.state.table);
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.table !== this.state.table) {
      this.switchData(this.state.table);
    }
  }

  switchData(option) {
    this.setState({
      chartData: {
        labels: Array.from(Array(this.state.fallData.dates.length).keys()),
        datasets: [
          {
            label: `Fall ${option.label}`,
            data: Object.values(this.state.fallData[option.value]),
            fill: true,
            borderColor: theme.colors.primary,
            pointRadius: 0,
          },
          {
            label: `Spring ${option.label}`,
            data: Object.values(this.state.springData[option.value]),
            fill: true,
            borderColor: theme.colors.navy,
            pointRadius: 0,
          },
          {
            label: `Fall ${option.label} Moving Average`,
            data: Object.values(this.state.fallData[`${option.value}_avg`]),
            fill: true,
            borderColor: theme.colors.medium,
            pointRadius: 0,
          },
          {
            label: `Spring ${option.label} Moving Average`,
            data: Object.values(this.state.springData[`${option.value}_avg`]),
            fill: true,
            borderColor: theme.colors.blue,
            pointRadius: 0,
          },
        ],
      },
    });
  }

  handleChange = (event) => this.setState({ table: event });

  render() {
    const options = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Count",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Days into the Semester",
            },
          },
        ],
      },
      maintainAspectRatio: false, // Don't maintain w/h ratio
    };

    return (
      <div className={"chart"}>
        <Select
          placeholder={"Select Sort"}
          value={sortOptions.find(
            (obj) => obj.value === this.state.table.value
          )}
          options={sortOptions}
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

export default HarvardDailyGraph;
