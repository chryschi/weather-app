import createCleanWeatherData from "./cleanWeatherData";
import clearDisplay from "./clearDisplay";
import displayWeather from "./displayWeather";

const forecastdays = 3;

const getWeatherData = async (location) => {
  clearDisplay();
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6e4aa9685cba4408b05220807242205&q=${location}&days=${forecastdays}`
  );
  const weatherData = await response.json();

  const cleanWeatherData = createCleanWeatherData(weatherData);
  displayWeather(cleanWeatherData);
};

export default getWeatherData;
