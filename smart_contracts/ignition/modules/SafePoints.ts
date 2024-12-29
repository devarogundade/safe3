// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SafePointsModule = buildModule("SafePointsModule", (m) => {
  const safePoints = m.contract("SafePoints", []);

  return { safePoints };
});

export default SafePointsModule;