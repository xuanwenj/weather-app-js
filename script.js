const apiKey = "f2fcbc61efe54e4a89341954260901";
const apiUrl =
  "https://api.weatherapi.com/v1/current.json?key=f2fcbc61efe54e4a89341954260901&q=";
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");
async function fetchWeather(cityName) {
  try {
    const response = await fetch(apiUrl + cityName);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    city.innerText = data.location.name || "Unknown Location";
    temp.innerText = data.current.temp_c + "°C";
    humidity.innerText = data.current.humidity + "%";
    wind.innerText = data.current.wind_kph + " km/h";
    weatherIcon.src = data.current.condition.icon;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
searchBtn.addEventListener("click", () => {
  fetchWeather(searchBox.value);
});
