console.log("Content script loaded.");

chrome.runtime.onMessage.addListener((msg) => {
  console.log("Content script received:", msg);
});
