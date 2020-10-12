import React from "react";
import "./App.scss";
import Select from "react-select";
import { getCountries } from "./api";
class App extends React.Component {
  state = {
    countryOptions: [],
    selectedCountry: "Global",
  };
  async componentDidMount() {
    const countries = await getCountries();
    const options = countries.map((country) => ({
      value: country,
      label: country,
    }));
    options.unshift({ value: "Global", label: "Global" });
    this.setState({ countryOptions: options });
  }
  onCountrySelect = (obj) => {
    this.setState({ selectedCountry: obj.value });
    // console.log(value);
  };
  render() {
    const { countryOptions, selectedCountry } = this.state;
    return (
      <div className="App">
        <div className="app__header">
          <h1 className="covid-heading">covid19-tracker</h1>
          <Select
            value={{ value: selectedCountry, label: selectedCountry }}
            options={countryOptions}
            className="country-options"
            onChange={this.onCountrySelect}
          />
        </div>
        <div className="app__stats">
            
        </div>
      </div>
    );
  }
}

export default App;
