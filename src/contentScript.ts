import type { FillFormMessage } from "./types";

function setInputValue(id: string, value?: string) {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) {
    console.log(`Input with id "${id}" not found`);
    return;
  }
  if (value !== undefined) input.value = value;
}
if (!(window as any).__fillFormListenerAdded) {
  chrome.runtime.onMessage.addListener((msg: FillFormMessage) => {
    if (msg.type !== "FILL_FORM") return;

    const clientData = msg.payload;

    setInputValue("title", clientData.title);
    setInputValue("full-name", clientData.fullName);
    setInputValue("email", clientData.email);
    setInputValue("address-line-1", clientData.address.line1);
    setInputValue("city", clientData.address.city);
    setInputValue("post-code", clientData.address.postCode);
    setInputValue("phone", clientData.phone);
  });
  (window as any).__fillFormListenerAdded = true;
}
