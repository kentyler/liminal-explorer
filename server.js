#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const LiminalExplorer = require('./lib/liminalExplorer');
const ConversationMonitor = require('./lib/conversationMonitor');

// Initialize components
const explorer = new LiminalExplorer();
const monitor = new ConversationMonitor();

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

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Helper functions
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