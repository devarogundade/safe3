import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const { version, name, description } = packageJson;
const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async () => ({
  name,
  description,
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  manifest_version: 3,
  // content_security_policy: {
  //   extension_pages:
  //     "script-src 'self'; object-src 'self'; style-src 'self' https://*; font-src https://*; img-src https://*; connect-src https://*",
  // },
  icons: {
    "32": "icons/icon32.png",
    "64": "icons/icon64.png",
  },
  permissions: ["storage", "tabs", "activeTab", "scripting"],
  host_permissions: ["https://*/*", "http://*/*"],
  background: {
    service_worker: "background.ts",
  },
  action: {
    default_icon: {
      "32": "icons/icon32.png",
      "64": "icons/icon64.png",
    },
    default_popup: "src/popup/index.html",
    default_title: name,
  },
  content_scripts: [
    {
      matches: ["https://*/*"],
      js: ["content.ts"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["icons/icon32.png", "icons/icon64.png"],
      matches: ["<all_urls>"],
    },
  ],
}));
