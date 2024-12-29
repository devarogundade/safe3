const extractUrls = (text) => {
  // Regular expression to match http or https URLs
  const regex = /(https?:\/\/[^\s]+)/g;

  // Find all matches in the given text
  const matches = text.match(regex);

  // Return the matches, or an empty array if no matches
  return matches || [];
};

const fetchHasContents = (domain, tab) => {
  fetch(
    `https://safe3-dvgvekd7g2ftcbaw.canadacentral-01.azurewebsites.net/has-contents/${domain}`
  ).then((response) => {
    response.json().then((data) => {
      if (data) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["assets/content.ts-CMHWxUJQ.js"],
        });
      }
    });
  });
};

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      const domains = extractUrls(activeTab.url);
      if (domains.length > 0) fetchHasContents(domains[0], activeTab);
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openPopup") {
    chrome.browserAction.enable();
  }
});
