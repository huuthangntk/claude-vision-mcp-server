# Quick Start Guide - Claude Vision MCP Server

## ⚡ 5-Minute Setup

### Step 1: Get Your API Key (1 minute)

Visit [console.anthropic.com](https://console.anthropic.com/) and create an API key

### Step 2: Configure Cursor (2 minutes)

Create `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "claude-vision": {
      "command": "node",
      "args": [
        "C:/Users/Yomen/EveryoneVPN/claude/claude-vision-mcp/.smithery/index.cjs"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-key-here"
      }
    }
  }
}
```

### Step 3: Restart Cursor (30 seconds)

Close and reopen Cursor IDE completely

### Step 4: Verify Installation (1 minute)

1. Press `Ctrl+Shift+P`
2. Type "MCP" → Select "MCP: Open Settings"
3. Look for "claude-vision" with 3 tools

### Step 5: Test It! (30 seconds)

Open Composer and try:

```
Use the think tool to explain the difference between REST and GraphQL APIs
```

**Done! You're ready to go! 🎉**

---

## 🎯 Common Use Cases

### 1. Code Analysis
```
Use think to analyze the best error handling strategy for a Node.js API
```

### 2. Design Review
```
Take a screenshot of the homepage and save to claude_vision/homepage.png

Then: Analyze homepage.png and suggest UI improvements (use 7 iterations)
```

### 3. Quick Image Check
```
Describe this image: https://example.com/diagram.png
Focus on: text and labels
```

---

## 🔧 Troubleshooting

**Server not showing up?**
- Check path in mcp.json is correct
- Restart Cursor
- Click refresh in MCP settings

**Tools not working?**
- Verify API key is valid
- Check key starts with `sk-ant-`
- Test at console.anthropic.com

**Image analysis failing?**
- Use absolute paths for local files
- Ensure URLs are publicly accessible
- Supported: JPEG, PNG, GIF, WebP

---

## 📚 Next Steps

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed configuration
- See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for Smithery hosting
- Check [README.md](./README.md) for all features

---

**Need help?** Check the full guides or open an issue on GitHub!
