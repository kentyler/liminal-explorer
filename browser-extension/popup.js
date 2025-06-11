/**
 * Popup script for Claude Liminal Explorer extension
 */

class ClaudeLiminalPopup {
  constructor() {
    this.isActive = false;
    this.init();
  }

  init() {
    // Check current status
    this.checkStatus();
    
    // Add event listeners
    document.getElementById('toggle-btn').addEventListener('click', () => {
      this.toggle();
    });
    
    // Add command button listeners
    document.querySelectorAll('.command-item').forEach(item => {
      item.addEventListener('click', () => {
        const command = item.dataset.command;
        this.executeCommand(command);
      });
    });
    
    // Update status periodically
    setInterval(() => this.checkStatus(), 1000);
  }

  async checkStatus() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url.includes('claude.ai')) {
        this.updateStatus(true, 'Ready on Claude.ai');
      } else {
        this.updateStatus(false, 'Navigate to Claude.ai');
      }
    } catch (error) {
      this.updateStatus(false, 'Extension inactive');
    }
  }

  updateStatus(active, message) {
    const statusDiv = document.getElementById('status');
    const statusText = document.getElementById('status-text');
    const toggleBtn = document.getElementById('toggle-btn');
    
    statusDiv.className = active ? 'status' : 'status inactive';
    statusText.textContent = message;
    
    if (active) {
      toggleBtn.textContent = this.isActive ? 'Hide Command Panel' : 'Show Command Panel';
      toggleBtn.className = 'toggle-btn';
    } else {
      toggleBtn.textContent = 'Navigate to Claude.ai';
      toggleBtn.className = 'toggle-btn inactive';
    }
  }

  async toggle() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('claude.ai')) {
        // Navigate to Claude.ai
        await chrome.tabs.update(tab.id, { url: 'https://claude.ai' });
        return;
      }
      
      // Toggle command panel
      await chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
      this.isActive = !this.isActive;
      
      const toggleBtn = document.getElementById('toggle-btn');
      toggleBtn.textContent = this.isActive ? 'Hide Command Panel' : 'Show Command Panel';
      
    } catch (error) {
      console.error('Toggle error:', error);
    }
  }

  async executeCommand(command) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('claude.ai')) {
        // Navigate to Claude.ai first
        await chrome.tabs.update(tab.id, { url: 'https://claude.ai' });
        
        // Wait for page to load, then execute command
        setTimeout(async () => {
          await chrome.tabs.sendMessage(tab.id, { 
            action: 'executeCommand', 
            command: command 
          });
        }, 3000);
        return;
      }
      
      // Execute command on current Claude.ai tab
      await chrome.tabs.sendMessage(tab.id, { 
        action: 'executeCommand', 
        command: command 
      });
      
      // Close popup after executing command
      window.close();
      
    } catch (error) {
      console.error('Command execution error:', error);
    }
  }
}

// Initialize popup when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new ClaudeLiminalPopup();
});