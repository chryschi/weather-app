const forecastdays = 3;

const createCleanWeatherData = (weatherObject) => {
  const location = weatherObject.location.name;
  const region = weatherObject.location.region;
  const country = weatherObject.location.country;
  const currentTempCelsius = Math.round(weatherObject.current.temp_c);
  const currentTempFahrenheit = Math.round(weatherObject.current.temp_f);
  const currentConditionText = weatherObject.current.condition.text;
  const currentConditionIconUrl = weatherObject.current.condition.icon;
  const feelsLikeCelsius = Math.round(weatherObject.current.feelslike_c);
  const feelsLikeFahrenheit = Math.round(weatherObject.current.feelslike_f);
  const humidity = weatherObject.current.humidity;

  let forecastdayArray = [];
  for (let i = 0; i < forecastdays; i++) {
    const forecastDay = weatherObject.forecast.forecastday[i];
    let day;
    if (i == 0) {
      day = "Today";
    } else {
      const date = new Date(forecastDay.date);
      day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
    }

    const minTempCelsius = Math.round(forecastDay.day.mintemp_c);
    const maxTempCelsius = Math.round(forecastDay.day.maxtemp_c);
    const minTempFahrenheit = Math.round(forecastDay.day.mintemp_f);
    const maxTempFahrenheit = Math.round(forecastDay.day.maxtemp_f);
    const conditionCode = forecastDay.day.condition.code;
    const conditionText = forecastDay.day.condition.text;
    const conditionIconUrl = forecastDay.day.condition.icon;
    const forecastDayObject = {
      day,
      minTempCelsius,
      maxTempCelsius,
      minTempFahrenheit,
      maxTempFahrenheit,
      conditionCode,
      conditionText,
      conditionIconUrl,
    };
    forecastdayArray.push(forecastDayObject);
  }

  return {
    location,
    region,
    country,
    currentTempCelsius,
    currentTempFahrenheit,
    currentConditionText,
    currentConditionIconUrl,
    feelsLikeCelsius,
    feelsLikeFahrenheit,
    humidity,
    forecastdayArray,
  };
};

export default createCleanWeatherData;
