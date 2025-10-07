# Test Prompts for Claude Vision MCP Server

## 🧪 Test 1: Deep Think Tool - Text Analysis

### Prompt:
```
Use the think tool to analyze the following:

"I'm building a real-time chat application that needs to support 100,000 concurrent users. 
Should I use WebSockets, Server-Sent Events (SSE), or HTTP polling? 
Consider scalability, browser compatibility, and infrastructure costs."

Provide a detailed analysis with pros and cons for each approach.
```

### Expected Output:
- Comprehensive comparison of WebSockets vs SSE vs polling
- Discussion of scalability considerations
- Infrastructure cost analysis
- Browser compatibility notes
- Recommendation based on context
- Best practices and pitfalls

---

## 🖼️ Test 2: Quick Image Description - URL Analysis

### Prompt:
```
Use the describe_image tool to analyze this image:

Image Source: https://picsum.photos/seed/test123/800/600
Focus: overall composition, colors, and mood

Provide a detailed description of what you see.
```

### Expected Output:
- Description of the image content
- Analysis of color palette
- Composition and layout details
- Mood and atmosphere
- Any notable elements

---

## 🔍 Test 3: Multi-Perspective Image Analysis - Local File

### Setup:
First, download a test image to the claude_vision folder.

### Prompt:
```
Use the analyze_image tool to perform multi-perspective analysis:

Image Source: claude_vision/test-image.jpg
Query: Analyze this image comprehensively, identifying all visual elements, design patterns, color usage, text content, and overall effectiveness. Suggest improvements if it's a design or UI element.
Iterations: 5

Provide detailed insights from multiple perspectives.
```

### Expected Output:
- 5 different analytical perspectives on the image
- Each iteration focusing on different aspects
- Comprehensive synthesis at the end
- Actionable insights and suggestions
- Technical details about the image

---

## 📊 Alternative Test 3 (If no local image available)

### Prompt:
```
Use the analyze_image tool with a URL:

Image Source: https://images.unsplash.com/photo-1557821552-17105176677c?w=800
Query: This is a website hero section. Analyze the design, typography, color scheme, visual hierarchy, and user experience. Provide recommendations for improvement.
Iterations: 7

Give me comprehensive design analysis from multiple perspectives.
```

### Expected Output:
- 7 detailed perspectives on the design
- Typography analysis
- Color psychology insights
- UX recommendations
- Visual hierarchy assessment
- Comprehensive design critique

---

## 🎯 Quick Test Script

If using TypeScript/JavaScript to test programmatically:

```typescript
// Test 1: Think Tool
await client.callTool('think', {
  query: 'Compare microservices vs monolithic architecture for a startup',
  context: 'Building a SaaS product with 5-person team'
});

// Test 2: Describe Image
await client.callTool('describe_image', {
  imageSource: 'https://picsum.photos/800/600',
  focus: 'colors and composition'
});

// Test 3: Analyze Image
await client.callTool('analyze_image', {
  imageSource: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
  query: 'Analyze this as a website design',
  iterations: 5
});
```

---

## ✅ Success Criteria

### Test 1 (Think Tool) Passes If:
- ✓ Returns intelligent analysis within 10-30 seconds
- ✓ Provides structured comparison
- ✓ Includes pros and cons
- ✓ Offers actionable recommendations
- ✓ No API errors

### Test 2 (Describe Image) Passes If:
- ✓ Successfully fetches and analyzes the image URL
- ✓ Returns detailed description
- ✓ Identifies colors and composition
- ✓ Completes within 15-45 seconds
- ✓ No network or API errors

### Test 3 (Analyze Image) Passes If:
- ✓ Completes all requested iterations (5 or 7)
- ✓ Each iteration provides unique perspective
- ✓ Final synthesis combines all insights
- ✓ Total time: 1-3 minutes (depending on iterations)
- ✓ No timeout or memory errors

---

## 🐛 Troubleshooting

If tests fail:

1. **API Key Issues**
   - Verify ANTHROPIC_API_KEY is set correctly
   - Test key at console.anthropic.com
   - Ensure key has vision capabilities

2. **Image Access Issues**
   - For URLs: Check internet connectivity
   - For local files: Verify absolute path
   - Supported formats: JPEG, PNG, GIF, WebP

3. **Timeout Issues**
   - Reduce iteration count (try 3 instead of 7)
   - Check API rate limits
   - Verify network stability

4. **Server Not Found**
   - Restart Cursor IDE
   - Refresh MCP settings
   - Check mcp.json syntax

---

## 📝 Testing Notes

Document your test results:

- **Test 1 Duration**: ___ seconds
- **Test 1 Quality**: ⭐⭐⭐⭐⭐ (1-5 stars)
- **Test 2 Duration**: ___ seconds
- **Test 2 Quality**: ⭐⭐⭐⭐⭐
- **Test 3 Duration**: ___ seconds
- **Test 3 Quality**: ⭐⭐⭐⭐⭐

**Overall Assessment**: ________________
