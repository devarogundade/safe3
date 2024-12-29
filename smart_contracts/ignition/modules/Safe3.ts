// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import SafePointsModule from "./SafePoints";
import SafeContentModule from "./SafeContent";

const Safe3Module = buildModule("Safe3Module", (m) => {
  const { safePoints } = m.useModule(SafePointsModule);
  const { safeContent } = m.useModule(SafeContentModule);

  const safe3 = m.contract("Safe3", [safePoints, safeContent]);

  return { safe3 };
});

export default Safe3Module;
