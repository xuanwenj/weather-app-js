const apiKey = "f2fcbc61efe54e4a89341954260901";

async function getWeatherData(cityName) {
  const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`;
  const alertUrl = `https://api.weatherapi.com/v1/alerts.json?key=${apiKey}&q=${cityName}`;

  try {
    const [current, forecast, alerts] = await Promise.all([
      fetch(currentUrl).then((res) => {
        if (!res.ok) {
          console.error(
            `API response status: ${res.status} - ${res.statusText}`,
          );
          throw new Error("Failed to fetch current weather data");
        }
        return res.json();
      }),
      fetch(forecastUrl).then((res) => {
        if (!res.ok) {
          console.error(
            `API response status: ${res.status} - ${res.statusText}`,
          );
          throw new Error("Failed to fetch forecast data");
        }
        return res.json();
      }),
      fetch(alertUrl).then((res) => {
        if (!res.ok) {
          console.error(
            `API response status: ${res.status} - ${res.statusText}`,
          );
          throw new Error("Failed to fetch alert data");
        }
        return res.json();
      }),
    ]);

    return {
      current: processCurrentData(current),
      forecast: processForecastData(forecast),
      alerts: processAlertData(alerts),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
function processCurrentData(data) {
  console.log(data);
  return {
    city: data.location.name || "Unknown Location",
    temp: data.current.temp_c + "°C",
    humidity: data.current.humidity + "%",
    wind: data.current.wind_kph + "km/h",
    weatherIcon: data.current.condition.icon,
  };
}

function processForecastData(data) {
  return data.forecast.forecastday.map((day) => ({
    date: day.date,
    maxTemp: day.day.maxtemp_c + "°C",
    minTemp: day.day.mintemp_c + "°C",
    hourlyTemp: day.hour.map((h) => ({ time: h.time, temp: h.temp_c })),
  }));
}

function processAlertData(data) {
  if (data.alerts && data.alerts.alert && Array.isArray(data.alerts.alert)) {
    return data.alerts.alert.map((alert) => ({
      headline: alert.headline,
      severity: alert.severity,
    }));
  }
  return [];
}

export { getWeatherData };
