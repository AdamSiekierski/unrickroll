import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log("Never gonna give you up...");
});
