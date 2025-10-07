# Claude Vision MCP Server - Setup Guide

## Complete Installation & Configuration Guide

### Step 1: Get Your Anthropic API Key

1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-`)

### Step 2: Configure Environment

Create a `.env` file in the project root:

```bash
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
CLAUDE_MODEL=claude-sonnet-4-20250514
MAX_ITERATIONS=5
```

### Step 3: Test the Server Locally

#### Option A: Using Smithery Dev Server (Recommended for Testing)

```bash
bun run dev
```

This will:
- Start a local development server
- Create an ngrok tunnel
- Open the Smithery playground in your browser
- Allow you to test the tools interactively

#### Option B: Direct Node Execution

```bash
bun run build
node .smithery/index.cjs
```

### Step 4: Test Each Tool

#### Test 1: Deep Think Tool

In the Smithery playground or your MCP client, try:

```
Use the think tool to analyze the best approach for implementing a user authentication system with OAuth2
```

#### Test 2: Quick Image Description

```
Use describe_image with image source: https://picsum.photos/800/600
Focus on: overall composition and color scheme
```

#### Test 3: Multi-Perspective Image Analysis

First, place a test image in the `claude_vision/` folder, then:

```
Use analyze_image with:
- Image source: claude_vision/test-image.jpg
- Query: Analyze this image and identify all design elements
- Iterations: 5
```

### Step 5: Use in Cursor IDE

#### Global Configuration (Available in all projects)

Create or edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "claude-vision": {
      "command": "node",
      "args": [
        "C:/Users/YourUsername/path/to/claude-vision-mcp/.smithery/index.cjs"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-api-key-here"
      }
    }
  }
}
```

#### Project-Specific Configuration

Create `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "claude-vision": {
      "command": "node",
      "args": [
        "${workspaceFolder}/../claude-vision-mcp/.smithery/index.cjs"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-api-key-here"
      }
    }
  }
}
```

#### Using Smithery Hosted Version

After deploying to Smithery:

```json
{
  "mcpServers": {
    "claude-vision": {
      "url": "https://server.smithery.ai/@your-username/claude-vision-mcp-server",
      "apiKey": "your-smithery-api-key"
    }
  }
}
```

### Step 6: Docker Setup

#### Build and Run

```bash
# Build the image
docker build -t claude-vision-mcp .

# Run the container
docker run -d \
  --name claude-vision-mcp \
  --restart always \
  -p 8080:8080 \
  -e ANTHROPIC_API_KEY=sk-ant-your-api-key \
  -v $(pwd)/claude_vision:/app/claude_vision:ro \
  claude-vision-mcp
```

#### Docker Compose (Auto-start with Docker Desktop)

1. Ensure your `.env` file has your API key
2. Run: `docker-compose up -d`
3. The container will now start automatically when Docker Desktop launches

To configure Docker Desktop for auto-start on Windows:
1. Open Docker Desktop Settings
2. Go to "General"
3. Enable "Start Docker Desktop when you sign in to your computer"

### Step 7: Verify Installation

#### Check Server Status

```bash
# If running via Docker
curl http://localhost:8080/health

# Check logs
docker logs claude-vision-mcp
```

#### Test in Cursor

1. Open Cursor IDE
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type "MCP" and select "MCP: Open Settings"
4. Verify "claude-vision" appears in the server list
5. Click refresh if needed
6. Check that all three tools appear: `think`, `analyze_image`, `describe_image`

### Troubleshooting

#### Server Not Appearing in Cursor

1. Check JSON syntax in mcp.json (no trailing commas)
2. Verify file paths are absolute or properly relative
3. Restart Cursor completely
4. Check Cursor logs: Help → Toggle Developer Tools → Console

#### API Key Errors

- Ensure API key starts with `sk-ant-`
- Verify key is active in Anthropic console
- Check for proper environment variable escaping in shells

#### Image Analysis Failing

- Verify image path exists and is readable
- For URLs: ensure the URL is publicly accessible
- Check file format: JPEG, PNG, GIF, WebP supported
- Verify API key has vision model access

#### Docker Container Won't Start

```bash
# Check logs
docker logs claude-vision-mcp

# Verify environment variables
docker inspect claude-vision-mcp | grep -A 10 Env

# Rebuild if needed
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Usage Examples

#### Example 1: Analyzing Website Screenshots

```
Take a screenshot of our landing page and save it to claude_vision/homepage.png

Then use analyze_image to:
- Analyze the user experience and visual hierarchy
- Identify potential improvements
- Check color scheme consistency
- Analyze call-to-action effectiveness

Use 7 iterations for comprehensive analysis
```

#### Example 2: Code Architecture Planning

```
Use the think tool to:
- Analyze the best database schema for a multi-tenant SaaS application
- Consider scalability, security, and performance
- Provide pros and cons for different approaches
```

#### Example 3: Design Feedback

```
Analyze this Figma export (claude_vision/design-v2.png):
- Check color accessibility and contrast
- Evaluate spacing and alignment
- Identify UX improvements
- Compare against modern design trends

Use 10 iterations for detailed analysis
```

### Performance Tips

1. **Iteration Count**: 
   - Use 3-5 for quick analysis
   - Use 7-10 for detailed insights
   - Use 15 for comprehensive deep dives

2. **Image Quality**:
   - Use high-resolution images for better text extraction
   - Compress large images to speed up processing
   - Supported formats: JPEG, PNG, GIF, WebP

3. **Context Providing**:
   - Always include relevant context in your queries
   - Reference previous findings for continuity
   - Be specific about what you want to learn

### Security Best Practices

1. **Never commit .env files** - They contain your API keys
2. **Use environment variables** in production
3. **Rotate keys regularly** - Update API keys every 90 days
4. **Monitor usage** - Check Anthropic console for unexpected usage
5. **Limit permissions** - Use API keys with minimum necessary scopes

### Support & Resources

- **MCP Documentation**: https://modelcontextprotocol.io/
- **Anthropic API Docs**: https://docs.anthropic.com/
- **Smithery Platform**: https://smithery.ai/
- **Cursor Documentation**: https://cursor.com/docs

### Updates & Maintenance

To update the server:

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
bun install

# Rebuild
bun run build

# Restart Docker container if using Docker
docker-compose restart
```
