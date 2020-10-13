import axios from "axios";
export const getCountries = async () => {
  const url = "https://disease.sh/v3/covid-19/countries";
  const { data } = await axios.get(url);
  const countries = data.map((object) => object.country);
  return countries;
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
