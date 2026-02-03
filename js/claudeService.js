import { fetchWithTimeout } from "./helper/fetchWithTimeout.js";
async function getDressSuggestion(weatherData) {
  try {
    const response = await fetchWithTimeout(
      "http://localhost:3001/api/dress-suggestion",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weatherData }),
        timeout: 10000,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get dress suggestion");
    }

    const data = await response.json();
    if (!data || !data.suggestion) {
      throw new Error("Invalid dress suggestion");
    }
    return data.suggestion;
  } catch (error) {
    console.error("Error fetching dress suggestion:", error);
    throw error;
  }
}

export { getDressSuggestion };
