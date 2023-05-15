"use client";
import React, { useState } from "react";
import Card from "./components/card";
import Select from "./components/select";
import { CountryData } from "./country.types";
import { WeatherData } from "./weather.types";
import { MyContextProvider } from "./MyContextProvider";

const CardWrapper = ({ weatherData }: { weatherData: WeatherData }) => {
  return (
    <Card
      cityName={weatherData?.name}
      temp={weatherData?.main?.temp}
      feelsLike={weatherData?.main?.feels_like}
      min={weatherData?.main?.temp_min}
      max={weatherData?.main?.temp_max}
      humidity={weatherData?.main?.humidity}
      weatherIcon={weatherData?.weather[0]?.icon}
    />
  );
};
function CurrentForecast({
  countryData,
  weatherData,
  appId,
}: {
  countryData: CountryData[];
  weatherData: WeatherData;
  appId: string;
}) {
  const [weatherDataAux, setWeatherDataAux] = useState(weatherData);
  const handleChange = async (country: CountryData) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.long}&appid=${appId}&units=metric`
      );
      const result = (await response.json()) as WeatherData;
      setWeatherDataAux(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MyContextProvider>
      <CardWrapper weatherData={weatherDataAux} />
      <Select countries={countryData} onChange={handleChange} />
    </MyContextProvider>
  );
}

export default CurrentForecast;
