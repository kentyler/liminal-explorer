// Background service worker for Liminal Explorer extension
// Handles extension lifecycle and any background tasks

chrome.runtime.onInstalled.addListener(() => {
  console.log('Liminal Explorer extension installed');
});

// Keep service worker alive
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.keepAlive) {
    sendResponse({status: 'alive'});
  }
  return true;
});