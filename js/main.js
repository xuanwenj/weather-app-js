import { getWeatherData } from "./weatherService.js";
import {
  updateCurrentWeatherUI,
  updateForecastUI,
  updateAlertUI,
} from "./weatherUI.js";

const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

async function handleSearch() {
  const cityName = searchBox.value;
  if (!cityName) return;
  try {
    const weatherData = await getWeatherData(cityName);
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(weatherData) {
  updateCurrentWeatherUI(weatherData.current);
  updateForecastUI(weatherData.forecast);
  updateAlertUI(weatherData.alerts);
}
searchBtn.addEventListener("click", handleSearch);

window.addEventListener("DOMContentLoaded", () => {
  handleSearch("auto:ip");
});
