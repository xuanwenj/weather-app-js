const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const weatherIcon = document.getElementById("weatherIcon");
const alertText = document.getElementById("alertText");

const aiResponse = document.getElementById("aiForecast");

function updateCurrentWeatherUI(currentData) {
  city.innerText = currentData.city;
  temp.innerText = currentData.temp;
  humidity.innerText = currentData.humidity;
  wind.innerText = currentData.wind;
  weatherIcon.src = currentData.weatherIcon;
}

function updateForecastUI(forecastData) {
  const firstDay = document.getElementById("firstday");
  const secondDay = document.getElementById("secondday");
  const thirdDay = document.getElementById("thirdday");

  firstDay.innerHTML = `${forecastData[0].date}: ${forecastData[0].maxTemp} / ${forecastData[0].minTemp}`;
  secondDay.innerHTML = `${forecastData[1].date}: ${forecastData[1].maxTemp} / ${forecastData[1].minTemp}`;
  thirdDay.innerHTML = `${forecastData[2].date}: ${forecastData[2].maxTemp} / ${forecastData[2].minTemp}`;
}

function updateAlertUI(alertData) {
  if (alertText) {
    if (alertData.length > 0) {
      alertText.innerText = `Alert: ${alertData[0].headline} - ${alertData[0].severity}`;
    } else {
      alertText.innerText = "No weather alerts.";
    }
  }
}

function updateAIResponseUI(responseText) {
  if (aiResponse) {
    aiResponse.innerText = responseText;
  }
}
export {
  updateCurrentWeatherUI,
  updateForecastUI,
  updateAlertUI,
  updateAIResponseUI,
};
