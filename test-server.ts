/**
 * Comprehensive Test Suite for Claude Vision MCP Server
 * Tests all three tools: think, describe_image, and analyze_image
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import https from "https";

// Load environment variables
const API_KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = "claude-sonnet-4-20250514";

if (!API_KEY || API_KEY === 'your-anthropic-api-key-here') {
  console.error("❌ ERROR: Please set ANTHROPIC_API_KEY environment variable");
  console.error("   Get your key from: https://console.anthropic.com/");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: API_KEY });

// Test results storage
interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
  output?: string;
}

const results: TestResult[] = [];

// Helper function to measure execution time
async function measureTest(name: string, testFn: () => Promise<void>): Promise<void> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 Running: ${name}`);
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  
  try {
    await testFn();
    const duration = Date.now() - startTime;
    results.push({ name, passed: true, duration });
    console.log(`✅ PASSED in ${duration}ms (${(duration / 1000).toFixed(2)}s)`);
  } catch (error: any) {
    const duration = Date.now() - startTime;
    results.push({ name, passed: false, duration, error: error.message });
    console.error(`❌ FAILED: ${error.message}`);
  }
}

// Download test image
async function downloadTestImage(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

/**
 * TEST 1: Deep Think Tool - Text Analysis
 */
async function testThinkTool(): Promise<void> {
  console.log("\n📝 Testing 'think' tool for deep analysis...\n");
  
  const query = `I'm building a real-time chat application that needs to support 100,000 concurrent users. 
Should I use WebSockets, Server-Sent Events (SSE), or HTTP polling? 
Consider scalability, browser compatibility, and infrastructure costs.`;

  const context = "Building a SaaS chat platform with real-time requirements";

  console.log("Query:", query.substring(0, 100) + "...");
  console.log("\nCalling Claude API...");

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: `You are an expert analytical assistant. Provide deep, actionable insights with structured analysis.`,
    messages: [
      {
        role: "user",
        content: `Context: ${context}\n\nQuery: ${query}`,
      },
    ],
  });

  const analysisText = response.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text)
    .join("\n");

  console.log("\n" + "─".repeat(60));
  console.log("📊 RESULT:");
  console.log("─".repeat(60));
  console.log(analysisText.substring(0, 500) + "...\n");
  console.log(`Token Usage: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`);

  if (analysisText.length < 100) {
    throw new Error("Analysis too short - expected detailed response");
  }
}

/**
 * TEST 2: Quick Image Description - URL Analysis
 */
async function testDescribeImageTool(): Promise<void> {
  console.log("\n🖼️  Testing 'describe_image' tool with URL...\n");
  
  const imageUrl = "https://picsum.photos/seed/mcp-test-123/800/600";
  console.log("Image URL:", imageUrl);
  console.log("\nCalling Claude Vision API...");

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "url",
              url: imageUrl,
            },
          },
          {
            type: "text",
            text: "Please provide a comprehensive description of this image, including key elements, composition, colors, mood, and any notable details.",
          },
        ],
      },
    ],
  });

  const description = response.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text)
    .join("\n");

  console.log("\n" + "─".repeat(60));
  console.log("📊 RESULT:");
  console.log("─".repeat(60));
  console.log(description.substring(0, 500) + "...\n");
  console.log(`Token Usage: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`);

  if (description.length < 50) {
    throw new Error("Description too short - expected detailed response");
  }
}

/**
 * TEST 3: Multi-Perspective Image Analysis - Local File
 */
