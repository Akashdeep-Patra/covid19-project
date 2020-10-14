import axios from "axios";
import {Circle,Popup} from "react-leaflet"
import React from "react";
import numeral from "numeral";
export const getCountries = async () => {
  const url = "https://disease.sh/v3/covid-19/countries?sort=cases";
  const { data } = await axios.get(url);
//   const countries = data.map((object) => ({
//     country: object.country,
//     countryInfo: object.countryInfo,
//   }));
  return data;
};
export const getGlobalData = async () => {
  const url = "https://disease.sh/v3/covid-19/all";
  const {
    data: { cases, deaths, recovered },
  } = await axios.get(url);
  return { cases, recovered, deaths };
};

export const getDataByCountry = async (country) => {
  const url = `https://disease.sh/v3/covid-19/countries/${country}?strict=true`;
  const {
    data: { cases, deaths, recovered },
  } = await axios.get(url);
  return { cases, recovered, deaths };
};

export const getCountryData = async () => {
  const url = "https://disease.sh/v3/covid-19/countries?sort=cases";
  const { data } = await axios.get(url);
  const countries = data.map(({ country, cases, deaths, recovered }) => ({
    country,
    deaths,
    cases,
    recovered,
  }));
  return countries;
};

export const getHistoricalData = async () => {
  const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=30";
  const { data } = await axios.get(url);
  const result = {};
  Object.entries(data.cases).forEach((val, index) => {
    result[val[0]] = {};
    result[val[0]]["cases"] = val[1];
    // console.log(val[0], val[1]);
  });
  Object.entries(data["deaths"]).forEach((val, index) => {
    result[val[0]]["deaths"] = val[1];
  });
  Object.entries(data["recovered"]).forEach((val, index) => {
    result[val[0]]["recovered"] = val[1];
  });
  //   console.log(data);

  return result;
};



//this function draws the circles in the map and also the tooltip

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
    key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].rgba}
      fillColor={casesTypeColors[casesType].rgba}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="tooltip">
             <div
             className="tooltip-flag"
             style={{backgroundImage: `url(${country.countryInfo.flag})`}}
             />
        <div
        className="tooltip-country"
        >{country.country}</div>
       <div
       className="tooltip-cases"
       >{`Cases : ${numeral(country["cases"]).format("0,0")}`}</div>
       <div
       className="tooltip-recovered"
       >{`Recovered : ${numeral(country["recovered"]).format("0,0")}`}</div>
       <div
       className="tooltip-deaths"
       >{`Deaths : ${numeral(country["deaths"]).format("0,0")}`}</div>
        </div>
      </Popup>
    </Circle>
  ));

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgba: "rgba(101, 96, 204, 0.7)",
    multiplier: 500,
  },
  recovered: {
    hex: "#7dd71d",
    rgba: "rgba(70, 206, 122, 0.7)",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4443",
    rgba: "rgba(230, 61, 61, 0.7)",
    multiplier: 1500,
  },
};