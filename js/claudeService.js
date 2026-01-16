// 调用后端 API 获取穿衣建议
async function getDressSuggestion(weatherData) {
  const response = await fetch("http://localhost:3001/api/dress-suggestion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weatherData }),
  });

  if (!response.ok) {
    throw new Error("Failed to get dress suggestion");
  }

  const data = await response.json();
  return data.suggestion;
}

export { getDressSuggestion };
