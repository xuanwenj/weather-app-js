import { getWeatherData } from "./weatherService.js";
import {
  updateCurrentWeatherUI,
  updateForecastUI,
  updateAlertUI,
  updateAIResponseUI,
  updateLineGraphUI,
  showLoadingAI,
  hideLoadingAI,
  showErrorMessage,
} from "./weatherUI.js";
import { getDressSuggestion } from "./claudeService.js";

const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", handleSearchClick);
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearchClick();
  }
});

function handleSearchClick() {
  const cityName = searchBox.value.trim();
  if (!cityName) {
    showErrorMessage("Please enter a city name");
    return;
  }
  handleSearch(cityName);
}

async function handleSearch(cityName) {
  try {
    const weatherData = await getWeatherData(cityName);

    updateWeatherDisplay(weatherData);

    fetchAndDisplayAISuggestion(weatherData);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function updateWeatherDisplay(weatherData) {
  updateCurrentWeatherUI(weatherData.current);
  updateForecastUI(weatherData.forecast);
  updateAlertUI(weatherData.alerts);
  updateLineGraphUI(weatherData.forecast);
}

async function fetchAndDisplayAISuggestion(weatherData) {
  showLoadingAI();
  try {
    const dressSuggestion = await getDressSuggestion(weatherData);
    updateAIResponseUI(dressSuggestion);
  } catch (error) {
    showErrorMessage("Failed to get AI suggestion");
  } finally {
    hideLoadingAI();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  handleSearch("auto:ip");
});
