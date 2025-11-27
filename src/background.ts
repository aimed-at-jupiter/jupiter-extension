chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TEST_MESSAGE") {
    // get active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;

      // inject content script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["contentScript.js"],
      });

      // send message to content script
      chrome.tabs.sendMessage(tab.id, { type: "FROM_BACKGROUND" });
    });
  }
});
