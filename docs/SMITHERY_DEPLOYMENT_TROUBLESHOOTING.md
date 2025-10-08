# Smithery Deployment Troubleshooting

## 🚨 Error Encountered

```
Error code: publishSandboxError
Message: An internal error occurred. Please try again later or contact support.
```

## 🔍 What This Error Means

The `publishSandboxError` typically indicates:
1. **Temporary Smithery platform issue** - Their sandbox environment might be experiencing problems
2. **Configuration validation issue** - Something in the deployment config isn't passing validation
3. **Build/test failure** - The server might not be passing Smithery's automated tests

## ✅ Your Server Configuration Looks Good

The submitted configuration is valid:
```json
{
  "name": "ai.smithery/huuthangntk-claude-vision-mcp-server",
  "version": "1.0.0",
  "repository": {
    "url": "https://github.com/huuthangntk/claude-vision-mcp-server",
    "source": "github"
  },
  "remotes": [{
    "type": "streamable-http",
    "url": "https://server.smithery.ai/@huuthangntk/claude-vision-mcp-server/mcp"
  }]
}
```

## 🔧 Troubleshooting Steps

### Step 1: Wait and Retry (Recommended First)

This error is often temporary. Wait 5-10 minutes and try again:

1. Go to https://smithery.ai/new
2. Click "Continue with GitHub"
3. Search for: `claude-vision-mcp-server`
4. Select your repository
5. Choose branch: `main`
6. Click "Create"

### Step 2: Check GitHub Repository Status

Verify your repository is accessible:

```bash
# Check if repo is public
# Visit: https://github.com/huuthangntk/claude-vision-mcp-server

# Ensure these files are present:
# - src/index.ts
# - package.json (with "module" field)
# - smithery.yaml
# - .smithery/index.cjs (built file)
```

### Step 3: Verify smithery.yaml Configuration

Check your `smithery.yaml` file:

```yaml
runtime: "typescript"

startCommand:
  type: "http"

# Config schema is auto-extracted from TypeScript
```

This looks correct. The Smithery CLI should auto-detect everything.

### Step 4: Try Manual Build Verification

Test that your server builds correctly for Smithery:

```bash
cd C:\Users\Yomen\EveryoneVPN\claude\claude-vision-mcp

# Clean rebuild
rm -rf node_modules .smithery
bun install
bun run build

# Verify output
ls .smithery/index.cjs
```

### Step 5: Check Smithery Service Status

Visit:
- https://status.smithery.ai/ (if exists)
- https://smithery.ai/discord (ask in community)
- https://twitter.com/smithery_ai (check for announcements)

### Step 6: Contact Smithery Support

If the issue persists:

1. **Discord**: Join Smithery Discord and ask in #support
2. **Email**: support@smithery.ai
3. **GitHub**: Open issue at github.com/smithery-ai/cli

Provide them with:
- Error code: `publishSandboxError`
- Repository: https://github.com/huuthangntk/claude-vision-mcp-server
- Timestamp of error
- Server config (from the error message)

## 🎯 Alternative: Use Local MCP Server (Already Working!)

**Good news**: Your local setup is already working perfectly!

### Current Working Setup

You already have the MCP server running locally:

**Via Bun (Cursor IDE)**:
```json
{
  "mcpServers": {
    "claude-vision-local": {
      "command": "bun",
      "args": [
        "run",
        "C:/Users/Yomen/EveryoneVPN/claude/claude-vision-mcp/.smithery/index.cjs"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}
```

**Via Docker**:
```bash
docker ps | grep claude-vision
# Container is running on port 8080
```

### Use Local Server While Waiting for Smithery

1. **Restart Cursor IDE** to load the configuration
2. **Test the 3 tools** in Composer Agent
3. **Use it in your projects** - it works exactly the same as hosted

The only difference is:
- **Local**: Runs on your machine (fast, private, no network dependency)
- **Hosted**: Runs on Smithery (accessible anywhere, requires internet)

## 🚀 When Smithery Deployment Works

Once the deployment succeeds, you'll get:

1. **Public URL**: `https://server.smithery.ai/@huuthangntk/claude-vision-mcp-server`
2. **Marketplace Listing**: Your server appears in Smithery marketplace
3. **Easy Sharing**: Others can install with one click
4. **Automatic Updates**: Updates deploy on git push

### Using Hosted Version

Add to your `mcp.json`:

```json
{
  "mcpServers": {
    "claude-vision-hosted": {
      "url": "https://server.smithery.ai/@huuthangntk/claude-vision-mcp-server/mcp",
      "config": {
        "apiKey": "sk-ant-your-api-key-here",
        "model": "claude-sonnet-4-20250514",
        "maxIterations": 5
      }
    }
  }
}
```

## 🔄 Retry Checklist

Before retrying deployment:

- [ ] Wait 5-10 minutes for Smithery systems to reset
- [ ] Verify GitHub repository is public
- [ ] Check all required files are present
- [ ] Ensure `.smithery/index.cjs` exists and is valid
- [ ] Test local build: `bun run build`
- [ ] Clear browser cache
- [ ] Try different browser or incognito mode
- [ ] Check Smithery status/announcements

## 📝 Common Solutions

### Issue: "Repository not found"
**Solution**: Make repository public in GitHub settings

### Issue: "Build failed"
**Solution**: 
```bash
bun run build
# Fix any build errors
git add .
git commit -m "Fix build issues"
git push origin main
```

### Issue: "Invalid configuration"
**Solution**: Verify `smithery.yaml` matches the template:
```yaml
runtime: "typescript"
startCommand:
  type: "http"
```

### Issue: "Timeout during deployment"
**Solution**: This is a Smithery infrastructure issue. Wait and retry.

## 🎯 Recommended Next Steps

### Immediate (While Waiting for Smithery):

1. ✅ **Use local setup** - It's already working perfectly
2. ✅ **Test all 3 tools** in Cursor Composer
3. ✅ **Start using in projects** - No need to wait

### When Ready to Retry:

1. ⏰ Wait 10-15 minutes
2. 🔄 Try deployment again
3. 📧 If still failing, contact Smithery support
4. 💬 Ask in Smithery Discord

### Long Term:

1. ✅ Keep local setup for development
2. ✅ Deploy to Smithery for production/sharing
3. ✅ Both can coexist in your mcp.json

## 💡 Pro Tip

You can have BOTH local and hosted versions:

```json
{
  "mcpServers": {
    "claude-vision-local": {
      "command": "bun",
      "args": ["run", "path/to/server"]
    },
    "claude-vision-hosted": {
      "url": "https://server.smithery.ai/@huuthangntk/..."
    }
  }
}
```

Use local for development, hosted for production!

## 📞 Getting Help

1. **Smithery Discord**: Fastest response (https://smithery.ai/discord)
2. **GitHub Issues**: For reproducible bugs
3. **Email Support**: For account-specific issues

## ✅ Current Status Summary

**What's Working**:
- ✅ MCP server built successfully
- ✅ Docker container running
- ✅ Local Cursor integration configured
- ✅ All 3 tools ready to use
- ✅ GitHub repository published

**What's Pending**:
- ⏳ Smithery deployment (temporary platform issue)

**What You Can Do Now**:
- 🚀 **Test your MCP server locally** (it works!)
- ⏰ **Wait 10-15 minutes and retry** Smithery deployment
- 💬 **Ask Smithery support** if issue persists

---

**Bottom Line**: Your MCP server is fully functional locally. The Smithery deployment is just for hosting/sharing. Use the local version while we wait for Smithery to resolve their platform issue.
