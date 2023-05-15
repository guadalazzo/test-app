"use client";
import React, { useContext, useEffect } from "react";

function Card({
  cityName = "",
  temp = 0,
  feelsLike = 0,
  min = 0,
  max = 0,
  humidity = 0,
  weatherIcon = "",
}: {
  cityName?: string;
  temp?: number;
  feelsLike?: number;
  min?: number;
  max?: number;
  humidity?: number;
  weatherIcon?: string;
}) {
  const formatTemp = (temp: number) => {
    return parseInt(temp.toString()) + " °C";
  };

  return (
    <div className="w-full max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
      <h2 className="font-bold">TODAY</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt="weather"
      />
      <p className="text-lg">{cityName}</p>
      <p className="text-xl">{formatTemp(temp)}</p>
      <span className="text-sm">Min: {formatTemp(min)} </span>
      <span className="text-sm">Max: {formatTemp(max)}</span>

      <p className="text-lg">
        <span className="text-sm">feels like: </span> <br></br>
        {formatTemp(feelsLike)}
      </p>
      <p>
        <span className="text-sm">Humidity</span> {humidity.toString()}%
      </p>
    </div>
  );
}

export default Card;
