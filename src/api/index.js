import axios from "axios";
export const getCountries = async () => {
  const url = "https://disease.sh/v3/covid-19/countries";
  const { data } = await axios.get(url);
  const countries = data.map((object) => object.country);
  return countries;
};



