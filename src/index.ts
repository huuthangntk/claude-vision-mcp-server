import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// Configuration schema for API key
export const configSchema = z.object({
  apiKey: z.string().describe("Your Anthropic Claude API key"),
  model: z.string().default("claude-sonnet-4-20250514").describe("Claude model to use"),
  maxIterations: z.number().min(3).max(15).default(5).describe("Number of analysis iterations for images"),
});

// Image analysis perspectives
const ANALYSIS_PERSPECTIVES = [
  "Overall atmosphere, mood, and emotional tone of the image",
  "Text, labels, signs, and written content visible in the image",
  "Lighting, shadows, color palette, and visual composition",
  "Objects, subjects, and their spatial relationships",
  "Technical quality, resolution, and photographic techniques",
  "Context, setting, and environmental details",
  "Symbolic elements, metaphors, and deeper meanings",
  "Human elements, expressions, and body language (if present)",
  "Architectural and structural elements",
  "Color psychology and visual impact",
  "Cultural or historical significance",
  "Potential uses and applications of the image",
  "Details that might be easily overlooked",
  "Patterns, textures, and surface qualities",
  "Overall message or story being conveyed"
];

export default function createServer({ config }: { config: z.infer<typeof configSchema> }) {
  const server = new McpServer({
    name: "Claude Vision & Analysis",
    version: "1.0.0",
  });

  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: config.apiKey,
  });

  /**
   * Tool 1: Think and Analyze Text
   * Deeply analyzes text prompts and provides insights
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

  /**
   * Tool 2: Multi-Perspective Image Analysis
   * Analyzes images from multiple perspectives with Claude Vision
   */
  server.registerTool(
    "analyze_image",
    {
      title: "Multi-Perspective Image Analysis",
      description: "Analyzes an image from multiple perspectives using Claude's vision capabilities. Performs iterative analysis to extract comprehensive insights about the image.",
      inputSchema: {
        imageSource: z.string().describe("URL or local file path to the image"),
        query: z.string().describe("Specific question or goal for analyzing this image"),
        iterations: z.number().min(3).max(15).optional().describe("Number of analysis iterations (default from config)"),
      },
    },
    async ({ imageSource, query, iterations }) => {
      try {
        const numIterations = iterations || config.maxIterations;
        const analysisResults: string[] = [];

        // Determine if it's a URL or local path
        let imageData: { type: "url"; source: { type: "url"; url: string } } | { type: "base64"; source: { type: "base64"; media_type: string; data: string } };

        if (imageSource.startsWith("http://") || imageSource.startsWith("https://")) {
          // It's a URL
          imageData = {
            type: "url",
            source: {
              type: "url",
              url: imageSource,
            },
          };
        } else {
          // It's a local file path
          const imagePath = path.isAbsolute(imageSource) 
            ? imageSource 
            : path.resolve(process.cwd(), imageSource);

          if (!fs.existsSync(imagePath)) {
            return {
              content: [
                {
                  type: "text",
                  text: `❌ Error: Image file not found at path: ${imagePath}`,
                },
              ],
              isError: true,
            };
          }

          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = imageBuffer.toString("base64");
          const ext = path.extname(imagePath).toLowerCase();
          
          let mediaType = "image/jpeg";
          if (ext === ".png") mediaType = "image/png";
          else if (ext === ".gif") mediaType = "image/gif";
          else if (ext === ".webp") mediaType = "image/webp";

          imageData = {
            type: "base64",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Image,
            },
          };
        }

        // Perform multiple analysis iterations from different perspectives
        for (let i = 0; i < numIterations; i++) {
          const perspective = ANALYSIS_PERSPECTIVES[i % ANALYSIS_PERSPECTIVES.length];
          
          const systemPrompt = `You are an expert image analyst. Focus specifically on: ${perspective}`;
          
          const userPrompt = i === 0
            ? `${query}\n\nPlease analyze this image focusing on: ${perspective}`
            : `Continuing the analysis of the previous image with focus on: ${perspective}\n\nOriginal query: ${query}\n\nPrevious findings:\n${analysisResults.slice(-2).join("\n\n")}`;

          const messageContent: any[] = [
            {
              type: "image",
              source: imageData.source,
            },
            {
              type: "text",
              text: userPrompt,
            },
          ];

          const response = await anthropic.messages.create({
            model: config.model,
            max_tokens: 2048,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: messageContent,
              },
            ],
          });

          const analysisText = response.content
            .filter((block) => block.type === "text")
            .map((block) => (block as { type: "text"; text: string }).text)
            .join("\n");

          analysisResults.push(`**Iteration ${i + 1} - ${perspective}:**\n${analysisText}`);
        }

        // Synthesize final comprehensive analysis
        const synthesisPrompt = `Based on the following ${numIterations} analysis iterations of an image, provide a comprehensive synthesis that highlights the most important findings and insights:\n\n${analysisResults.join("\n\n---\n\n")}`;

        const synthesisResponse = await anthropic.messages.create({
          model: config.model,
          max_tokens: 3072,
          system: "You are an expert at synthesizing multiple perspectives into actionable insights.",
          messages: [
            {
              role: "user",
              content: synthesisPrompt,
            },
          ],
        });

        const synthesis = synthesisResponse.content
          .filter((block) => block.type === "text")
          .map((block) => (block as { type: "text"; text: string }).text)
          .join("\n");

        return {
          content: [
            {
              type: "text",
              text: `🔍 **Multi-Perspective Image Analysis**\n\n**Query:** ${query}\n**Iterations:** ${numIterations}\n**Image Source:** ${imageSource}\n\n---\n\n${analysisResults.join("\n\n---\n\n")}\n\n---\n\n## 📊 Comprehensive Synthesis\n\n${synthesis}\n\n---\n*Model: ${config.model}*`,
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Error during image analysis: ${error.message}\n\nPlease ensure:\n1. The image URL is accessible or the file path is correct\n2. Your API key has vision capabilities enabled\n3. The image format is supported (JPEG, PNG, GIF, WebP)`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  /**
   * Tool 3: Quick Image Description
   * Fast single-pass image description for quick insights
   */
  server.registerTool(
    "describe_image",
    {
      title: "Quick Image Description",
      description: "Provides a quick, comprehensive description of an image in a single pass. Use this for faster analysis when you don't need multiple perspectives.",
      inputSchema: {
        imageSource: z.string().describe("URL or local file path to the image"),
        focus: z.string().optional().describe("Specific aspect to focus on (e.g., 'text content', 'colors', 'objects')"),
      },
    },
    async ({ imageSource, focus }) => {
      try {
        // Determine if it's a URL or local path
        let imageData: { type: "url"; source: { type: "url"; url: string } } | { type: "base64"; source: { type: "base64"; media_type: string; data: string } };

        if (imageSource.startsWith("http://") || imageSource.startsWith("https://")) {
          imageData = {
            type: "url",
            source: {
              type: "url",
              url: imageSource,
            },
          };
        } else {
          const imagePath = path.isAbsolute(imageSource) 
            ? imageSource 
            : path.resolve(process.cwd(), imageSource);

          if (!fs.existsSync(imagePath)) {
            return {
              content: [
                {
                  type: "text",
                  text: `❌ Error: Image file not found at path: ${imagePath}`,
                },
              ],
              isError: true,
            };
          }

          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = imageBuffer.toString("base64");
          const ext = path.extname(imagePath).toLowerCase();
          
          let mediaType = "image/jpeg";
          if (ext === ".png") mediaType = "image/png";
          else if (ext === ".gif") mediaType = "image/gif";
          else if (ext === ".webp") mediaType = "image/webp";

          imageData = {
            type: "base64",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Image,
            },
          };
        }

        const userPrompt = focus 
          ? `Please describe this image with a focus on: ${focus}` 
          : "Please provide a comprehensive description of this image, including key elements, composition, colors, mood, and any text or notable details.";

        const response = await anthropic.messages.create({
          model: config.model,
          max_tokens: 2048,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: imageData.source,
                },
                {
                  type: "text",
                  text: userPrompt,
                },
              ],
            },
          ],
        });

        const description = response.content
          .filter((block) => block.type === "text")
          .map((block) => (block as { type: "text"; text: string }).text)
          .join("\n");

        return {
          content: [
            {
              type: "text",
              text: `📸 **Image Description**\n\n${description}\n\n---\n*Model: ${config.model} | Tokens: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out*`,
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Error during image description: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  return server.server;
}
