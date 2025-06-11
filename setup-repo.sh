#!/bin/bash

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Liminal Explorer MCP server for Claude

- Period prompt (.) functionality
- Automatic conversation pattern detection
- Self-triggering exploration capability
- MCP server integration"

# Instructions for next steps
echo "
Repository initialized! Now:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it: liminal-explorer-mcp
   - Description: 'MCP server for exploring liminal conversation spaces with Claude'
   - Make it public
   - DON'T initialize with README (we already have one)

2. After creating, run these commands:
   git remote add origin https://github.com/YOUR_USERNAME/liminal-explorer-mcp.git
   git branch -M main
   git push -u origin main

Replace YOUR_USERNAME with your GitHub username.
"