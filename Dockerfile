# Use Bun official image
FROM oven/bun:1-alpine

# Set working directory
WORKDIR /app

# Copy package files and source code
COPY package.json bun.lock* ./
COPY src ./src
COPY tsconfig.json smithery.yaml ./

# Install dependencies (this will auto-build via prepare script)
RUN bun install --frozen-lockfile

# Copy remaining files
COPY . .

# Remove dev dependencies to reduce image size  
RUN bun install --frozen-lockfile --production

# Expose port (default MCP port)
EXPOSE 8080

# Set environment variable for port
ENV PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD bun -e "require('http').get('http://localhost:8080/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start the server
CMD ["bun", "run", ".smithery/index.cjs"]
