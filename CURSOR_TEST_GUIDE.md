# 🧪 Testing Claude Vision MCP Server in Cursor IDE

## Quick Reference: 3 Test Prompts

Copy these prompts directly into **Cursor Composer Agent** after configuring the MCP server:

---

### ✅ Test 1: Deep Think Tool

```
Use the think tool to analyze this question:

"I'm building a real-time chat application that needs to support 100,000 concurrent users. 
Should I use WebSockets, Server-Sent Events (SSE), or HTTP polling? 
Consider scalability, browser compatibility, infrastructure costs, and ease of implementation."

Provide a comprehensive analysis with pros, cons, and recommendations.
```

**Expected**: Detailed comparison with structured analysis, pros/cons, and actionable recommendations.

---

### ✅ Test 2: Quick Image Description

```
Use the describe_image tool to analyze this image:

Image source: https://picsum.photos/seed/cursor-test-456/800/600
Focus on: overall composition, color palette, and mood

Provide a detailed description of what you see in the image.
```

**Expected**: Comprehensive description including colors, composition, subjects, and atmosphere.

---

### ✅ Test 3: Multi-Perspective Image Analysis

```
Use the analyze_image tool to perform multi-perspective analysis:

Image source: https://images.unsplash.com/photo-1557821552-17105176677c?w=800
Query: This appears to be a technology or business-related image. Analyze the composition, color psychology, visual hierarchy, mood, technical quality, and potential use cases. What message does this image convey?
Iterations: 5

Provide comprehensive insights from multiple perspectives.
```

**Expected**: 5 detailed analyses from different perspectives, plus a comprehensive synthesis at the end.

---

## 📋 Step-by-Step Testing Process

### Step 1: Verify MCP Configuration

1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type "MCP" and select **"MCP: Open Settings"**
3. Look for **"claude-vision-local"** in the server list
4. Verify these 3 tools are available:
   - ✅ `think` - Deep Think & Analysis
   - ✅ `analyze_image` - Multi-Perspective Image Analysis
   - ✅ `describe_image` - Quick Image Description
5. Ensure all tools are **enabled** (toggle switches ON)

### Step 2: Open Composer Agent

1. Click the Composer icon in Cursor's sidebar (or press the hotkey)
2. Ensure you're in **Agent Mode** (not manual mode)
3. Make sure your preferred model is selected

### Step 3: Run Test 1 - Think Tool

1. Copy Test 1 prompt (from above)
2. Paste into Composer
3. Send the message
4. Watch for the Agent to call the `think` tool
5. Review the analysis output

**Success Criteria:**
- ✅ Tool call appears in the conversation
- ✅ Detailed analysis returned (500+ words)
- ✅ Includes pros, cons, and recommendations
- ✅ No errors displayed

### Step 4: Run Test 2 - Describe Image

1. Copy Test 2 prompt
2. Paste into Composer
3. Send the message
4. Agent should call `describe_image` tool
5. Review the image description

**Success Criteria:**
- ✅ Image successfully accessed via URL
- ✅ Detailed description returned
- ✅ Mentions colors, composition, subjects
- ✅ No network or API errors

### Step 5: Run Test 3 - Analyze Image

1. Copy Test 3 prompt
2. Paste into Composer
3. Send the message (this will take 1-2 minutes)
4. Agent calls `analyze_image` with 5 iterations
5. Review all perspectives and synthesis

**Success Criteria:**
- ✅ All 5 iterations complete
- ✅ Each iteration shows different perspective
- ✅ Final synthesis provided
- ✅ Total response is comprehensive (1000+ words)

---

## 🔧 Alternative: Testing with Local Images

If you want to test with your own images:

### Step 1: Prepare Test Image

```bash
# Save any image to this folder:
C:\Users\Yomen\EveryoneVPN\claude\claude-vision-mcp\claude_vision\my-test.jpg
```

### Step 2: Use This Prompt

