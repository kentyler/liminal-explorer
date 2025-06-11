# Liminal Explorer MCP

A Model Context Protocol (MCP) server that provides a **command line interface for Claude** - enabling liminal space exploration, philosophical navigation, and cognitive tools through single-character commands.

> **💡 Using ChatGPT/OpenAI?** Check out [liminal-explorer-functions](https://github.com/kentyler/liminal-explorer-functions) - the same cognitive tools implemented with OpenAI function calling.

## What is Liminal Space?

In conversations, especially technical ones, there's often a rich space of:
- **Unspoken observations** - Patterns and connections that haven't been explicitly mentioned
- **Adjacent possibilities** - Related ideas and alternative approaches floating near the discussion
- **Underlying themes** - Meta-patterns and deeper questions the conversation points toward
- **Generative thoughts** - New directions that could emerge from the current context

This tool gives Claude the ability to explore this space, both when you request it and when conversation patterns suggest it would be valuable.

## Features

### The Claude Command Line
Single-character commands for cognitive navigation:

**Cognitive Navigation**
- `.` - Explore liminal space (unspoken observations, adjacent possibilities)
- `<` - Deterritorialize (escape patterns, explore smooth space)  
- `>` - Territorialize (establish structure, create assemblages)
- `|` - Pause and think (intentional reflection)

**Memory & Context**
- `+` - Update CLAUDE.md with learnings
- `@` - Save conversation checkpoint
- `^` - Surface connections to past conversations

**Transformation**
- `%` - Convert conversation to narrative form
- `*` - Generate variations of last response
- `~` - Summarize conversation

**Action & Search**
- `!` - Execute most appropriate action
- `?` - Explain current context
- `/` - Search across available context
- `#` - Tag/categorize current work

### Progressive Disclosure
- **Level 1**: Just use `.` for liminal exploration
- **Level 2**: Discover memory tools like `+` and `|`
- **Level 3**: Navigate with philosophical commands `<` and `>`
- **Level 4**: Full command fluency

## Installation Options

### Option 1: Browser Extension (No Coding Required!) 🎉

**For Claude.ai users** - Install the visual browser extension:

1. **Download** the [browser extension folder](./browser-extension) or [ZIP file](https://github.com/kentyler/liminal-explorer/releases)
2. **Open Chrome/Edge/Brave** → Extensions → Enable Developer Mode
3. **Click "Load Unpacked"** → Select the extension folder
4. **Visit Claude.ai** and see the command buttons!

[📖 Detailed Extension Guide](./browser-extension/README.md)

### Option 2: MCP Server (For Claude Code)

#### Prerequisites
- Node.js 16 or higher
- Claude Code (or other MCP-compatible Claude interface)

#### Setup

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