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
  clearDisplay();
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

  displayWeather(cleanWeatherData);
};

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let locationInput = document.getElementById("location");
  getWeatherData(locationInput.value);
});

const displayWeather = (weatherData) => {
  const currentLocation = document.querySelector(".currentLocation");
  const location = document.createElement("p");
  location.textContent = weatherData.location;
  const country = document.createElement("p");
  country.textContent = weatherData.country;
  currentLocation.appendChild(location);
  currentLocation.appendChild(country);

  const currentIcon = document.querySelector(".currentIcon");
  const icon = document.createElement("p");
  icon.textContent = "icon";
  const conditionText = document.createElement("p");
  conditionText.textContent = weatherData.conditionText;
  currentIcon.appendChild(icon);
  currentIcon.appendChild(conditionText);

  const currentTemp = document.querySelector(".currentTemp");
  const temp = document.createElement("p");
  temp.textContent = `${weatherData.currentTempCelsius}°C`;
  const feelTemp = document.createElement("p");
  feelTemp.textContent = `feels like ${weatherData.feelsLikeCelsius}°C`;
  currentTemp.appendChild(temp);
  currentTemp.appendChild(feelTemp);

  const forecastSection = document.getElementById("forecast");
  for (let i = 0; i < forecastdays; i++) {
    const dayElement = forecastSection.children[i];
    const dayText = document.createElement("p");
    dayText.textContent = weatherData.forecastdayArray[i].date;
    const iconDayOne = document.createElement("p");
    iconDayOne.textContent = "icon";
    const maxMinTemps = document.createElement("p");
    maxMinTemps.textContent = `${weatherData.forecastdayArray[i].maxTempCelsius}°C/${weatherData.forecastdayArray[i].minTempCelsius}°C`;
    const conditionDayOne = document.createElement("p");
    conditionDayOne.textContent = weatherData.forecastdayArray[i].conditionText;
    dayElement.appendChild(dayText);
    dayElement.appendChild(iconDayOne);
    dayElement.appendChild(maxMinTemps);
    dayElement.appendChild(conditionDayOne);
  }
};

const clearDisplay = () => {
  const currentWeather = document.getElementsByTagName("div");
  for (let i = 0; i < currentWeather.length; i++) {
    currentWeather[i].innerHTML = "";
  }
};
