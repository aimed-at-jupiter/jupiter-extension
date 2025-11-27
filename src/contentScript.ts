console.log("Content script loaded.");

chrome.runtime.onMessage.addListener((msg) => {
  console.log("Content script received:", msg);
  if (msg.type === "FROM_BACKGROUND") {
    (document.getElementById("full-name") as HTMLInputElement).value =
      "Dale Cooper";
    (document.getElementById("email") as HTMLInputElement).value =
      "cooper@bluerose.com";
    (document.getElementById("address-line-1") as HTMLInputElement).value =
      "Great Northern Hotel";
    (document.getElementById("city") as HTMLInputElement).value = "Twin Peaks";
    (document.getElementById("post-code") as HTMLInputElement).value =
      "WA 98065-1109";
    (document.getElementById("phone") as HTMLInputElement).value =
      "800.272.5474";
  }
});
