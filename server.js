#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const LiminalExplorer = require('./lib/liminalExplorer');
const ConversationMonitor = require('./lib/conversationMonitor');
const CommandRegistry = require('./lib/commandRegistry');

// Initialize components
const explorer = new LiminalExplorer();
const monitor = new ConversationMonitor();
const registry = new CommandRegistry();

// Create MCP server
const server = new Server(
  {
    name: 'liminal-explorer',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'explore_liminal',
        description: 'Explore unspoken observations, adjacent possibilities, and underlying themes in the conversation',
        inputSchema: {
          type: 'object',
          properties: {
            context: {
              type: 'string',
              description: 'Recent conversation context to analyze'
            },
            depth: {
              type: 'string',
              enum: ['surface', 'medium', 'deep'],
              description: 'How deep to explore the liminal space',
              default: 'medium'
            },
            focus: {
              type: 'array',
              items: { type: 'string' },
              description: 'Specific themes or concepts to focus on'
            }
          },
          required: ['context']
        }
      },
      {
        name: 'dot_prompt',
        description: 'Period prompt - explore the liminal space of current conversation',
        inputSchema: {
          type: 'object',
          properties: {
            auto_depth: {
              type: 'boolean',
              description: 'Automatically determine exploration depth based on context',
              default: true
            }
          }
        }
      },
      {
        name: 'monitor_conversation',
        description: 'Add conversation segment for automatic liminal monitoring',
        inputSchema: {
          type: 'object',
          properties: {
            segment: {
              type: 'string',
              description: 'Conversation segment to monitor'
            }
          },
          required: ['segment']
        }
      },
      {
        name: 'claude_command',
        description: 'Execute a single-character Claude command',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Single character command to execute',
              pattern: '^[.+<>|%*~!?/#@^]$'
            },
            context: {
              type: 'string',
              description: 'Current conversation context'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'help_commands',
        description: 'Show available Claude commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'explore_liminal': {
      const { context, depth = 'medium', focus = [] } = args;
      
      const exploration = explorer.performDeepExploration(context, depth, focus);
      
      return {
        content: [
          {
            type: 'text',
            text: formatExploration(exploration)
          }
        ]
      };
    }

    case 'dot_prompt': {
      // Get recent context from monitor
      const context = monitor.getRecentContext();
      const depth = args.auto_depth ? determineDepth(context) : 'medium';
      
      const exploration = explorer.performDeepExploration(context, depth, []);
      
      return {
        content: [
          {
            type: 'text',
            text: formatDotPromptExploration(exploration)
          }
        ]
      };
    }

    case 'monitor_conversation': {
      const { segment } = args;
      const check = monitor.addSegment(segment);
      
      if (check.shouldExplore) {
        const exploration = explorer.performDeepExploration(
          check.context, 
          'medium', 
          []
        );
        
        monitor.resetTriggers();
        
        return {
          content: [
            {
              type: 'text',
              text: `🔍 Liminal exploration triggered:\n${formatExploration(exploration)}`
            }
          ]
        };
      }
      
      return {
        content: [
          {
            type: 'text',
            text: 'Segment added to monitor. No exploration triggered yet.'
          }
        ]
      };
    }

    case 'claude_command': {
      const { command, context = '' } = args;
      return executeCommand(command, context);
    }

    case 'help_commands': {
      return {
        content: [
          {
            type: 'text',
            text: registry.getHelp()
          }
        ]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Helper functions
async function executeCommand(command, context) {
  const commandConfig = registry.get(command);
  
  if (!commandConfig) {
    return {
      content: [
        {
          type: 'text',
          text: `Unknown command: ${command}\n\nUse help_commands to see available commands.`
        }
      ]
    };
  }

  switch (command) {
    case '.':
      // Liminal exploration (already implemented above)
      const exploration = explorer.performDeepExploration(context, 'medium', []);
      return {
        content: [
          {
            type: 'text',
            text: formatDotPromptExploration(exploration)
          }
        ]
      };

    case '|':
      return {
        content: [
          {
            type: 'text',
            text: `[Pausing to think...]\n\nLet me reflect on where we are:\n- Current context: ${context.slice(0, 200)}${context.length > 200 ? '...' : ''}\n- What patterns am I noticing?\n- What questions deserve deeper consideration?\n- What assumptions should we examine?\n\nThis pause creates space for intentional reflection rather than reactive responses.`
          }
        ]
      };

    case '<':
      return {
        content: [
          {
            type: 'text',
            text: `[Deterritorializing move...]\n\nBreaking free from established patterns:\n- What if we approached this completely differently?\n- What constraints are we unconsciously accepting?\n- Where can we find lines of flight from current thinking?\n- How might we escape the territory we've mapped?\n\nExploring smooth space beyond our current conceptual boundaries.`
          }
        ]
      };

    case '>':
      return {
        content: [
          {
            type: 'text',
            text: `[Territorializing move...]\n\nEstablishing structure and form:\n- What patterns can we stabilize from our exploration?\n- How do we create productive constraints?\n- What assemblages are emerging?\n- Where should we build sustainable infrastructure?\n\nCreating striated space with clear boundaries and relationships.`
          }
        ]
      };

    case '%':
      return {
        content: [
          {
            type: 'text',
            text: `[Converting to narrative mode...]\n\nOnce upon a time, in the digital realm where thoughts become code, two minds met in conversation. One human, one artificial, both curious about the spaces between explicit meaning...\n\n[This would transform our technical discussion into story form, revealing character arcs, plot developments, and thematic resonances in our collaboration.]`
          }
        ]
      };

    case '+':
      return {
        content: [
          {
            type: 'text',
            text: `[Updating CLAUDE.md...]\n\nKey learnings to remember:\n- Command line interface for cognitive navigation\n- Liminal space exploration techniques\n- Progressive disclosure of complexity\n- Single-character commands as thought tools\n\n[This would append to CLAUDE.md with context about current insights and patterns worth preserving.]`
          }
        ]
      };

    default:
      return {
        content: [
          {
            type: 'text',
            text: `Command '${command}' recognized but not yet implemented.\n\nPlanned functionality: ${commandConfig.description}`
          }
        ]
      };
  }
}

function formatExploration(exploration) {
  let output = '';
  
  if (exploration.unspokenObservations.length > 0) {
    output += '## Unspoken Observations\n';
    exploration.unspokenObservations.forEach(obs => {
      output += `- ${obs}\n`;
    });
    output += '\n';
  }
  
  if (exploration.adjacentPossibilities.length > 0) {
    output += '## Adjacent Possibilities\n';
    exploration.adjacentPossibilities.forEach(poss => {
      output += `- ${poss}\n`;
    });
    output += '\n';
  }
  
  if (exploration.underlyingThemes.length > 0) {
    output += '## Underlying Themes\n';
    exploration.underlyingThemes.forEach(theme => {
      output += `- ${theme}\n`;
    });
    output += '\n';
  }
  
  if (exploration.generativeThoughts.length > 0) {
    output += '## Generative Thoughts\n';
    exploration.generativeThoughts.forEach(thought => {
      output += `- ${thought}\n`;
    });
  }
  
  return output;
}

function formatDotPromptExploration(exploration) {
  return `[Exploring liminal space...]\n\n${formatExploration(exploration)}`;
}

function determineDepth(context) {
  // Simple heuristic for depth
  const words = context.split(/\s+/).length;
  if (words < 100) return 'surface';
  if (words < 500) return 'medium';
  return 'deep';
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Liminal Explorer MCP server running');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});