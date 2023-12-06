# Multi-Model Llama Chat

Welcome to the Multi-Model Llama Chat! This is a versatile chatbot that supports various Llama quantized models, allowing you to chat with different AI models of your choice.

## Features
- **Apple Silicon Support**: The chatbot is optimized for Apple Silicon.
- **Intel CPUs Compatibility**: For Intel CPUs, ensure to install the non-metal binding. Run `npx --no node-llama-cpp download --no-metal` in the terminal.
- **Model Selection**: Choose from multiple Llama models stored in the `models` folder at startup.
- **Flexible Chat Experience**: Interact with various models through a simple command-line interface.

## Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shatfield4/multi-model-llama-chat
   ```
2. **Install Dependencies**: Navigate to the project directory and run `yarn` or `npm install` to install the necessary dependencies.

3. **Model Placement**: Place your `.gguf` format Llama models in the `models` directory.

4. **Run the Chatbot**:
   ```bash
   node index.js
   ```

## Note for Intel CPU Users
If you are on an Intel-based MacOS, it's crucial to install the no-metal binding of node-llama-cpp. Run the following command before starting the chatbot:
```bash
npx --no node-llama-cpp download --no-metal
```

Enjoy conversing with a variety of AI models through the Multi-Model Llama Chat!