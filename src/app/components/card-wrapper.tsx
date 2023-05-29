import Card from "./card";
import { WeatherData } from "../weather.types";

export const CardWrapper = ({ weatherData }: { weatherData: WeatherData }) => {
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
