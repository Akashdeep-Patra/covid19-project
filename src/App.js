import React from "react";
import "./App.scss";
import Select from "react-select";
import LineGraph from "./components/line-graph/LineGraph";
import {
  getCountryData,
  getCountries,
  getGlobalData,
  getDataByCountry,
} from "./api";
import StatGrid from "./components/stat-grid/StatGrid";
import { Card, CardContent } from "@material-ui/core";
import Map from "./components/map/map";
import Table from "./components/table/Table";
class App extends React.Component {
  state = {
    countryOptions: [],
    selectedCountry: "Global",
    cases: 0,
    deaths: 0,
    recovered: 0,
    countryObjects: [],
  };
  async componentDidMount() {
    const countries = await getCountries();
    const countryObjects = await getCountryData();
    const options = countries.map((country) => ({
      value: country,
      label: country,
    }));
    options.unshift({ value: "Global", label: "Global" });
    const { deaths, cases, recovered } = await getGlobalData();
    // console.log(deaths);

    this.setState({
      countryObjects,
      countryOptions: options,
      deaths,
      cases,
      recovered,
    });
  }
  onCountrySelect = async (obj) => {
    const selectedCountry = obj.value;
    const { deaths, cases, recovered } =
      selectedCountry === "Global"
        ? await getGlobalData()
        : await getDataByCountry(selectedCountry);

    this.setState({ selectedCountry, deaths, cases, recovered });
    // console.log(value);
  };
  render() {
    const {
      countryOptions,
      deaths,
      cases,
      recovered,
      selectedCountry,
      countryObjects,
    } = this.state;
    return (
      <div className="App">
        <div className="App__left">
          <div className="App__header">
            <h1 className="covid-heading">covid19-tracker</h1>
            <Select
              value={{ value: selectedCountry, label: selectedCountry }}
              options={countryOptions}
              className="country-options"
              onChange={this.onCountrySelect}
            />
          </div>
          <div className="App__stats">
            <StatGrid deaths={deaths} recovered={recovered} cases={cases} />
          </div>
          <Map />
        </div>
        <div className="App__right">
          <Card>
            <CardContent>
              <h3 className="live-heading">Live cases by country</h3>
              <Table objects={countryObjects} />
              <h3 className="live-heading">Historical stats</h3>
              <LineGraph />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
