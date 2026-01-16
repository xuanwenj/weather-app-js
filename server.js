import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic();

// 穿衣建议 API
app.post("/api/dress-suggestion", async (req, res) => {
  try {
    const { weatherData } = req.body;

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system:
        "You are a helpful assistant that provide dress suggestions based on the weather.",
      messages: [
        {
          role: "user",
          content: `Please make a dress suggestion based on the provided weather data below: 
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
