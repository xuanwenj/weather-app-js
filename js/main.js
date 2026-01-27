import { getWeatherData } from "./weatherService.js";
import {
  updateCurrentWeatherUI,
  updateForecastUI,
  updateAlertUI,
  updateAIResponseUI,
  updateLineGraphUI,
} from "./weatherUI.js";
import { getDressSuggestion } from "./claudeService.js";
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

async function handleSearch(city) {
  const cityName = city || searchBox.value;
  if (!cityName) return;
  try {
    const weatherData = await getWeatherData(cityName);
    displayWeather(weatherData);
    //const dressSuggestion = await getDressSuggestion(weatherData);
    //displayAISuggestion(dressSuggestion);
    //console.log("Dress Suggestion:", dressSuggestion);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(weatherData) {
  console.log("Forecast structure:", weatherData.forecast);
  updateCurrentWeatherUI(weatherData.current);
  updateForecastUI(weatherData.forecast);
  updateAlertUI(weatherData.alerts);
  updateLineGraphUI(weatherData.forecast);
}
function displayAISuggestion(suggestion) {
  updateAIResponseUI(suggestion);
}
searchBtn.addEventListener("click", () => handleSearch());

// window.addEventListener("DOMContentLoaded", () => {
//   handleSearch("auto:ip");
// });
