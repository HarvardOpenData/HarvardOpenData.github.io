import React, { Component } from "react";
import { fetchHistData } from "./data/dataservice";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { Spinner } from "theme-ui";

let countryOptions = [{ value: "all", label: "World" }];

const countriesData = require("./assets/countries.json");

countriesData.forEach((country) =>
  countryOptions.push({
    value: country.name,
    label: country.name,
  })
);

class CountryGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "all",
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
    };
  }

  componentDidMount() {
    this.loadData(this.state.country).then(() =>
      this.setState({ loading: false })
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.country !== this.state.country) {
      this.setState({ loading: true });
      this.loadData(this.state.country).then(() =>
        this.setState({ loading: false })
      );
    }
  }

  async loadData(country) {
    const { cases, deaths, recovered } = await fetchHistData(country);
    this.setState({
      chartData: {
        labels: Object.keys(cases),
        datasets: [
          {
            label: "Cases",
            data: Object.values(cases),
            fill: true,
            borderColor: "#C63F3F",
            pointRadius: 0,
          },
          {
            label: "Deaths",
            data: Object.values(deaths),
            fill: true,
            borderColor: "#251616",
            pointRadius: 0,
          },
          {
            label: "Recovered",
            data: Object.values(recovered),
            fill: true,
            borderColor: "#455574",
            pointRadius: 0,
          },
        ],
      },
    });
  }

  handleChange = (event) => this.setState({ country: event.value });

  render() {
    const options = {
      maintainAspectRatio: false, // Don't maintain w/h ratio
    };

    return (
      <div className={"chart"}>
        <Select
          placeholder={"Select Country"}
          value={countryOptions.find((obj) => obj.value === this.state.country)}
          options={countryOptions}
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

export default CountryGraph;
