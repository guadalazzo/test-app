"use client";
import React, { useState, useCallback } from "react";
import Select from "../components/select";
import { CountryData } from "../country.types";
import {
  ForecastData,
  groupedForecastInd,
  forecastGroupArray,
} from "../weather.types";
import { MyContextProvider } from "../MyContextProvider";
import { getDayOfTheWeek } from "../utils";

const MainContent = ({
  forecastData,
}: {
  forecastData: forecastGroupArray;
}) => (
  <section className=" w-full bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2  md:mx-12 mb-10">
    {forecastData.map((day) => {
      return (
        <div
          key={day.date}
          className="max-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 className="font-bold">{day.date}</h2>
          <div className="flex gap-4">
            {day.forecast.map((fore) => {
              const dat = new Date(fore.dt * 1000);
              const hs = dat.getHours();
              return (
                <div key={fore.dt} className="">
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
);
function ExtendedForecastContent({
  countryData,
  forecastData,
  appId,
}: {
  countryData: CountryData[];
  forecastData: ForecastData;
  appId: string;
}) {
  const [forecastAux, setForecastAux] = useState(forecastData);

  const handleChange = useCallback(async (country: CountryData) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${country.lat}&lon=${country.long}&appid=${appId}&units=metric`
      );
      const result = (await response.json()) as ForecastData;
      setForecastAux(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }, []);

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
  const groupedArray = groupForecastsByDay(forecastAux);

  return (
    <MyContextProvider>
      <Select countries={countryData} onChange={handleChange} />
      <MainContent forecastData={groupedArray} />
    </MyContextProvider>
  );
}

export default ExtendedForecastContent;
