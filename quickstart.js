import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic();

async function main() {
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: "请用一句话介绍一下你自己。",
      },
    ],
  });

  console.log(msg.content[0].text);
}

main().catch(console.error);
