import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

// Configuration schema for API key
export const configSchema = z.object({
  apiKey: z.string().describe("Your Anthropic Claude API key"),
  model: z.string().default("claude-sonnet-4-5-20250929").describe("Claude model to use"),
});

export default function createServer({ config }: { config: z.infer<typeof configSchema> }) {
  const server = new McpServer({
    name: "Claude Deep Think",
    version: "1.0.0",
  });

  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: config.apiKey,
  });

  /**
   * Tool: Deep Think and Analyze
   * Deeply analyzes text prompts and provides intelligent insights
   */
  server.registerTool(
    "think",
    {
      title: "Deep Think & Analysis",
      description: "Analyzes the context and provides intelligent insights, suggestions, and guidelines based on the conversation. Use this when you need to deeply understand a new finding or provide strategic guidance.",
      inputSchema: {
        query: z.string().describe("The prompt or question to analyze deeply"),
        context: z.string().optional().describe("Additional context from the conversation"),
      },
    },
    async ({ query, context }) => {
      try {
        const systemPrompt = `You are an expert analytical assistant. Your role is to:
1. Deeply understand the context and the user's goals
2. Provide actionable insights and suggestions
3. Identify potential pitfalls and best practices
4. Offer alternative approaches when relevant
5. Extract key information that will help complete tasks more efficiently

Be concise, practical, and focus on what's most valuable for the user's current task.`;

        const fullPrompt = context 
          ? `Context: ${context}\n\nQuery: ${query}` 
          : query;

        const response = await anthropic.messages.create({
          model: config.model,
          max_tokens: 4096,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: fullPrompt,
            },
          ],
        });

        const analysisText = response.content
          .filter((block) => block.type === "text")
          .map((block) => (block as { type: "text"; text: string }).text)
          .join("\n");

        return {
          content: [
            {
              type: "text",
              text: `🧠 **Deep Analysis**\n\n${analysisText}\n\n---\n*Model: ${config.model} | Tokens: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out*`,
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Error during analysis: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  return server.server;
}