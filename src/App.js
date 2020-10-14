import React from "react";
import "./App.scss";
import Select from "react-select";
import LineGraph from "./components/line-graph/LineGraph";
import { CircularProgress } from "@material-ui/core";
import {
//   getCountryData,
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
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 1.5,
  };
  async componentDidMount() {
    const countries = await getCountries();
    // const countryObjects = await getCountryData();
    const options = countries.map((country) => ({
      value: country.country,
      label: country.country,
      lat: country.countryInfo.lat,
      lng: country.countryInfo.long,
    }));
    options.unshift({ value: "Global", label: "Global" });
    const { deaths, cases, recovered } = await getGlobalData();
    // console.log(deaths);

    this.setState({
      countryObjects:countries,
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
    const mapZoom = selectedCountry === "Global" ? 1.5 : 4;
    const mapCenter = { lat: obj.lat, lng: obj.lng };

    this.setState({
      selectedCountry,
      deaths,
      cases,
      recovered,
      mapCenter,
      mapZoom,
    });
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
      mapCenter,
      mapZoom,
    } = this.state;
    if (countryOptions.length === 0) {
      return (
        <div className="spinner">
          <CircularProgress disableShrink color="inherit" size={100} />
        </div>
      );
    }
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
          <Map countries={countryObjects} center={mapCenter} zoom={mapZoom} />
        </div>
        <div className="App__right">
          <Card>
            <CardContent>
              <h3 className="live-heading">Live cases by country</h3>
              <Table objects={countryObjects} />
              <h3 className="live-heading">Historical stats</h3>
              <div className="chart-app-wrapper">
                <LineGraph />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
