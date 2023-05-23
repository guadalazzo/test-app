import { ForecastData } from "../weather.types";
import { ApiResponse } from "../country.types";
import Header from "../components/header";
import ExtendedForecastContent from "./extended-forecast";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const FORECAST_WEATHER =
  BASE_URL +
  `/forecast?lat=59.3349821&lon=18.0600743&appid=${process?.env?.API_ID}&units=metric`;
const COUNTRIES = "https://countriesnow.space/api/v0.1/countries/positions";

export default async function ExtendedForecast() {
  async function getForecast() {
    try {
      if (process?.env?.API_ID) {
        const response = await fetch(FORECAST_WEATHER);
        const result = (await response.json()) as ForecastData;
        if (result.cod !== "200") {
          throw new Error("not fetch");
        }
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getCountries() {
    try {
      const response = await fetch(COUNTRIES);
      const result = (await response.json()) as ApiResponse;
      return result?.data;
    } catch (error) {
      console.error(error);
    }
  }
  const forecastData = getForecast();
  const countryData = getCountries();
  const [forecast, country] = await Promise.all([forecastData, countryData]);
  return (
    <main className="flex min-h-screen flex-col items-center flex-mono">
      <Header />
      {forecast && country && process?.env?.API_ID ? (
        <ExtendedForecastContent
          forecastData={forecast}
          countryData={country}
          appId={process?.env?.API_ID}
        />
      ) : null}
    </main>
  );
}
