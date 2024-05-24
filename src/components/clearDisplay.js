const clearDisplay = () => {
  const currentWeather = document.getElementsByTagName("div");
  for (let i = 0; i < currentWeather.length; i++) {
    currentWeather[i].innerHTML = "";
  }
};

export default clearDisplay;
