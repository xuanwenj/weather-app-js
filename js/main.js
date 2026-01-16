import { getWeatherData } from "./weatherService.js";
import {
  updateCurrentWeatherUI,
  updateForecastUI,
  updateAlertUI,
  updateAIResponseUI,
} from "./weatherUI.js";
import { getDressSuggestion } from "./claudeService.js";
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

async function handleSearch() {
  const cityName = searchBox.value;
  if (!cityName) return;
  try {
    const weatherData = await getWeatherData(cityName);
    displayWeather(weatherData);
    const dressSuggestion = await getDressSuggestion(weatherData);
    displayAISuggestion(dressSuggestion);
    console.log("Dress Suggestion:", dressSuggestion);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(weatherData) {
  updateCurrentWeatherUI(weatherData.current);
  updateForecastUI(weatherData.forecast);
  updateAlertUI(weatherData.alerts);
}
function displayAISuggestion(suggestion) {
  updateAIResponseUI(suggestion);
}
searchBtn.addEventListener("click", handleSearch);

window.addEventListener("DOMContentLoaded", () => {
  handleSearch("auto:ip");
});
