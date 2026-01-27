import Chart from "chart.js/auto";
import { getWeatherData } from "./weatherService";

(async function (city) {
  const data = await getWeatherData("New York");

  new Chart(document.getElementById("linegraph"), {
    type: "line",
    options: {
      animation: false,
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
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Line Graph Data",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
})();
