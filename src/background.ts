import type { FillFormMessage } from "./types";

chrome.runtime.onMessage.addListener((msg: FillFormMessage) => {
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
          chrome.tabs.sendMessage(tab.id!, msg);
        })
        .catch((err) => {
          console.error("failed to inject content script", err);
        });
    });
  }
});
