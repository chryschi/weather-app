const forecastdays = 3;

const displayWeather = (weatherData) => {
  const location = document.querySelector(".location");
  location.textContent = weatherData.location;

  const icon = document.querySelector(".currentIcon");
  const img = document.createElement("img");
  img.src = "https:" + weatherData.currentConditionIconUrl;
  icon.appendChild(img);

  const temp = document.querySelector(".currentTemp");
  temp.textContent = `${weatherData.currentTempCelsius}°C`;

  const forecastSection = document.getElementById("forecast");
  for (let i = 0; i < forecastdays; i++) {
    const dayElement = forecastSection.children[i];
    const dayText = document.createElement("p");
    dayText.classList.add("day");
    dayText.textContent = weatherData.forecastdayArray[i].day;
    const iconDayOne = document.createElement("p");
    const imgForecast = document.createElement("img");
    imgForecast.src =
      "https:" + weatherData.forecastdayArray[i].conditionIconUrl;
    iconDayOne.appendChild(imgForecast);

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

export default displayWeather;
