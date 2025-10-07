# Claude Vision & Analysis MCP Server

A powerful Model Context Protocol (MCP) server that provides deep analytical thinking and multi-perspective image analysis using Anthropic's Claude AI.

## 🌟 Features

### 1. Deep Think & Analysis (`think`)
Provides intelligent insights, suggestions, and strategic guidance based on conversation context. Perfect for:
- Understanding complex requirements
- Identifying potential pitfalls and best practices
- Offering alternative approaches
- Extracting key information for efficient task completion

### 2. Multi-Perspective Image Analysis (`analyze_image`)
Analyzes images from 3-15 different perspectives including:
- Overall atmosphere and emotional tone
- Text and written content
- Lighting and composition
- Objects and spatial relationships
- Technical quality
- Context and environmental details
- Symbolic meanings
- Color psychology
- And more...

### 3. Quick Image Description (`describe_image`)
Fast, comprehensive single-pass image description for quick insights.

## 📋 Prerequisites

- Node.js 18+ or Bun
- Anthropic Claude API key ([Get one here](https://console.anthropic.com/))
- MCP-compatible client (Cursor IDE, Claude Desktop, etc.)

## 🚀 Quick Start

### 1. Installation

```bash
cd claude-vision-mcp
npm install
# or
bun install
```

### 2. Configuration

Create a `.env` file (copy from `env.example`):

```bash
ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-sonnet-4-20250514
MAX_ITERATIONS=5
```

### 3. Build

```bash
npm run build
# or
bun run build
```

### 4. Test Locally

```bash
npm run dev
# or
bun run dev
```

This starts a development server with ngrok tunneling for testing in the Smithery playground.

## 🔧 Usage in Cursor IDE

### Configuration

Add to your `.cursor/mcp.json` (global) or project's `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "claude-vision": {
      "command": "node",
      "args": [
        "/path/to/claude-vision-mcp/dist/index.js"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Or use the Smithery hosted version:

```json
{
  "mcpServers": {
    "claude-vision": {
      "url": "https://server.smithery.ai/@your-username/claude-vision-mcp-server"
    }
  }
}
```

### Tool Usage

Once configured, the Composer Agent can use the tools:

**Deep Analysis:**
```
Use the think tool to analyze the best approach for implementing user authentication
```

**Image Analysis:**
```
Use analyze_image to examine screenshot.png and identify all UI elements and color schemes
```

**Quick Description:**
```
Describe the image at https://example.com/photo.jpg focusing on text content
```

## 🐳 Docker Setup

### Build Image

```bash
docker build -t claude-vision-mcp .
```

### Run Container

```bash
docker run -p 8080:8080 \
  -e ANTHROPIC_API_KEY=your_api_key \
  claude-vision-mcp
```

### Auto-Start with Docker Desktop

Use the included `docker-compose.yml`:

```bash
docker-compose up -d
```

The container will automatically restart when Docker Desktop starts.

## 📦 Deployment to Smithery

1. Push your code to GitHub
2. Visit [smithery.ai/new](https://smithery.ai/new)
3. Click "Continue with GitHub"
4. Select your repository
5. Choose the `main` branch
6. Click "Create" to deploy

Users can then install your MCP server directly from the Smithery marketplace!

## 🔑 Configuration Options

When using the hosted version or configuring locally, you can customize:

- **apiKey** (required): Your Anthropic Claude API key
- **model** (optional): Claude model to use (default: `claude-sonnet-4-20250514`)
- **maxIterations** (optional): Number of analysis iterations for images (3-15, default: 5)

## 📚 Examples

### Example 1: Analyzing Design Choices

```
Context: Building a meditation app landing page

Tool: think
Query: What color schemes would work best for a calming, professional meditation app?
```

### Example 2: Multi-Perspective Image Analysis

```
Tool: analyze_image
Image Source: ./screenshots/homepage.png
Query: Analyze this webpage design and suggest improvements for user engagement
Iterations: 7
```

### Example 3: Quick Text Extraction

```
Tool: describe_image
Image Source: https://example.com/document.jpg
Focus: text content
```

## 🛠️ Development

### Project Structure

```
claude-vision-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── smithery.yaml         # Smithery deployment config
├── Dockerfile            # Docker container definition
├── docker-compose.yml    # Docker Compose for auto-start
└── README.md            # This file
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
- `npm run prepare` - Pre-publish build step

## 🔒 Security Best Practices

1. **Never commit API keys** - Always use environment variables
2. **Use .gitignore** - Ensure `.env` files are ignored
3. **Rotate keys regularly** - Update API keys periodically
4. **Review tool calls** - Keep manual approval enabled in Cursor
5. **Use development environments** - Test with non-production data

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the [MCP Documentation](https://modelcontextprotocol.io/)
- Visit [Smithery.ai Discord](https://smithery.ai/discord)

## 🙏 Acknowledgments

- Built with [Anthropic Claude API](https://www.anthropic.com/)
- Powered by [Model Context Protocol](https://modelcontextprotocol.io/)
- Hosted on [Smithery.ai](https://smithery.ai/)
