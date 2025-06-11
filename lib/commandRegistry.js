/**
 * Command Registry for Claude Command Line
 * 
 * Single-character commands that transform how we interact with Claude
 */

class CommandRegistry {
  constructor() {
    this.commands = new Map();
    this.initializeCommands();
  }

  initializeCommands() {
    // Cognitive Navigation
    this.register('.', {
      name: 'explore_liminal',
      description: 'Explore unspoken observations and adjacent possibilities',
      category: 'navigation'
    });

    this.register('<', {
      name: 'deterritorialize',
      description: 'Make a deterritorializing move - escape established patterns, explore smooth space',
      category: 'navigation'
    });

    this.register('>', {
      name: 'territorialize',
      description: 'Make a territorializing move - establish structure, create striated space',
      category: 'navigation'
    });

    // Memory & Context
    this.register('+', {
      name: 'update_claude_md',
      description: 'Update CLAUDE.md with learnings from current conversation',
      category: 'memory'
    });

    this.register('@', {
      name: 'checkpoint',
      description: 'Save conversation checkpoint',
      category: 'memory'
    });

    this.register('^', {
      name: 'surface_connections',
      description: 'Surface related past conversations',
      category: 'memory'
    });

    // Transformation
    this.register('%', {
      name: 'narrative_mode',
      description: 'Convert conversation to story form',
      category: 'transformation'
    });

    this.register('*', {
      name: 'generate_variations',
      description: 'Generate variations of last response',
      category: 'transformation'
    });

    this.register('~', {
      name: 'summarize',
      description: 'Summarize conversation so far',
      category: 'transformation'
    });

    // Action & Reflection
    this.register('|', {
      name: 'pause_and_think',
      description: 'Pause and think about current situation',
      category: 'reflection'
    });

    this.register('!', {
      name: 'execute',
      description: 'Execute most appropriate action',
      category: 'action'
    });

    this.register('?', {
      name: 'explain_context',
      description: 'Explain current context and state',
      category: 'action'
    });

    this.register('/', {
      name: 'search',
      description: 'Search across all available context',
      category: 'action'
    });

    this.register('#', {
      name: 'tag',
      description: 'Tag or categorize current work',
      category: 'action'
    });
  }

  register(char, config) {
    this.commands.set(char, config);
  }

  get(char) {
    return this.commands.get(char);
  }

  getByCategory(category) {
    return Array.from(this.commands.entries())
      .filter(([_, config]) => config.category === category)
      .map(([char, config]) => ({ char, ...config }));
  }

  getAllCommands() {
    return Array.from(this.commands.entries())
      .map(([char, config]) => ({ char, ...config }));
  }

  getHelp() {
    const categories = {
      navigation: 'Cognitive Navigation',
      memory: 'Memory & Context',
      transformation: 'Transformation',
      reflection: 'Reflection',
      action: 'Action & Search'
    };

    let help = '# Claude Command Line\n\n';
    
    Object.entries(categories).forEach(([key, title]) => {
      help += `## ${title}\n`;
      const commands = this.getByCategory(key);
      commands.forEach(cmd => {
        help += `- \`${cmd.char}\` - ${cmd.description}\n`;
      });
      help += '\n';
    });

    return help;
  }
}

module.exports = CommandRegistry;