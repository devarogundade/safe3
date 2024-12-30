import { BigNumber } from "bignumber.js";

const BASE_URL: string =
  "https://safe3-dvgvekd7g2ftcbaw.canadacentral-01.azurewebsites.net";

let activeDomain: string | null = null;

interface ActivationData {
  state: boolean;
}

interface ProfileData {
  image: string;
  level: string;
  username: `${string}.edu`;
  points: BigNumber;
}

const init = async (address: `0x${string}`) => {
  try {
    await chrome.storage.local.set({ ADDRESS: address });

    const activation = await chrome.storage.local.get("ACTIVATION");
    updateActivation({ state: Boolean(activation) });

    const response = await fetch(`${BASE_URL}/profiles/${address}`);
    const profile = await response.json();
    updateProfile(profile);

    // Update profile is necessary.
    await chrome.storage.local.set({ PROFILE: profile });
  } catch (error) {
    console.log(error);
  }
};

const updateActivation = (data: ActivationData) => {
  chrome.runtime.sendMessage({ action: "ACTIVATION-DATA", data });
};

const updateProfile = (data: ProfileData) => {
  chrome.runtime.sendMessage({ action: "PROFILE-DATA", data });
};

const toggleActivation = (): boolean => {
  const activation = chrome.storage.local.get("ACTIVATION");
  chrome.storage.local.set({ ACTIVATION: !Boolean(activation) });
  return !Boolean(activation);
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
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["assets/alert.js"],
        });
      }
    });
  });
};

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      const domains = extractDomains(activeTab.url);
      if (domains.length > 0) activeDomain = domains[0];
    }
  });
});

/////////////////////////////////////
///// LISTENERS //////
/////////////////////////////////////

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "init") {
    init(message.data);
    sendResponse();
  }

  if (message.action === "openPopup") {
    chrome.action.openPopup();
    chrome.runtime.sendMessage({ action: "openContents", data: domain });
  }

  if (message.action === "toggleActivation") {
    const activation = toggleActivation();
    sendResponse(activation);
  }
});

//////////////////////////////////////

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (oldValue === newValue) return;
    switch (key) {
      case "USER":
        updateProfile(newValue);
        break;

      case "ACTIVATION":
        updateActivation(newValue);

      default:
        break;
    }
  }
});
