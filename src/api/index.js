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
