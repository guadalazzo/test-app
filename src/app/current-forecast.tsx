// REACT CLIENT COMPONENT
"use client"; // this is required as i'm using useState and context provider

import React, { useState, useCallback } from "react";
import Select from "./components/select";
import { CardWrapper } from "./components/card-wrapper";
import { CountryData } from "./country.types";
import { WeatherData } from "./weather.types";
import { MyContextProvider } from "./MyContextProvider";

function CurrentForecast({
  countryData,
  weatherData,
  appId,
}: {
  countryData: CountryData[];
  weatherData: WeatherData;
  appId: string;
}) {
  // Will set initial data as default.
  const [weatherDataAux, setWeatherDataAux] = useState(weatherData);

  /* On country selector change will get new data for the current weather on that country.*/
  const handleChange = useCallback(
    async (country: CountryData) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.long}&appid=${appId}&units=metric`
        );
        const result = (await response.json()) as WeatherData;
        setWeatherDataAux(result);
        if (result.cod !== 200) {
          throw new Error("not fetch");
        }
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    [appId]
  );

  return (
    <MyContextProvider>
      <Select countries={countryData} onChange={handleChange} />
      <CardWrapper weatherData={weatherDataAux} />
    </MyContextProvider>
  );
}

export default CurrentForecast;
