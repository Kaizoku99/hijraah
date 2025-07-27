import { fireworks } from "@ai-sdk/fireworks";
import { openai } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

import { isTestEnvironment } from "../constants";

import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

// Define basic mocks here if in test environment, to avoid importing .test.ts file
let testChatModel: any = null;
let testReasoningModel: any = null;
let testTitleModel: any = null;
let testArtifactModel: any = null;

if (isTestEnvironment) {
  // These are simplified mocks. Ideally, proper mocks would be in a separate non-test file.
  const mockModel = (name: string) => ({
    id: `mock-${name}`,
    doGenerate: async () => ({ text: `mock response from ${name}` }),
  });
  testChatModel = mockModel("chat");
  testReasoningModel = mockModel("reasoning");
  testTitleModel = mockModel("title");
  testArtifactModel = mockModel("artifact");
}

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model-small": testChatModel,
        "chat-model-large": testChatModel, // Using same mock for simplicity
        "chat-model-reasoning": testReasoningModel,
        "title-model": testTitleModel,
        "artifact-model": testArtifactModel,
      },
    })
  : customProvider({
      languageModels: {
        "chat-model-small": openai("gpt-4o-mini"),
        "chat-model-large": openai("gpt-4o"),
        "chat-model-reasoning": wrapLanguageModel({
          model: fireworks("accounts/fireworks/models/deepseek-r1"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openai("gpt-4-turbo"),
        "artifact-model": openai("gpt-4o-mini"),
      },
      imageModels: {
        "small-model": openai.image("dall-e-2"),
        "large-model": openai.image("dall-e-3"),
      },
    });
