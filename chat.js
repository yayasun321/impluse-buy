import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("What is your product? Ask me to find a better product. ", async (userInput) => {
    const result = await model.generateContent(userInput);
    console.log(result.response.text());
    rl.close();
  });
}

run();       