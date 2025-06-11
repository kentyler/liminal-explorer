/**
 * Claude.ai Liminal Explorer - Content Script
 * 
 * Adds cognitive navigation buttons and period prompt detection to Claude.ai interface
 */

class ClaudeLiminalExtension {
  constructor() {
    this.commandButtons = new Map();
    this.isActive = false;
    this.init();
  }

  init() {
    console.log('🧠 Liminal Explorer extension loaded for Claude.ai');
    
    // Wait for Claude interface to load
    this.waitForClaudeInterface();
    
    // Listen for messages from popup/background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggle') {
        this.toggle();
      } else if (request.action === 'executeCommand') {
        this.executeCommand(request.command);
      }
    });
  }

  waitForClaudeInterface() {
    const checkForInterface = () => {
      // Claude.ai uses different selectors - look for the input area
      const chatInput = document.querySelector('div[contenteditable="true"]') ||
                       document.querySelector('textarea[placeholder*="Talk to Claude"]') ||
                       document.querySelector('div[data-testid="chat-input"]');
      
      const chatContainer = document.querySelector('main') || 
                           document.querySelector('[role="main"]') ||
                           document.querySelector('.conversation');
      
      if (chatInput && chatContainer) {
        this.setupInterface();
      } else {
        setTimeout(checkForInterface, 1000);
      }
    };
    
    checkForInterface();
  }

  setupInterface() {
    this.addCommandPanel();
    this.addInputHandler();
    this.addStyles();
  }

  addCommandPanel() {
    // Find the input container in Claude.ai
    const chatInput = document.querySelector('div[contenteditable="true"]') ||
                     document.querySelector('textarea[placeholder*="Talk to Claude"]');
    
    if (!chatInput) return;

    const inputContainer = chatInput.closest('div');
    if (!inputContainer || document.getElementById('liminal-command-panel')) return;

    // Create command panel with Claude.ai styling
    const panel = document.createElement('div');
    panel.id = 'liminal-command-panel';
    panel.innerHTML = `
      <div class="liminal-header">
        <span>🧠 Cognitive Navigation</span>
        <button id="liminal-toggle" class="liminal-toggle">○</button>
      </div>
      <div class="liminal-commands" id="liminal-commands">
        <div class="command-row">
          <div class="command-group">
            <span class="group-label">Navigate</span>
            <button class="command-btn" data-command="." title="Explore liminal space">.</button>
            <button class="command-btn" data-command="|" title="Pause and think">|</button>
            <button class="command-btn" data-command="<" title="Deterritorialize">&lt;</button>
            <button class="command-btn" data-command=">" title="Territorialize">&gt;</button>
          </div>
          <div class="command-group">
            <span class="group-label">Transform</span>
            <button class="command-btn" data-command="%" title="Narrative mode">%</button>
            <button class="command-btn" data-command="*" title="Generate variations">*</button>
            <button class="command-btn" data-command="~" title="Summarize">~</button>
          </div>
        </div>
        <div class="command-row">
          <div class="command-group">
            <span class="group-label">Memory</span>
            <button class="command-btn" data-command="+" title="Update memory">+</button>
            <button class="command-btn" data-command="@" title="Checkpoint">@</button>
            <button class="command-btn" data-command="^" title="Surface connections">^</button>
          </div>
          <div class="command-group">
            <span class="group-label">Action</span>
            <button class="command-btn" data-command="!" title="Execute">!</button>
            <button class="command-btn" data-command="?" title="Explain context">?</button>
            <button class="command-btn" data-command="/" title="Search">/</button>
            <button class="command-btn" data-command="#" title="Tag">#</button>
          </div>
        </div>
      </div>
    `;

    // Insert panel above input (Claude.ai has different structure)
    const parentContainer = inputContainer.parentElement;
    if (parentContainer) {
      parentContainer.insertBefore(panel, inputContainer);
    }

    // Add event listeners
    document.getElementById('liminal-toggle').addEventListener('click', () => this.toggle());
    
    document.querySelectorAll('.command-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const command = e.target.dataset.command;
        this.executeCommand(command);
      });
    });
  }

  addInputHandler() {
    const chatInput = document.querySelector('div[contenteditable="true"]') ||
                     document.querySelector('textarea[placeholder*="Talk to Claude"]');
    
    if (!chatInput) return;

    chatInput.addEventListener('keydown', (e) => {
      const text = chatInput.textContent || chatInput.value || '';
      
      // Detect period prompt followed by Enter
      if (e.key === 'Enter' && text.trim() === '.') {
        e.preventDefault();
        this.executeCommand('.');
        return;
      }

      // Detect other single-character commands
      const singleCharCommands = ['|', '<', '>', '%', '*', '~', '+', '@', '^', '!', '?', '/', '#'];
      if (e.key === 'Enter' && singleCharCommands.includes(text.trim())) {
        e.preventDefault();
        this.executeCommand(text.trim());
        return;
      }
    });
  }

  executeCommand(command) {
    const chatInput = document.querySelector('div[contenteditable="true"]') ||
                     document.querySelector('textarea[placeholder*="Talk to Claude"]');
    
    if (!chatInput) return;

    // Get recent conversation context
    const context = this.getConversationContext();
    
    // Create command message
    const commandMessage = this.formatCommandMessage(command, context);
    
    // Insert into chat input
    if (chatInput.contentEditable === 'true') {
      // For contenteditable div
      chatInput.textContent = commandMessage;
      // Trigger input events
      chatInput.dispatchEvent(new Event('input', { bubbles: true }));
      chatInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // For textarea
      chatInput.value = commandMessage;
      chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    chatInput.focus();
    
    // Optional: Auto-send after brief delay
    setTimeout(() => {
      // Look for Claude.ai send button
      const sendButton = document.querySelector('button[type="submit"]') ||
                        document.querySelector('button[aria-label*="Send"]') ||
                        document.querySelector('svg[data-icon="send"]')?.closest('button') ||
                        document.querySelector('button:last-of-type');
      
      if (sendButton && !sendButton.disabled) {
        sendButton.click();
      }
    }, 500);
  }

  getConversationContext() {
    // Claude.ai conversation structure
    const messages = document.querySelectorAll('[data-testid*="message"]') ||
                     document.querySelectorAll('.message') ||
                     document.querySelectorAll('div[role="article"]');
    
    const recentMessages = Array.from(messages).slice(-3); // Last 3 exchanges
    
    return recentMessages.map(msg => {
      const text = msg.textContent || '';
      return text.slice(0, 200); // Truncate for context
    }).join('\n\n');
  }

  formatCommandMessage(command, context) {
    const commandDescriptions = {
      '.': 'Explore the liminal space of our conversation - surface unspoken observations, adjacent possibilities, and underlying themes',
      '|': 'Pause and think - reflect on our current discussion and consider what deserves deeper attention',
      '<': 'Make a deterritorializing move - break free from established patterns and explore new conceptual territory',
      '>': 'Make a territorializing move - establish structure and create productive constraints from our exploration',
      '%': 'Convert our conversation to narrative form - tell the story of our collaboration',
      '*': 'Generate variations of your last response - explore alternative approaches',
      '~': 'Summarize our conversation so far - distill key insights and patterns',
      '+': 'Update your persistent memory with key learnings from our discussion',
      '@': 'Create a checkpoint - mark this moment for future reference',
      '^': 'Surface connections to previous conversations or related topics',
      '!': 'Execute the most appropriate action based on our current context',
      '?': 'Explain the current context and state of our discussion',
      '/': 'Search across available context for relevant information',
      '#': 'Tag or categorize our current work for future organization'
    };

    return `${command}

${commandDescriptions[command] || 'Execute cognitive navigation command'}

Recent context: ${context.slice(0, 300)}...`;
  }

  toggle() {
    this.isActive = !this.isActive;
    const panel = document.getElementById('liminal-commands');
    const toggle = document.getElementById('liminal-toggle');
    
    if (panel && toggle) {
      panel.style.display = this.isActive ? 'block' : 'none';
      toggle.textContent = this.isActive ? '●' : '○';
      toggle.title = this.isActive ? 'Hide commands' : 'Show commands';
    }
  }

  addStyles() {
    if (document.getElementById('liminal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'liminal-styles';
    styles.textContent = `
      #liminal-command-panel {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        margin: 8px 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      @media (prefers-color-scheme: dark) {
        #liminal-command-panel {
          background: #1f2937;
          border-color: #374151;
        }
      }
      
      .liminal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px 12px 0 0;
        color: white;
        font-size: 13px;
        font-weight: 600;
      }
      
      .liminal-toggle {
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        cursor: pointer;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .liminal-toggle:hover {
        background: rgba(255,255,255,0.3);
      }
      
      .liminal-commands {
        padding: 16px;
        display: none;
      }
      
      .command-row {
        display: flex;
        gap: 20px;
        margin-bottom: 12px;
      }
      
      .command-row:last-child {
        margin-bottom: 0;
      }
      
      .command-group {
        flex: 1;
      }
      
      .group-label {
        display: block;
        color: #6b7280;
        font-size: 10px;
        font-weight: 600;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      @media (prefers-color-scheme: dark) {
        .group-label {
          color: #9ca3af;
        }
      }
      
      .command-btn {
        background: #ffffff;
        border: 1px solid #d1d5db;
        color: #374151;
        border-radius: 6px;
        width: 28px;
        height: 28px;
        margin: 2px;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      
      @media (prefers-color-scheme: dark) {
        .command-btn {
          background: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
        }
      }
      
      .command-btn:hover {
        background: #667eea;
        border-color: #667eea;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      
      .command-btn:active {
        transform: translateY(0);
      }
    `;
    
    document.head.appendChild(styles);
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ClaudeLiminalExtension());
} else {
  new ClaudeLiminalExtension();
}