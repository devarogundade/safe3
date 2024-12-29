import { config } from "./config";
import { abi as safe3Abi } from "../abis/safe3";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import type BigNumber from "bignumber.js";
import { decodeEventLog, parseAbiItem } from "viem";

export const safe3Id: `0x${string}` =
  "0xc382e9881a8d87b9125c56fecb0309f4c7716cca";

export const safe3PointsId: `0x${string}` =
  "0x42975a0b9343199ec47e62F2829F2c3E3e26230c";

interface Studio {
  claimedPoints: BigNumber;
  unClaimedPoints: BigNumber;
}

const Safe3Contract = {
  async initStudio(): Promise<`0x${string}` | null> {
    try {
      const result = await writeContract(config, {
        abi: safe3Abi,
        address: safe3Id,
        functionName: "initStudio",
      });

      const receipt = await waitForTransactionReceipt(config, { hash: result });

      return receipt.transactionHash;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async initContent(URI: string): Promise<number | null> {
    try {
      const result = await writeContract(config, {
        abi: safe3Abi,
        address: safe3Id,
        functionName: "initContent",
        args: [URI],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: result });
      const { topics, data } = receipt.logs[0];

      const { args } = decodeEventLog({ abi: safe3Abi, topics, data });

      return (args as any).tokenId;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async claim(points: BigNumber): Promise<`0x${string}` | null> {
    try {
      const result = await writeContract(config, {
        abi: safe3Abi,
        address: safe3Id,
        functionName: "claim",
        args: [points],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: result });

      return receipt.transactionHash;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async tip(content: number, points: BigNumber): Promise<`0x${string}` | null> {
    try {
      const result = await writeContract(config, {
        abi: safe3Abi,
        address: safe3Id,
        functionName: "tip",
        args: [content, points],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: result });

      return receipt.transactionHash;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getStudio(studio: `0x${string}`): Promise<Studio | null> {
    try {
      // @ts-ignore
      return await readContract(config, {
        abi: safe3Abi,
        address: safe3Id,
        functionName: "getStudio",
        args: [studio],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default Safe3Contract;
