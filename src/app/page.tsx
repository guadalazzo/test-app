import { WeatherData } from "./weather.types";
import { ApiResponse } from "./country.types";
import CurrentForecast from "./current-forecast";
import Header from "./components/header";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const CURRENT_WEATHER =
  BASE_URL +
  `/weather?lat=59.3349821&lon=18.0600743&appid=${process?.env?.API_ID}&units=metric`;

const COUNTRIES = "https://countriesnow.space/api/v0.1/countries/positions";

export default async function Home() {
  async function getData() {
    try {
      if (process?.env?.API_ID) {
        const response = await fetch(CURRENT_WEATHER);
        const result = (await response.json()) as WeatherData;

        if (result.cod !== 200) {
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

  const weatherData = getData();
  const countryData = getCountries();
  const [weather, country] = await Promise.all([weatherData, countryData]);

  return (
    <main className="flex min-h-screen flex-col items-center flex-mono">
      <Header />
      {weather && country && process?.env?.API_ID ? (
        <CurrentForecast
          weatherData={weather}
          countryData={country}
          appId={process?.env?.API_ID}
        />
      ) : null}
    </main>
  );
}
