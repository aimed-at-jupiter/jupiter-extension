import type { FillFormMessage } from "./types";

chrome.runtime.onMessage.addListener((msg: FillFormMessage) => {
  if (msg.type !== "FILL_FORM") return;

  const clientData = msg.payload;

  (document.getElementById("full-name") as HTMLInputElement).value =
    clientData.fullName;
  (document.getElementById("email") as HTMLInputElement).value =
    clientData.email;
  (document.getElementById("address-line-1") as HTMLInputElement).value =
    clientData.address.line1;
  (document.getElementById("city") as HTMLInputElement).value =
    clientData.address.city;
  (document.getElementById("post-code") as HTMLInputElement).value =
    clientData.address.postCode;
  (document.getElementById("phone") as HTMLInputElement).value =
    clientData.phone;
});
