#!/bin/bash

# Claude Vision MCP Server - Test Runner
# This script runs all three capability tests

echo "═══════════════════════════════════════════════════════════════"
echo "  🧪 Claude Vision MCP Server - Test Runner"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check for API key
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "❌ ERROR: ANTHROPIC_API_KEY environment variable not set"
  echo ""
  echo "Please set your API key:"
  echo "  export ANTHROPIC_API_KEY='sk-ant-your-key-here'"
  echo ""
  echo "Or create a .env file with:"
  echo "  ANTHROPIC_API_KEY=sk-ant-your-key-here"
  echo ""
  exit 1
fi

echo "✓ API Key detected"
echo "✓ Running tests..."
echo ""

# Compile TypeScript test file
echo "📦 Compiling test script..."
npx tsx test-server.ts

echo ""
echo "✅ Tests complete!"