```
Use the analyze_image tool:

Image source: claude_vision/my-test.jpg
Query: Analyze every aspect of this image - composition, colors, subjects, mood, quality, and provide suggestions for improvement if applicable.
Iterations: 7

Give me a comprehensive multi-perspective analysis.
```

---

## 📊 Recording Your Test Results

### Test 1: Think Tool
- ⏱️ **Duration**: ___ seconds
- 📝 **Output Quality**: ⭐⭐⭐⭐⭐
- ✅ **Status**: PASS / FAIL
- 💬 **Notes**: _______________

### Test 2: Describe Image
- ⏱️ **Duration**: ___ seconds
- 📝 **Output Quality**: ⭐⭐⭐⭐⭐
- ✅ **Status**: PASS / FAIL
- 💬 **Notes**: _______________

### Test 3: Analyze Image
- ⏱️ **Duration**: ___ seconds
- 📝 **Output Quality**: ⭐⭐⭐⭐⭐
- ✅ **Status**: PASS / FAIL
- 💬 **Notes**: _______________

---

## 🐛 Troubleshooting

### Issue: Tools Not Appearing

**Solutions:**
1. Check `~/.cursor/mcp.json` file exists and has correct syntax
2. Verify absolute path to `.smithery/index.cjs` is correct
3. Restart Cursor IDE completely
4. Click "Refresh" button in MCP Settings

### Issue: API Key Error

**Solutions:**
1. Verify you've added your real Anthropic API key
2. Key should start with `sk-ant-`
3. Test key at: https://console.anthropic.com/
4. Ensure key has vision capabilities enabled

### Issue: Image URLs Not Working

**Solutions:**
1. Check internet connectivity
2. Try a different image URL
3. Ensure URL is publicly accessible (no authentication required)
4. Use HTTPS URLs (not HTTP)

### Issue: Local Images Not Found

**Solutions:**
1. Use absolute path: `C:/Users/Yomen/EveryoneVPN/claude/claude-vision-mcp/claude_vision/image.jpg`
2. Or relative path from project root: `claude_vision/image.jpg`
3. Verify file exists: `dir claude_vision`
4. Supported formats: JPEG, PNG, GIF, WebP

### Issue: Tool Calls Timing Out

**Solutions:**
1. Reduce iteration count (try 3 instead of 7)
2. Check Anthropic API status page
3. Verify API rate limits not exceeded
4. Try again in a few minutes

---

## 🎯 What Success Looks Like

After completing all three tests, you should have:

1. ✅ **Think Tool** provided intelligent, structured analysis
2. ✅ **Describe Image** accurately described an online image
3. ✅ **Analyze Image** performed multiple perspective analysis with synthesis
4. ✅ All tool calls completed without errors
5. ✅ Output quality was high and relevant

**If all tests pass, your MCP server is working perfectly! 🎉**

---

## 📝 Next Steps After Testing

1. **Use in Real Projects**: Start using these tools in your actual development workflow
2. **Customize Iterations**: Adjust iteration count based on your needs (3-15)
3. **Create Custom Prompts**: Develop prompts specific to your use cases
4. **Integrate with Workflows**: Combine with other MCP tools for powerful workflows
5. **Deploy to Smithery**: Make it available for hosted use

---

## 💡 Pro Tips

### For Best Results:

1. **Be Specific**: Provide clear context in your prompts
2. **Use Iterations Wisely**: 
   - 3-5 for quick insights
   - 7-10 for detailed analysis
   - 15 for comprehensive deep dives
3. **Combine Tools**: Use think + analyze_image together for design reviews
4. **Local Images**: Faster and more reliable than URLs
5. **Context Matters**: The more context you provide, the better the analysis

---

## 📚 Resources

- **Full Documentation**: See README.md
- **Setup Guide**: See SETUP_GUIDE.md
- **Deployment Guide**: See DEPLOYMENT_GUIDE.md
- **Test Prompts**: See TEST_PROMPTS.md

---

**Happy Testing! 🚀**
