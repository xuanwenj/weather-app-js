const apiKey = "f2fcbc61efe54e4a89341954260901";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeatherData(cityName) {
  const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`;
  const alertUrl = `https://api.weatherapi.com/v1/alerts.json?key=${apiKey}&q=${cityName}`;

  try {
    const [current, forecast, alerts] = await Promise.all([
      fetch(currentUrl).then((res) => res.json()),
      fetch(forecastUrl).then((res) => res.json()),
      fetch(alertUrl).then((res) => res.json()),
    ]);
    console.log(forecast);

    return { current, forecast, alerts };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

function processCurrentData(data) {
  return {
    city: data.location.name || "Unknown Location",
    temp: data.current.temp_c + "°C",
    humidity: data.current.humidity + "%",
    wind: data.current.wind_kph + " km/h",
    weatherIcon: data.current.condition.icon,
  };
}

function processForecastData(data) {
  return data.forecast.forecastday.map((day) => ({
    date: day.date,
    maxTemp: day.day.maxtemp_c + "°C",
    minTemp: day.day.mintemp_c + "°C",
  }));
}

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
  // thirdDay.innerHTML = `Three days from now: ${forecastData[2].date} - Max: ${forecastData[2].maxTemp}`;
}

async function displayWeather(cityName) {
  try {
    const weatherData = await getWeatherData(cityName);
    const processedData = processCurrentData(weatherData.current);
    updateCurrentWeatherUI(processedData);
    const processedForecast = processForecastData(weatherData.forecast);
    updateForecastUI(processedForecast);
  } catch (error) {
    console.error("Error displaying weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  displayWeather(searchBox.value);
});
