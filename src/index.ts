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
   * IMPORTANT: Should be called BEFORE writing any code when new information arrives
   */
  server.registerTool(
    "think",
    {
      title: "Deep Think & Analysis (Call Before Coding)",
      description: "CRITICAL: Use this tool BEFORE writing or modifying code when new information arrives (errors, requirements, feedback, documentation). This tool analyzes the context deeply to provide intelligent insights, identify pitfalls, suggest best practices, and extract key information that will make the code implementation better, faster, and more reliable. Always call this first when you encounter new findings or need to make code changes.",
      inputSchema: {
        query: z.string().describe("The new information, error, requirement, or problem to analyze before implementing code"),
        context: z.string().optional().describe("Current codebase context, tech stack, constraints, or previous attempts"),
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