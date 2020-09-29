import React, {Component} from "react";
import {fetchHarvardData} from "./data/dataservice";
import {Line} from "react-chartjs-2";
import Select from "react-select";

const sortOptions = [
  {
    value: "Total Positive",
    label: "Total Positive"
  }, {
    value: "Total Tests",
    label: "Total Tests"
  }, {
    value: "Daily",
    label: "Daily"
  }
];

class HarvardGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "Total Positive",
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
      }
    };
  }

  async componentDidMount() {
    this.loadData(this.state.table);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.table !== this.state.table) {
      this.loadData(this.state.table);
    }
  }

  async loadData(table) {
    const tableIndex = (table === "Total Positive" || table === "Total Tests") ? 0 : 1;
    const data = await fetchHarvardData(tableIndex);
    switch (table) {
      case "Total Positive":
        this.setState({
          chartData: {
            labels: data.dates,
            datasets: [
              {
                label: "Undergraduates Positive",
                data: Object.values(data.undergrad_pos),
                fill: true,
                borderColor: "#455574",
                pointRadius: 0
              },
              {
                label: "Graduate Students Positive",
                data: Object.values(data.grad_pos),
                fill: true,
                borderColor: "#C63F3F",
                pointRadius: 0
              },
              {
                label: "Faculty and Staff Positive",
                data: Object.values(data.staff_pos),
                fill: true,
                borderColor: "#251616",
                pointRadius: 0
              },
              {
                label: "Total Positive",
                data: Object.values(data.total_pos),
                fill: true,
                borderColor: "#F4B436",
                pointRadius: 0
              },
            ]
          }
        });
        break;
      case "Total Tests":
        this.setState({
          chartData: {
            labels: data.dates,
            datasets: [
              {
                label: "Undergraduate Tests",
                data: Object.values(data.undergrad_tests),
                fill: true,
                borderColor: "#455574",
                pointRadius: 0
              },
              {
                label: "Graduate Student Tests",
                data: Object.values(data.grad_tests),
                fill: true,
                borderColor: "#C63F3F",
                pointRadius: 0
              },
              {
                label: "Faculty and Staff Tests",
                data: Object.values(data.staff_tests),
                fill: true,
                borderColor: "#251616",
                pointRadius: 0
              },
              {
                label: "Total Tests",
                data: Object.values(data.total_tests),
                fill: true,
                borderColor: "#F4B436",
                pointRadius: 0
              },
            ]
          }
        });
        break;
      default:
        this.setState({
          chartData: {
            labels: data.dates,
            datasets: [
              {
                label: "Undergraduates Positive",
                data: Object.values(data.undergrad_pos),
                fill: true,
                borderColor: "#455574",
                pointRadius: 0
              },
              {
                label: "Graduate Students Positive",
                data: Object.values(data.grad_pos),
                fill: true,
                borderColor: "#C63F3F",
                pointRadius: 0
              },
              {
                label: "Faculty and Staff Positive",
                data: Object.values(data.staff_pos),
                fill: true,
                borderColor: "#251616",
                pointRadius: 0
              },
              {
                label: "Tests",
                data: Object.values(data.tests),
                fill: true,
                borderColor: "#F4B436",
                pointRadius: 0
              },
            ]
          },
        });
    }
  }

  handleChange = (event) => this.setState({table: event.value});

  render() {
    const options = {
      maintainAspectRatio: false, // Don't maintain w/h ratio
    };

    return (
      <div className={"chart"}>
        <Select
          placeholder={"Select Sort"}
          value={sortOptions.find((obj) => obj.value === this.state.table)}
          options={sortOptions}
          onChange={this.handleChange}
        />
        <div style={{maxHeight: "300px"}}>
          <Line data={this.state.chartData} options={options} height={300}/>
        </div>
      </div>
    );
  }
}

export default HarvardGraph;
