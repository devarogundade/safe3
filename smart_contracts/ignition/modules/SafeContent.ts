// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SafeContentModule = buildModule("SafeContentModule", (m) => {
  const safeContent = m.contract("SafeContent", []);

  return { safeContent };
});

export default SafeContentModule;
