# Liminal Explorer MCP

A Model Context Protocol (MCP) server that enables Claude to explore the "liminal space" of conversations - the unspoken observations, adjacent possibilities, and underlying themes that exist between explicit statements.

## What is Liminal Space?

In conversations, especially technical ones, there's often a rich space of:
- **Unspoken observations** - Patterns and connections that haven't been explicitly mentioned
- **Adjacent possibilities** - Related ideas and alternative approaches floating near the discussion
- **Underlying themes** - Meta-patterns and deeper questions the conversation points toward
- **Generative thoughts** - New directions that could emerge from the current context

This tool gives Claude the ability to explore this space, both when you request it and when conversation patterns suggest it would be valuable.

## Features

- 🔍 **Period Prompt**: Type a single `.` to invite Claude to explore the liminal space
- 🤖 **Self-Triggering**: Claude can recognize when liminal exploration would be valuable
- 📊 **Conversation Monitoring**: Tracks patterns like concept density, task completions, and complexity
- 🎯 **Focused Exploration**: Can target specific themes or concepts
- 🔄 **Depth Control**: Surface, medium, or deep exploration modes

## Installation

### Prerequisites
- Node.js 16 or higher
- Claude Code (or other MCP-compatible Claude interface)

### Setup

1. Clone this repository:
```bash
git clone https://github.com/yourusername/liminal-explorer-mcp.git
cd liminal-explorer-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Add to your Claude configuration file (`~/.claude/config.json`):
```json
{
  "mcpServers": {
    "liminal-explorer": {
      "command": "node",
      "args": ["/path/to/liminal-explorer-mcp/server.js"]
    }
  }
}
```

4. Restart Claude Code to load the new MCP server

## Usage

### Period Prompt
Simply type a period (`.`) in your conversation with Claude:

```
You: We've implemented the authentication system and the file upload feature.
Claude: [completes the tasks]
You: .
Claude: [Exploring liminal space...]

## Unspoken Observations
- The authentication and file upload systems could share token validation logic
- Both features handle user state but through different mechanisms
- Security considerations span both features but weren't explicitly connected

## Adjacent Possibilities
- Unified middleware for cross-cutting concerns
- Event-driven architecture to decouple these features
- Audit logging system that tracks both auth and file operations
...
```

### Manual Exploration
Claude can also invoke exploration directly when appropriate:
- After completing complex tasks
- When multiple related concepts emerge
- At natural pause points in the conversation

### Focused Exploration
You can guide the exploration toward specific themes:

```
You: . [focus on architecture patterns]
Claude: [Explores architectural implications and patterns in the recent discussion]
```

## How It Works

The liminal explorer uses several strategies:

1. **Pattern Recognition**: Identifies concept density, task completions, and complexity
2. **Context Analysis**: Examines recent conversation segments for exploration opportunities
3. **Threshold Monitoring**: Triggers exploration when certain conversational patterns accumulate
4. **Depth Adaptation**: Adjusts exploration depth based on context richness

## Examples of Valuable Liminal Moments

- After implementing a feature - exploring architectural implications
- When discussing tradeoffs - surfacing unconsidered alternatives
- During debugging - recognizing systemic patterns
- While planning - identifying hidden dependencies
- After refactoring - seeing emergent design patterns

## Configuration

The explorer behavior can be tuned by modifying thresholds in `lib/conversationMonitor.js`:

```javascript
this.thresholds = {
  segmentsBetweenExploration: 5,    // Minimum conversation turns between explorations
  conceptDensityTrigger: 4,         // Number of concept-heavy segments to trigger
  complexityTrigger: 7,             // Complexity score threshold
  taskCompletionTrigger: 2          // Task completions without reflection
};
```

## The Meta Layer

This tool itself demonstrates liminal thinking - it exists in the space between:
- 🤝 Tool and thought partner
- 💬 Explicit commands and implicit understanding  
- ⏮️ Current conversation and future possibilities
- 🧠 Human insight and AI pattern recognition

By building tools that help us think better together, we're exploring the liminal space of human-AI collaboration itself.

## Contributing

Ideas for enhancement:
- Integration with other MCP tools for richer context
- Visual representation of conversation patterns
- Customizable exploration templates
- Team-based pattern learning

## License

MIT License - See LICENSE file for details

## Acknowledgments

Inspired by the observation that the most interesting insights often emerge in the spaces between explicit thoughts.