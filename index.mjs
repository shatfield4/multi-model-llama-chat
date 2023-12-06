import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import readline from "readline";
import fs from "fs/promises";
import inquirer from "inquirer";
import { ChatLlamaCpp } from "langchain/chat_models/llama_cpp";

// Ensure no-metal binding is installed if on MacOS Intel: npx --no node-llama-cpp download --no-metal
const cpus = os.cpus();
if (cpus.some((cpu) => cpu.model.includes("Apple"))) {
  console.log("Is Apple Silicon.");
  process.env.NODE_LLAMA_CPP_METAL = true;
} else {
  process.env.NODE_LLAMA_CPP_METAL = false;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const modelsDir = path.join(__dirname, "models");
  const files = await fs.readdir(modelsDir);
  const ggufFiles = files.filter((file) => file.endsWith(".gguf"));

  const { selectedModel } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedModel",
      message: "Select a model to load:",
      choices: ggufFiles,
    },
  ]);

  const model = new ChatLlamaCpp({
    modelPath: path.join(modelsDir, selectedModel),
    temperature: 0.7,
  });

  console.clear();
  console.log(`\x1b[32mSelected Model: ${selectedModel}\x1b[0m\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt("\nYou: ");
  rl.prompt();

  rl.on("line", async (line) => {
    const stream = await model.stream(line);
    process.stdout.write("\nResponse: ");

    for await (const chunk of stream) {
      process.stdout.write(chunk.content);
    }

    console.log();
    rl.prompt();
  }).on("close", () => {
    console.log("Chat session ended.");
    process.exit(0);
  });
}

main();
