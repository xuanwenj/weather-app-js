import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic();

app.post("/api/dress-suggestion", async (req, res) => {
  try {
    const { weatherData } = req.body;

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: `
You are a helpful assistant that gives clothing suggestions based on weather.

Formatting rules:
- You may describe clothing layers or categories if helpful.
- You must express all layers only within normal continuous sentences.
- Do not place layer names or categories on separate lines.
- Do not use headings, lists, bullet points, dashes, asterisks, or any markdown.
- Write the entire answer as natural paragraphs only.
`,
      messages: [
        {
          role: "user",
          content: `Please make a dress suggestion based on the provided weather data below.
                    Please do not repeat the weather data in your response.
temperature: ${weatherData.current.temp}, 
humidity: ${weatherData.current.humidity},
wind: ${weatherData.current.wind}.`,
        },
      ],
    });

    res.json({ suggestion: msg.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
