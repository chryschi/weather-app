import "./style.css";
import getWeatherData from "./components/getWeatherData";

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let locationInput = document.getElementById("location");
  getWeatherData(locationInput.value);
});
