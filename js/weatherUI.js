import Chart from "chart.js/auto";
import { getElementById } from "./helper/elementCheck.js";

let lineChart = null;

let city, temp, humidity, wind, weatherIcon, alertText, aiResponse, dayTemp;

try {
  city = getElementById("city");
  temp = getElementById("temp");
  humidity = getElementById("humidity");
  wind = getElementById("wind");

  weatherIcon = getElementById("weatherIcon");
  alertText = getElementById("alertText");
  aiResponse = getElementById("aiForecast");
  dayTemp = getElementById("dayTempText");
} catch (error) {
  console.error("Failed to initialize UI elements:", error);
  alert("UI initialization failed: " + error.message);
}

function updateCurrentWeatherUI(currentData) {
  try {
    if (!city || !temp || !humidity || !wind || !weatherIcon || !dayTemp) {
      showErrorMessage("Unable to display weather: UI elements missing");
      return;
    }
    city.innerText = currentData.city;
    temp.innerText = currentData.temp;
    humidity.innerText = currentData.humidity;
    wind.innerText = currentData.wind;
    weatherIcon.src = currentData.weatherIcon;
  } catch (error) {
    console.error("Error updating current weather UI:", error);
  }
}

function updateForecastUI(forecastData) {
  try {
    const firstDay = getElementById("firstday");
    const secondDay = getElementById("secondday");
    const thirdDay = getElementById("thirdday");

    if (!firstDay || !secondDay || !thirdDay) {
      showErrorMessage("Unable to display forecast: UI elements missing");
      return;
    }

    firstDay.innerHTML = `${forecastData[0].date}: ${forecastData[0].maxTemp} / ${forecastData[0].minTemp}`;
    secondDay.innerHTML = `${forecastData[1].date}: ${forecastData[1].maxTemp} / ${forecastData[1].minTemp}`;
    thirdDay.innerHTML = `${forecastData[2].date}: ${forecastData[2].maxTemp} / ${forecastData[2].minTemp}`;
  } catch (error) {
    console.error("Error updating forecast UI:", error);
  }
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

function updateLineGraphUI(forecastData) {
  try {
    if (lineChart) {
      lineChart.destroy();
    }

    const linegraphElement = document.getElementById("linegraph");
    if (!linegraphElement) {
      showErrorMessage("Unable to display graph: UI element missing");
      return;
    }

    lineChart = new Chart(linegraphElement, {
      type: "line",
      options: {
        animation: false,
        scales: {
          y: {
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
          x: {
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
      data: {
        labels: forecastData[0].hourlyTemp.map((temp) => temp.time),
        datasets: [
          {
            label: "Line Graph Data",
            data: forecastData[0].hourlyTemp.map((temp) => temp.temp),
            backgroundColor: "rgba(0, 254, 186, 0.2)",
            borderColor: "rgba(0, 254, 186, 0.2)",
            pointBackgroundColor: "rgba(0, 254, 186, 1)",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error updating line graph:", error);
    displayDayTempText(forecastData);
  }
}

function displayDayTempText(forecastData) {
  if (!dayTemp) return;
  dayTemp.innerHTML = "";
  const hourlyData = forecastData[0].hourlyTemp
    .map((h) => `${h.time}: ${h.temp}°C`)
    .join(" | ");
  dayTemp.innerHTML = `<strong>Hourly Forecast:</strong><br>${hourlyData}`;
  dayTemp.style.display = "block";
}

function showLoadingAI() {
  const loadingEl = getElementById("loading");
  if (loadingEl) {
    loadingEl.style.display = "flex";
  }
}

function hideLoadingAI() {
  const loadingEl = getElementById("loading");
  if (loadingEl) {
    loadingEl.style.display = "none";
  }
}

function showErrorMessage(message) {
  const alertEl = getElementById("alertText");
  if (alertEl) {
    alertEl.innerText = `Error: ${message}`;
  }
}

export {
  updateCurrentWeatherUI,
  updateForecastUI,
  updateAlertUI,
  updateAIResponseUI,
  updateLineGraphUI,
  showLoadingAI,
  hideLoadingAI,
  showErrorMessage,
};
