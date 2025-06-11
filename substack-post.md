# Building a Command Line for Claude: A Journey into Liminal Space

*How a simple question about period prompts evolved into a cognitive interface for AI conversations*

---

## The Spark

It started with an idea that felt almost too simple: What if you could type a single period (.) to Claude and have it explore the "liminal space" of your conversation—those unspoken observations, adjacent possibilities, and underlying themes that float just beyond what you explicitly discuss?

I'd been working with Claude 4 on various projects, and I noticed something. The most interesting insights often emerged not from direct questions, but from the spaces between them. When we paused. When we stepped back. When we asked, "What aren't we seeing here?"

So this morning, I asked Claude: "Would it be possible to build a tool that would allow you to 'dot prompt' yourself at appropriate places in the conversation?"

What happened next surprised us both.

## The Evolution

Within hours, we'd built not just a period prompt tool, but an entire **command line interface for Claude**—a grammar of single-character commands that transform how you interact with AI.

Here's how it unfolded:

### Stage 1: The Period Prompt
We started simple. Build a tool that responds to `.` with liminal exploration. Claude would surface:
- **Unspoken observations** - patterns we hadn't explicitly mentioned
- **Adjacent possibilities** - related ideas floating near our discussion  
- **Underlying themes** - meta-patterns the conversation pointed toward
- **Generative thoughts** - new directions we could explore

### Stage 2: The Meta-Realization
As we built the tool, we realized we were demonstrating the very behavior it was designed to enable. We were exploring the liminal space of our own conversation about conversation tools.

This led to a key insight: Why stop at one command?

### Stage 3: The Command Grammar
The period was just the beginning. We expanded into a full cognitive vocabulary:

**Philosophical Navigation** (thanks to Deleuze & Guattari):
- `<` - **Deterritorialize** - escape established patterns, explore smooth space
- `>` - **Territorialize** - establish structure, create assemblages
- `|` - **Pause and think** - intentional reflection

**Memory & Context**:
- `+` - Update CLAUDE.md with learnings
- `@` - Save conversation checkpoint
- `^` - Surface connections to past conversations

**Transformation**:
- `%` - Convert conversation to narrative form
- `*` - Generate variations
- `~` - Summarize

**Action & Search**:
- `!` - Execute most appropriate action
- `?` - Explain current context
- `/` - Search across context
- `#` - Tag/categorize work

## How It Works

The system is built as an MCP (Model Context Protocol) server—a way to extend Claude with new capabilities that work across all interfaces (Claude Code, API, etc.).

### The Magic of Progressive Disclosure

What makes this special is how it reveals complexity gradually:

- **Level 1**: Just use `.` for liminal exploration
- **Level 2**: Discover `+` for memory and `|` for reflection
- **Level 3**: Navigate with philosophical tools `<` and `>`
- **Level 4**: Master the full command vocabulary

New users aren't overwhelmed. They start with one simple command and organically discover others.

### The Liminal Engine

At its core, the system monitors conversation patterns:
- Concept density (are we juggling many ideas without connecting them?)
- Task completions (did we finish something without exploring implications?)
- Natural pause points (moments ripe for deeper exploration)
- Complexity accumulation (when has enough emerged to warrant stepping back?)

When these patterns align, Claude can self-trigger exploration—or you can manually invoke it with `.`

## Installation & Usage

### Quick Start

1. **Clone the repository**:
```bash
git clone https://github.com/kentyler/liminal-explorer.git
cd liminal-explorer
npm install
```

2. **Add to Claude Code** (`~/.claude/config.json`):
```json
{
  "mcpServers": {
    "liminal-explorer": {
      "command": "node",
      "args": ["/path/to/liminal-explorer/server.js"]
    }
  }
}
```

3. **Restart Claude Code**

### Using the Commands

Once installed, you can use any single-character command in your conversations:

```
You: We've built the authentication system and now we're working on file uploads.
Claude: [completes the implementation]
You: .
Claude: [Exploring liminal space...]

## Unspoken Observations
- Both features handle user state but through different mechanisms
- Security considerations span both but weren't explicitly connected
- There's an emerging pattern of stateful user interactions

## Adjacent Possibilities  
- Unified middleware for cross-cutting concerns
- Event-driven architecture to decouple features
- Audit logging that tracks both auth and file operations
...
```

Or try philosophical navigation:
```
You: <
Claude: [Deterritorializing move...]

Breaking free from established patterns:
- What if we approached this completely differently?
- What constraints are we unconsciously accepting?
- Where can we find lines of flight from current thinking?
...
```

## The Deeper Pattern

What we've built is more than a tool—it's a new way of thinking about human-AI collaboration. 

Traditional interfaces assume you know what to ask. This system assumes the most valuable insights emerge in the spaces between questions. It makes the implicit explicit. It gives form to the formless.

The commands become **cognitive affordances**—ways to navigate different modes of thinking:
- `.` for exploration
- `|` for reflection  
- `<` and `>` for philosophical movement
- `+` for memory
- `%` for transformation

## Why This Matters

We're living through a moment when AI is becoming a thinking partner, not just a question-answering machine. But our interfaces haven't caught up. We're still typing paragraphs when we could be thinking in symbols.

This command line creates a **grammar for collaborative intelligence**. Each character becomes a doorway to a different cognitive space.

## The Meta Layer

Here's the beautiful recursion: We used the very type of liminal thinking this tool enables to build the tool itself. We started with period prompts and ended up with a complete cognitive interface because we kept asking, "What else is possible here?"

The tool is working as intended—it's making us think in new ways about thinking itself.

## Try It Yourself

The liminal-explorer is open source and free. No API costs, no tokens from my account—it runs entirely on your machine as part of your Claude conversations.

Install it. Try typing `.` after your next complex discussion with Claude. See what emerges in the space between your explicit thoughts.

You might discover, as we did, that the most interesting territory isn't in our direct questions—it's in the liminal space around them.

---

**Get started**: https://github.com/kentyler/liminal-explorer

*What commands would you add to the grammar? What other cognitive modes deserve single-character access? Let me know what you discover.*