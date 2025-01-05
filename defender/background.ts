const BASE_URL: string =
  "https://safe3-dvgvekd7g2ftcbaw.canadacentral-01.azurewebsites.net";

let activeDomain: string | undefined = undefined;

interface activationData {
  state: boolean;
}

const init = async () => {
  try {
    const { activation } = await chrome.storage.local.get("activation");
    updateActivation({ state: Boolean(activation) });
  } catch (error) {
    console.log(error);
  }
};

const updateActivation = (data: activationData) => {
  chrome.runtime.sendMessage({ action: "activation-data", data });
};

const toggleActivation = async () => {
  const { activation } = await chrome.storage.local.get("activation");

  console.log("activation", activation);

  updateActivation({ state: !Boolean(activation) });

  await chrome.storage.local.set({ activation: !Boolean(activation) });
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

const fetchHasContents = (domain: string, tab: any) => {
  fetch(`${BASE_URL}/has-contents/${domain}`).then((response) => {
    response.json().then((data) => {
      if (Boolean(data)) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["alert.js"],
        });
      }
    });
  });
};

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      const domains = extractDomains(activeTab.url);

      const { activation } = await chrome.storage.local.get("activation");

      if (activation && domains.length > 0) {
        activeDomain = domains[0];
        fetchHasContents(domains[0], activeTab);
      }
    }
  });
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "open-popup" && activeDomain) {
    chrome.action.openPopup();
    chrome.runtime.sendMessage({ action: "open-contents", data: activeDomain });
  }

  if (message.action === "toggle-activation") {
    toggleActivation();
  }

  if (message.action === "init") {
    init();
  }
});