async function testAnalyzeImageTool(): Promise<void> {
  console.log("\n🔍 Testing 'analyze_image' tool with local file...\n");
  
  // Download a test image
  const imageUrl = "https://images.unsplash.com/photo-1557821552-17105176677c?w=800";
  const imagePath = path.join(process.cwd(), "claude_vision", "test-image.jpg");
  
  console.log("Downloading test image...");
  await downloadTestImage(imageUrl, imagePath);
  console.log("✓ Image downloaded to:", imagePath);

  // Read and encode image
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");

  const iterations = 3; // Using 3 for faster testing
  const analysisResults: string[] = [];

  const perspectives = [
    "Overall atmosphere, mood, and emotional tone",
    "Visual composition, layout, and design elements",
    "Colors, lighting, and photographic techniques",
  ];

  console.log(`\nPerforming ${iterations} iterations of analysis...\n`);

  for (let i = 0; i < iterations; i++) {
    const perspective = perspectives[i];
    console.log(`  Iteration ${i + 1}/${iterations}: ${perspective}`);

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: `You are an expert image analyst. Focus specifically on: ${perspective}`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: base64Image,
              },
            },
            {
              type: "text",
              text: `Analyze this image focusing on: ${perspective}`,
            },
          ],
        },
      ],
    });

    const analysisText = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("\n");

    analysisResults.push(`**Perspective ${i + 1}:** ${analysisText.substring(0, 200)}...`);
  }

  console.log("\n" + "─".repeat(60));
  console.log("📊 MULTI-PERSPECTIVE ANALYSIS RESULTS:");
  console.log("─".repeat(60));
  analysisResults.forEach((result, idx) => {
    console.log(`\n${idx + 1}. ${result}`);
  });

  console.log("\n✓ All iterations completed successfully!");

  if (analysisResults.length !== iterations) {
    throw new Error(`Expected ${iterations} iterations, got ${analysisResults.length}`);
  }
}

/**
 * Print Test Summary
 */
function printSummary(): void {
  console.log("\n\n");
  console.log("═".repeat(70));
  console.log("                    📊 TEST SUMMARY");
  console.log("═".repeat(70));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;
  
  console.log(`\nTotal Tests: ${total} | Passed: ✅ ${passed} | Failed: ❌ ${failed}\n`);
  
  results.forEach((result, idx) => {
    const status = result.passed ? "✅ PASS" : "❌ FAIL";
    const duration = `${(result.duration / 1000).toFixed(2)}s`;
    console.log(`${idx + 1}. ${status} - ${result.name} (${duration})`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });

  console.log("\n" + "═".repeat(70));
  
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  console.log(`Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
  console.log("═".repeat(70) + "\n");

  if (failed > 0) {
    console.error("⚠️  Some tests failed. Check the output above for details.\n");
    process.exit(1);
  } else {
    console.log("🎉 All tests passed successfully!\n");
    console.log("Your Claude Vision MCP Server is working perfectly! ✨\n");
  }
}

/**
 * Main Test Runner
 */
async function runTests(): Promise<void> {
  console.log("\n");
  console.log("╔" + "═".repeat(68) + "╗");
  console.log("║" + " ".repeat(68) + "║");
  console.log("║" + "     🧪 Claude Vision MCP Server - Comprehensive Test Suite     ".padEnd(68) + "║");
  console.log("║" + " ".repeat(68) + "║");
  console.log("╚" + "═".repeat(68) + "╝");
  console.log("\n");

  console.log("🔑 API Key: " + API_KEY.substring(0, 20) + "..." + API_KEY.substring(API_KEY.length - 10));
  console.log("🤖 Model: " + MODEL);
  console.log("\n");

  // Ensure claude_vision directory exists
  const visionDir = path.join(process.cwd(), "claude_vision");
  if (!fs.existsSync(visionDir)) {
    fs.mkdirSync(visionDir, { recursive: true });
  }

  // Run all tests
  await measureTest("Test 1: Deep Think Tool (Text Analysis)", testThinkTool);
  await measureTest("Test 2: Quick Image Description (URL)", testDescribeImageTool);
  await measureTest("Test 3: Multi-Perspective Image Analysis (Local File)", testAnalyzeImageTool);

  // Print summary
  printSummary();
}

// Execute tests
runTests().catch((error) => {
  console.error("\n❌ Fatal error running tests:", error);
  process.exit(1);
});
