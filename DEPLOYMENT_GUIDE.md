# Deployment Guide - Claude Vision MCP Server

## 🚀 Deploying to Smithery.ai

### Prerequisites

- GitHub account with the repository: `https://github.com/huuthangntk/claude-vision-mcp-server`
- Smithery.ai account (logged in)
- Smithery API key: `6797ce38-f03f-45d6-b1c5-3144a57ae1c2`

### Step-by-Step Deployment Process

#### 1. Navigate to Smithery Publish Page

Visit: [https://smithery.ai/new](https://smithery.ai/new)

#### 2. Connect with GitHub

Click the **"Continue with GitHub"** button

#### 3. Select Repository

1. In the repository search bar, type: `claude-vision-mcp-server`
2. Select the repository: `huuthangntk/claude-vision-mcp-server`
3. Click on the repository to proceed

#### 4. Configure Deployment Settings

- **Branch**: Select `main`
- **Runtime**: Should auto-detect as `typescript` (from smithery.yaml)
- **Transport**: Should auto-detect as `http` (from smithery.yaml)

#### 5. Create/Deploy

Click the **"Create"** or **"Deploy"** button to publish your MCP server

#### 6. Wait for Build

Smithery will:
- Clone your repository
- Install dependencies
- Build the TypeScript code
- Deploy the server
- Generate a public URL

#### 7. Get Your Server URL

After successful deployment, you'll receive:
```
https://server.smithery.ai/@huuthangntk/claude-vision-mcp-server
```

---

## 📝 Using in Cursor IDE

### Option 1: Local Installation

Create or edit `~/.cursor/mcp.json` (global configuration):

```json
{
  "mcpServers": {
    "claude-vision-local": {
      "command": "node",
      "args": [
        "C:/Users/Yomen/EveryoneVPN/claude/claude-vision-mcp/.smithery/index.cjs"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-actual-key-here"
      }
    }
  }
}
```

### Option 2: Smithery Hosted Version

Create or edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "claude-vision-hosted": {
      "url": "https://server.smithery.ai/@huuthangntk/claude-vision-mcp-server",
      "config": {
        "apiKey": "sk-ant-your-anthropic-key-here",
        "model": "claude-sonnet-4-20250514",
        "maxIterations": 5
      }
    }
  }
}
```

### Option 3: Both (Local + Hosted)

You can have both configurations:

```json
{
  "mcpServers": {
    "claude-vision-local": {
      "command": "node",
      "args": [
        "C:/Users/Yomen/EveryoneVPN/claude/claude-vision-mcp/.smithery/index.cjs"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-key-here"
      }
    },
    "claude-vision-hosted": {
      "url": "https://server.smithery.ai/@huuthangntk/claude-vision-mcp-server",
      "config": {
        "apiKey": "sk-ant-your-key-here"
      }
    }
  }
}
```

---

## 🔧 Activating in Cursor

### Step 1: Open MCP Settings

1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type "MCP" and select **"MCP: Open Settings"**

### Step 2: Refresh Servers

Click the **refresh button** in the top right corner of the MCP settings page

### Step 3: Verify Tools

You should see three tools available:

1. ✅ **think** - Deep Think & Analysis
2. ✅ **analyze_image** - Multi-Perspective Image Analysis  
3. ✅ **describe_image** - Quick Image Description

### Step 4: Enable Tools

Ensure all tools are enabled (toggle switches should be ON)

### Step 5: Test in Composer

Open Composer Agent and try:

```
Use the think tool to analyze the best approach for building a responsive navigation menu
```

---

## 🐳 Docker Deployment (Local Server)

### Quick Start

```bash
# Navigate to project
cd C:\Users\Yomen\EveryoneVPN\claude\claude-vision-mcp

# Create .env file with your API key
echo ANTHROPIC_API_KEY=sk-ant-your-key-here > .env

# Build and start
docker-compose up -d
```

### Configure Auto-Start

#### Windows with Docker Desktop

1. Open Docker Desktop
2. Go to **Settings** → **General**
3. Enable: **"Start Docker Desktop when you sign in to your computer"**
4. Click **"Apply & Restart"**

The container will now start automatically when Docker Desktop launches!

### Verify Container Status

```bash
# Check if running
docker ps | grep claude-vision

# View logs
docker logs claude-vision-mcp-server

