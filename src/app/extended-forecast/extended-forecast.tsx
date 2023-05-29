// REACT CLIENT COMPONENT
"use client"; // this is required as i'm using useState and context provider
import React, { useState, useCallback } from "react";
import Select from "../components/select";
import { MainContent } from "../components/main-content";
import { CountryData } from "../country.types";
import { ForecastData, groupedForecastInd } from "../weather.types";
import { MyContextProvider } from "../MyContextProvider";
import { getDayOfTheWeek } from "../utils";

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

  /* On country selector change will get new data for the extended forecast on that country.*/
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
