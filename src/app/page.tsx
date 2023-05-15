import { WeatherData } from "./weather.types";
import { ApiResponse } from "./country.types";
import CurrentForecast from "./current-forecast";
import Header from "./components/header";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const CURRENT_WEATHER =
  BASE_URL +
  `/weather?lat=59.3349821&lon=18.0600743&appid=${process.env.API_ID}&units=metric`;

const COUNTRIES = "https://countriesnow.space/api/v0.1/countries/positions";

export default async function Home() {
  async function getData() {
    try {
      const response = await fetch(CURRENT_WEATHER);
      const result = (await response.json()) as WeatherData;
      return result;
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

  const weatherData = await getData();
  const countryData = await getCountries();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 flex-mono">
      <Header />
      {weatherData && countryData && process?.env?.API_ID ? (
        <CurrentForecast
          weatherData={weatherData}
          countryData={countryData}
          appId={process?.env?.API_ID}
        />
      ) : null}
    </main>
  );
}
