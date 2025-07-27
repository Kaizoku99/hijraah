import { generateText } from "ai";
import { mistral } from "@ai-sdk/mistral";

/**
 * Runs OCR on an image/pdf buffer using the Mistral large model via Vercel AI SDK
 * and returns extracted plain text.
 *
 * NOTE: Mistral currently supports images and PDFs up to ~5 MB. Callers should
 * split larger documents up-front (e.g., per page) before invoking.
 *
 * @param fileBuffer – Raw file data
 * @param mimeType – Optional MIME type hint (e.g. "application/pdf")
 */
export async function runMistralOCR(
  fileBuffer: Buffer,
  mimeType?: string,
): Promise<string> {
  // Initialise on demand – env var MISTRAL_API_KEY must be set
  const mistralLlm = mistral("mistral-large-latest");

  const { text: extractedText, finishReason } = await generateText({
    model: mistralLlm,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract all text content from the following document accurately. Respond only with the extracted text.",
          },
          {
            type: "image",
            image: fileBuffer,
            mimeType: mimeType ?? undefined,
          },
        ],
      },
    ],
    // Low temperature for deterministic OCR-style output
    temperature: 0,
  });

  if (finishReason !== "stop" && finishReason !== "length") {
    console.warn("[OCR] Mistral finished with reason:", finishReason);
  }

  return extractedText;
}
