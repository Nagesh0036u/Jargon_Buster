// Create the right-click menu option
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "simplify-jargon",
    title: "Simplify with JargonBuster",
    contexts: ["selection"]
  });
});

// Listen for when the user clicks our right-click option
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "simplify-jargon") {
    const selectedText = info.selectionText;
    
    // 1. Tell the webpage to show a "Thinking..." popup
    chrome.tabs.sendMessage(tab.id, { action: "show_loading" });

    // 2. Securely send the text to your Python backend
    fetch("http://127.0.0.1:8000/simplify", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText })
    })
    .then(response => response.json())
    .then(data => {
      // 3. Send the AI answer back to the webpage to display
      chrome.tabs.sendMessage(tab.id, { 
        action: "show_result", 
        result: data.simplified_text || "Error: " + data.error 
      });
    })
    .catch(error => {
      chrome.tabs.sendMessage(tab.id, { 
        action: "show_result", 
        result: "Error connecting to backend. Make sure your Python server is running!" 
      });
    });
  }
});