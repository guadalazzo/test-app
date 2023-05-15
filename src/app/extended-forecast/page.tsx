import { ForecastData, groupedForecastInd } from "../weather.types";
import { getDayOfTheWeek } from "../utils";
import Header from "../components/header";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const FORECAST_WEATHER =
  BASE_URL +
  `/forecast?lat=59.3349821&lon=18.0600743&appid=${process.env.API_ID}&units=metric`;

export default async function ExtendedForecast() {
  async function getForecast() {
    try {
      const response = await fetch(FORECAST_WEATHER);
      const result = (await response.json()) as ForecastData;
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  const forecastData = await getForecast();

  const groupForecastsByDay = (forecastData?: ForecastData) => {
    const groups: {
      [key: string]: groupedForecastInd;
    } = {};
    forecastData?.list?.forEach((forecast) => {
      const date = getDayOfTheWeek(forecast.dt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(forecast);
    });

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        forecast: groups[date],
      };
    });

    return groupArrays;
  };
  const groupedArray = groupForecastsByDay(forecastData);
  return (
    <main className="flex min-h-screen flex-col items-center p-24 flex-mono">
      <Header />
      <section className=" w-full bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2  md:mx-12 mb-10">
        {groupedArray.map((day) => {
          return (
            <div className="max-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h2 className="font-bold">{day.date}</h2>
              <div className="flex gap-4">
                {day.forecast.map((fore) => {
                  const dat = new Date(fore.dt * 1000);
                  const hs = dat.getHours();
                  return (
                    <div className="">
                      <span className="text-sm">{hs} hs</span>
                      <p className="text-xl">
                        {fore?.main?.temp
                          ? parseInt(fore?.main?.temp?.toString())
                          : fore?.main?.temp?.toString()}
                        °C
                      </p>
                      <p className="text-lg">
                        <span className="text-sm">feels like: </span> <br></br>
                        {fore?.main?.feels_like
                          ? parseInt(fore?.main?.feels_like.toString())
                          : fore?.main?.feels_like.toString()}
                        °C
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
