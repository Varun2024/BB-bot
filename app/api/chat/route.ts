import { createOpenAI } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { searchDocuments } from "@/lib/search";

const CHAT_MODEL =
  process.env.GROQ_CHAT_MODEL ?? "moonshotai/kimi-k2-instruct-0905";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export type ChatMessage = UIMessage;

function modelNeedsSystemInline(modelId: string) {
  // Gemma variants don't support system prompts properly in the system channel
  // Llama and other models work fine with the system channel
  return /gemma/i.test(modelId);
}

function extractMessageText(message: ChatMessage) {
  const withContent = message as { content?: unknown };
  if (typeof withContent.content === "string") {
    return withContent.content;
  }

  const withParts = message as {
    parts?: Array<{ type?: string; text?: unknown }>;
  };
  if (!Array.isArray(withParts.parts)) {
    return null;
  }

  const joined = withParts.parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text as string)
    .join("\n")
    .trim();

  return joined.length > 0 ? joined : null;
}

function inlineSystemIntoFirstUserMessage(
  messages: ChatMessage[],
  systemPrompt: string,
) {
  const preamble =
    "SYSTEM INSTRUCTION:\n" + systemPrompt + "\n\n---\n\nUSER MESSAGE:\n";

  let injected = false;

  const nextMessages = messages.map((message) => {
    if (injected || message.role !== "user") {
      return message;
    }

    const text = extractMessageText(message);
    if (!text) {
      return message;
    }

    injected = true;
    return {
      ...message,
      content: `${preamble}${text}`,
    } as ChatMessage;
  });

  if (injected) {
    return nextMessages;
  }

  return [
    {
      id: `synthetic-${Date.now()}`,
      role: "user",
      content: `${preamble}Please continue the conversation using this context.`,
    } as unknown as ChatMessage,
    ...messages,
  ];
}

function isSystemChannelCompatibilityError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  return /developer instruction is not enabled|system prompt|system instruction/i.test(
    message,
  );
}

// CORS helper
function withCORS(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

export async function OPTIONS() {
  return withCORS(new Response(null, { status: 204 }));
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      messages?: ChatMessage[];
    } | null;
    const messages = body?.messages;

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response("Missing OPENROUTER_API_KEY in .env.local", {
        status: 500,
      });
    }

    if (!Array.isArray(messages)) {
      return new Response(
        "Invalid request body: expected { messages: ChatMessage[] }",
        {
          status: 400,
        },
      );
    }

    // Extract the last user message for context search
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.role === "user");

    let systemPrompt =
      "You are a helpful chat assistant who is well versed in basketball statistics and knowledge who can act as a coach. Be concise by default, ask a brief clarifying question when needed, and format answers clearly using markdown when helpful.";

    // Search knowledge base for relevant context
    const lastUserText = lastUserMessage
      ? extractMessageText(lastUserMessage)
      : null;

    if (lastUserText) {
      try {
        const relevantDocs = await searchDocuments(lastUserText);

        if (relevantDocs.length > 0) {
          const contextText = relevantDocs
            .map((doc, index) => `[Document ${index + 1}]\n${doc.content}`)
            .join("\n\n---\n\n");
          systemPrompt += `\n\nYou have access to the following knowledge base information:\n\n${contextText}\n\nUse this information to provide accurate and helpful answers to the user's questions.`;
        } else {
          console.log(`[RAG] No documents found at current threshold`);
        }
      } catch (error) {
        console.error("Error searching documents:", error);
        // Continue without context if search fails
      }
    } else {
      console.log(`[RAG] No user text found - skipping search`);
    }

    const buildResult = async (inlineSystem: boolean) => {
      const effectiveMessages = inlineSystem
        ? inlineSystemIntoFirstUserMessage(messages, systemPrompt)
        : messages;

      return streamText({
        model: groq.chat(CHAT_MODEL),
        system: inlineSystem ? undefined : systemPrompt,
        messages: await convertToModelMessages(effectiveMessages),
        temperature: 0.4,
        topP: 0.9,
        maxOutputTokens: 1024,
        abortSignal: req.signal,
      });
    };

    const inlineByDefault = modelNeedsSystemInline(CHAT_MODEL);
    console.log(`[RAG] Model: "${CHAT_MODEL}"`);
    console.log(`[RAG] Needs inline system: ${inlineByDefault}`);

    let result;
    try {
      result = await buildResult(inlineByDefault);
    } catch (error) {
      if (!inlineByDefault && isSystemChannelCompatibilityError(error)) {
        result = await buildResult(true);
      } else {
        throw error;
      }
    }

    return withCORS(result.toUIMessageStreamResponse());
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return withCORS(new Response("Internal Server Error", { status: 500 }));
  }
}
