import "./style.css";

console.log("Welcome");

let location = "";
location = "london";

const forecastdays = 3;

const getCurrentWeather = async (location) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=6e4aa9685cba4408b05220807242205&q=${location}`
  );
  const currentWeatherData = await response.json();
  console.log("Location:");
  console.log(
    `${currentWeatherData.location.name} (${currentWeatherData.location.country})`
  );
  console.log("Temperature (°C):");
  console.log(currentWeatherData.current.temp_c);
};

const getForecast = async (location) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6e4aa9685cba4408b05220807242205&q=${location}&days=${forecastdays}`
  );
  const forecastData = await response.json();
  console.log("Location:");
  console.log(
    `${forecastData.location.name} (${forecastData.location.country})`
  );
  console.log("Avg. Temperature today (°C):");
  console.log(forecastData.forecast.forecastday[0].day.avgtemp_c);
  console.log("Avg. Temperature tomorrow (°C):");
  console.log(forecastData.forecast.forecastday[1].day.avgtemp_c);
  console.log("Avg. Temperature day after tomorrow (°C):");
  console.log(forecastData.forecast.forecastday[2].day.avgtemp_c);
};

getCurrentWeather(location);
getForecast(location);