# Check health
docker inspect claude-vision-mcp-server | grep Health
```

---

## 🧪 Testing Your Deployment

### Test 1: Basic Text Analysis

In Cursor Composer:
```
Use the think tool to analyze the pros and cons of using TypeScript vs JavaScript for a large-scale web application
```

Expected: Detailed analysis with pros, cons, and recommendations

### Test 2: Image Description (URL)

```
Use describe_image with image source: https://picsum.photos/800/600
Focus on: colors and composition
```

Expected: Description of the random image from Lorem Picsum

### Test 3: Multi-Perspective Analysis (Local File)

```
First, take a screenshot and save it to:
C:\Users\Yomen\EveryoneVPN\claude\claude-vision-mcp\claude_vision\test.png

Then use analyze_image:
- Image source: claude_vision/test.png
- Query: Analyze this screenshot and identify all UI components
- Iterations: 5
```

Expected: 5 different perspectives on the image + comprehensive synthesis

---

## 📊 Monitoring & Maintenance

### Smithery Dashboard

Visit: [https://smithery.ai/dashboard](https://smithery.ai/dashboard)

Monitor:
- Server status
- Usage statistics
- Error logs
- Deployment history

### Local Logs

```bash
# Docker logs
docker logs -f claude-vision-mcp-server

# Last 50 lines
docker logs --tail 50 claude-vision-mcp-server
```

### Updating the Server

#### Update Local Version

```bash
cd C:\Users\Yomen\EveryoneVPN\claude\claude-vision-mcp
git pull origin main
bun install
bun run build

# If using Docker
docker-compose down
docker-compose up -d --build
```

#### Update Smithery Hosted Version

1. Push changes to GitHub: `git push origin main`
2. Smithery auto-deploys on push (if webhook configured)
3. Or manually trigger redeploy in Smithery dashboard

---

## 🔐 Security Checklist

- ✅ API keys stored in environment variables (not committed)
- ✅ `.env` file added to `.gitignore`
- ✅ Repository is public (for Smithery deployment)
- ✅ No sensitive data in code or commits
- ✅ Regular API key rotation (recommended every 90 days)
- ✅ Monitor usage in Anthropic console

---

## 🆘 Troubleshooting

### Issue: Server not appearing in Cursor

**Solution:**
1. Check JSON syntax in `mcp.json` (no trailing commas)
2. Restart Cursor completely
3. Click refresh button in MCP settings
4. Check absolute path to `.smithery/index.cjs` is correct

### Issue: Tools not working

**Solution:**
1. Verify ANTHROPIC_API_KEY is set correctly
2. Check API key has vision capabilities enabled
3. Test API key directly: [https://console.anthropic.com/](https://console.anthropic.com/)
4. Check Cursor Developer Console for errors

### Issue: Image analysis failing

**Solution:**
1. Verify image path exists (for local files)
2. Check URL is publicly accessible (for URLs)
3. Supported formats: JPEG, PNG, GIF, WebP
4. Try with a simple test image first

### Issue: Docker container won't start

**Solution:**
```bash
# Check logs
docker logs claude-vision-mcp-server

# Verify environment variables
docker inspect claude-vision-mcp-server | grep -A 10 Env

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Issue: Smithery deployment failed

**Solution:**
1. Check build logs in Smithery dashboard
2. Verify `smithery.yaml` configuration
3. Ensure `package.json` has `module` field
4. Check all dependencies are properly specified
5. Try manual build locally: `bun run build`

---

## 📚 Additional Resources

- **GitHub Repository**: https://github.com/huuthangntk/claude-vision-mcp-server
- **Smithery Docs**: https://smithery.ai/docs
- **MCP Protocol**: https://modelcontextprotocol.io/
- **Anthropic API**: https://docs.anthropic.com/
- **Cursor Documentation**: https://cursor.com/docs

---

## 🎉 Success Criteria

You've successfully deployed when:

✅ Repository is on GitHub  
✅ Server is deployed on Smithery  
✅ Tools appear in Cursor MCP settings  
✅ All three tools are enabled  
✅ Test queries return valid responses  
✅ Docker container runs automatically  
✅ No API key exposed in commits  

---

## 📞 Support

For issues:
1. Check logs (Smithery dashboard or Docker logs)
2. Review this guide
3. Check GitHub Issues
4. Join Smithery Discord
5. Consult Cursor community

**Congratulations on deploying your Claude Vision MCP Server! 🎊**
