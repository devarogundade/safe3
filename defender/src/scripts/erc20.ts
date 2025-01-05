import BigNumber from "bignumber.js";

import { getBalance } from "@wagmi/core";
import { config } from "./config";

const safeTokenId = `0x9A19e8574668dca5C4750eB642C614b7e5836cF4`;

export async function getTokenBalance(
  address: `0x${string}`
): Promise<BigNumber> {
  try {
    const { value } = await getBalance(config, { token: safeTokenId, address });
    return new BigNumber(value.toString());
  } catch (error) {
    console.log(error);
    return new BigNumber(0);
  }
}
