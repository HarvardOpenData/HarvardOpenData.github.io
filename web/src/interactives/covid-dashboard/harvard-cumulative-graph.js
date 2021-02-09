import React, { Component } from "react";
import { fetchTotalHarvardData } from "./data/dataservice";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { Spinner } from "theme-ui";
import theme from "../../styles/theme";

const sortOptions = [
  {
    value: ["spring", "tests"],
    label: "Spring Testing",
  },
  {
    value: ["fall", "tests"],
    label: "Fall Testing",
  },
  {
    value: ["spring", "pos"],
    label: "Spring Positive Cases",
  },
  {
    value: ["fall", "pos"],
    label: "Fall Positive Cases",
  },
];

class HarvardCumulativeGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        value: ["spring", "tests"],
        label: "Spring Testing",
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
    fetchTotalHarvardData(2).then((data) => {
      this.setState({ fallData: data });
      fetchTotalHarvardData(4).then((data) => {
        this.setState({ loading: false, springData: data });
        this.switchData(this.state.table.value);
      });
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.table !== this.state.table) {
      this.switchData(this.state.table.value);
    }
  }

  switchData(option) {
    this.setState({
      chartData: {
        labels: this.state[`${option[0]}Data`].dates,
        datasets: [
          {
            label: "Undergraduates",
            data: Object.values(
              this.state[`${option[0]}Data`][`undergrad_${option[1]}`]
            ),
            fill: true,
            borderColor: theme.colors.navy,
            pointRadius: 0,
          },
          {
            label: "Graduate Students",
            data: Object.values(
              this.state[`${option[0]}Data`][`grad_${option[1]}`]
            ),
            fill: true,
            borderColor: theme.colors.primary,
            pointRadius: 0,
          },
          {
            label: "Faculty and Staff",
            data: Object.values(
              this.state[`${option[0]}Data`][`staff_${option[1]}`]
            ),
            fill: true,
            borderColor: theme.colors.dark,
            pointRadius: 0,
          },
          {
            label: "Total",
            data: Object.values(
              this.state[`${option[0]}Data`][`total_${option[1]}`]
            ),
            fill: true,
            borderColor: theme.colors.yellow,
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
              labelString: "Date",
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
            (obj) =>
              JSON.stringify(obj.value) ===
              JSON.stringify(this.state.table.value)
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

export default HarvardCumulativeGraph;
