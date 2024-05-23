import "./style.css";

console.log("Welcome");

let location = "";
location = "london";

const forecastdays = 3;

const createCleanWeatherData = (weatherObject) => {
  const location = weatherObject.location.name;
  const region = weatherObject.location.region;
  const country = weatherObject.location.country;
  const currentTempCelsius = weatherObject.current.temp_c;
  const currentTempFahrenheit = weatherObject.current.temp_f;
  const feelsLikeCelsius = weatherObject.current.feelslike_c;
  const feelsLikeFahrenheit = weatherObject.current.feelslike_f;
  const humidity = weatherObject.current.humidity;

  let forecastdayArray = [];
  for (let i = 0; i < forecastdays; i++) {
    const forecastDay = weatherObject.forecast.forecastday[i];
    const date = forecastDay.date;
    const minTempCelsius = forecastDay.day.mintemp_c;
    const maxTempCelsius = forecastDay.day.maxtemp_c;
    const minTempFahrenheit = forecastDay.day.mintemp_f;
    const maxTempFahrenheit = forecastDay.day.maxtemp_f;
    const conditionCode = forecastDay.day.condition.code;
    const conditionText = forecastDay.day.condition.text;
    const conditionIcon = forecastDay.day.condition.icon;
    const forecastDayObject = {
      date,
      minTempCelsius,
      maxTempCelsius,
      minTempFahrenheit,
      maxTempFahrenheit,
      conditionCode,
      conditionText,
      conditionIcon,
    };
    forecastdayArray.push(forecastDayObject);
  }

  return {
    location,
    region,
    country,
    currentTempCelsius,
    currentTempFahrenheit,
    feelsLikeCelsius,
    feelsLikeFahrenheit,
    humidity,
    forecastdayArray,
  };
};

const getWeatherData = async (location) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6e4aa9685cba4408b05220807242205&q=${location}&days=${forecastdays}`
  );
  const weatherData = await response.json();
  console.log("Location:");
  console.log(`${weatherData.location.name} (${weatherData.location.country})`);
  console.log("Temperature (°C):");
  console.log(weatherData.current.temp_c);
  console.log("Location:");
  console.log(`${weatherData.location.name} (${weatherData.location.country})`);
  console.log("Avg. Temperature today (°C):");
  console.log(weatherData.forecast.forecastday[0].day.avgtemp_c);
  console.log("Avg. Temperature tomorrow (°C):");
  console.log(weatherData.forecast.forecastday[1].day.avgtemp_c);
  console.log("Avg. Temperature day after tomorrow (°C):");
  console.log(weatherData.forecast.forecastday[2].day.avgtemp_c);
  console.log(weatherData);
  console.log(weatherData.forecast.forecastday[0].date);

  const cleanWeatherData = createCleanWeatherData(weatherData);
  console.log("Cleaned up data:");
  console.log(cleanWeatherData);
};

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let locationInput = document.getElementById("location");
  getWeatherData(locationInput.value);
});
