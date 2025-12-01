chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "FILL_FORM") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;

      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          files: ["contentScript.js"],
        })
        .then(() => {
          chrome.tabs.sendMessage(tab.id!, {
            type: "FILL_FORM",
            payload: msg.payload,
          });
        });
    });
  }
});
