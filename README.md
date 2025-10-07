# Claude Deep Think MCP Server

A powerful Model Context Protocol (MCP) server that provides deep analytical thinking and strategic guidance using Anthropic's Claude AI.

## 🌟 Features

### Deep Think & Analysis (`think`)
Provides intelligent insights, suggestions, and strategic guidance based on conversation context. Perfect for:
- Understanding complex requirements
- Identifying potential pitfalls and best practices
- Offering alternative approaches
- Extracting key information for efficient task completion
- Strategic decision-making
- Problem-solving and architecture planning

## 📋 Prerequisites

- Node.js 18+ or Bun
- Anthropic Claude API key ([Get one here](https://console.anthropic.com/))
- MCP-compatible client (Cursor IDE, Claude Desktop, etc.)

## 🚀 Quick Start

### 1. Installation

```bash
cd claude-vision-mcp
bun install
# or
npm install
```

### 2. Configuration

The API key is configured when connecting to the MCP server (see Docker or Cursor setup below).

### 3. Build

```bash
bun run build
# or
npm run build
```

## 🐳 Docker Setup (Recommended)

### Quick Start

```bash
cd claude-vision-mcp

# Create .env file with your API key
echo "ANTHROPIC_API_KEY=your-key-here" > .env
echo "CLAUDE_MODEL=claude-sonnet-4-20250514" >> .env

# Start container
docker-compose up -d

# Check status
docker ps | grep claude-vision
```

The container will auto-restart when Docker Desktop launches.

### Docker Configuration

The server runs on `http://localhost:8080/mcp` with the following environment variables:
- `ANTHROPIC_API_KEY` - Your Claude API key (required)
- `CLAUDE_MODEL` - Model to use (default: claude-sonnet-4-20250514)

## 🔧 Usage in Cursor IDE

### Docker Connection (Recommended)

Add to your `~/.cursor/mcp.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "Claude Deep Think": {
      "url": "http://localhost:8080/mcp?apiKey=YOUR_API_KEY&model=claude-sonnet-4-20250514"
    }
  }
}
```

### Tool Usage

Once configured, the Composer Agent can use the tool:

**Deep Analysis:**
```
Use the think tool to analyze the best approach for implementing user authentication with OAuth2
```

**Strategic Planning:**
```
Use the think tool to evaluate microservices vs monolithic architecture for a SaaS platform
```

**Problem Solving:**
```
Use the think tool to identify potential issues with this database schema design
```

## 📚 Examples

### Example 1: Analyzing Technical Decisions

```
Use the think tool to analyze:

"I'm building a real-time chat application. Should I use WebSockets, SSE, or HTTP polling?"

Context: Need to support 100K concurrent users, prioritize ease of implementation
```

**Expected Output**: Comprehensive comparison with pros, cons, and recommendations

### Example 2: Architecture Planning

```
Use the think tool to evaluate:

"What's the best way to structure a multi-tenant SaaS application?"

Context: PostgreSQL database, Node.js backend, 50-100 tenants expected
```

### Example 3: Best Practices

```
Use the think tool:

"Review this approach to handling user sessions in a Next.js app"

Context: Using JWT tokens, storing in localStorage, concerned about security
```

## 🛠️ Development

### Project Structure

```
claude-vision-mcp/
├── src/
│   └── index.ts              # Main MCP server implementation
├── .smithery/
│   └── index.cjs            # Built server (generated)
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── smithery.yaml            # Smithery deployment config
├── Dockerfile               # Docker container definition
├── docker-compose.yml       # Docker Compose configuration
└── README.md               # This file
```

### Available Scripts

- `bun run build` / `npm run build` - Compile TypeScript
- `bun run dev` / `npm run dev` - Development server with hot reload

## 🔒 Security Best Practices

1. **Never commit API keys** - Always use environment variables
2. **Use .gitignore** - Ensure `.env` files are ignored
3. **Rotate keys regularly** - Update API keys periodically
4. **Review tool calls** - Keep manual approval enabled in Cursor
5. **Use development environments** - Test with non-production data

## 📦 Docker Management

```bash
# Start container
docker-compose up -d

# View logs
docker logs claude-vision-mcp-server -f

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## 🐛 Troubleshooting

### Issue: Server not connecting in Cursor

**Solutions:**
1. Verify Docker container is running: `docker ps | grep claude-vision`
2. Check container logs: `docker logs claude-vision-mcp-server`
3. Restart Cursor IDE completely
4. Verify API key in URL is correct

### Issue: API key errors

**Solutions:**
1. Ensure key starts with `sk-ant-`
2. Test key at: https://console.anthropic.com/
3. Check environment variables in container
4. Verify URL parameter format

### Issue: Container won't start

**Solutions:**
```bash
# Check logs
docker logs claude-vision-mcp-server

# Verify .env file
cat .env

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build
```

## 💡 Performance

With Bun runtime:
- ⚡ 4x faster package installs
- ⚡ 3-4x faster script execution  
- 📦 Smaller Docker images
- 🚀 Faster cold starts

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the [MCP Documentation](https://modelcontextprotocol.io/)

## 🙏 Acknowledgments

- Built with [Anthropic Claude API](https://www.anthropic.com/)
- Powered by [Model Context Protocol](https://modelcontextprotocol.io/)
- Containerized with [Bun](https://bun.sh/)