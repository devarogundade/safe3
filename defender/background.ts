import { BigNumber } from "bignumber.js";

const BASE_URL: string =
  "https://safe3-dvgvekd7g2ftcbaw.canadacentral-01.azurewebsites.net";

let activeDomain: string | null = null;
interface ActivationData {
  state: boolean;
}

const init = async () => {
  try {
    // @ts-ignore
    const activation = await chrome.storage.local.get("ACTIVATION");
    updateActivation({ state: Boolean(activation) });
  } catch (error) {
    console.log(error);
  }
};

const updateActivation = (data: ActivationData) => {
  // @ts-ignore
  chrome.runtime.sendMessage({ action: "ACTIVATION-DATA", data });
};

const toggleActivation = () => {
  // @ts-ignore
  const activation = chrome.storage.local.get("ACTIVATION");
  // @ts-ignore
  chrome.storage.local.set({ ACTIVATION: !Boolean(activation) });

  updateActivation({
    state: !Boolean(activation),
  });
};

const extractDomains = (text: string): string[] => {
  const regex = /https?:\/\/(?:www\.)?([^\/\s]+)/g;
  const matches: string[] = [];

  let match: any;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};

const fetchHasContents = (domain: string, tab) => {
  fetch(`${BASE_URL}/has-contents/${domain}`).then((response) => {
    response.json().then((data) => {
      if (Boolean(data)) {
        // @ts-ignore
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["assets/alert.js"],
        });
      }
    });
  });
};

// @ts-ignore
chrome.tabs.onActivated.addListener(() => {
  // @ts-ignore
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      const domains = extractDomains(activeTab.url);
      if (domains.length > 0) activeDomain = domains[0];

      fetchHasContents(domains[0], activeTab);
    }
  });
});

/////////////////////////////////////
///// LISTENERS //////
/////////////////////////////////////

// @ts-ignore
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "openPopup") {
    // @ts-ignore
    chrome.action.openPopup();
    // @ts-ignore
    chrome.runtime.sendMessage({ action: "openContents", data: domain });
  }

  if (message.action === "toggleActivation") {
    const activation = toggleActivation();
    sendResponse(activation);
  }
});

//////////////////////////////////////

// @ts-ignore
chrome.storage.onChanged.addListener((changes) => {
  // @ts-ignore
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (oldValue === newValue) return;
    switch (key) {
      case "ACTIVATION":
        updateActivation(newValue);

      default:
        break;
    }
  }
});
