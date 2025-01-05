import { config } from "./config";
import { abi as safe3Abi } from "../abis/safe3";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import type BigNumber from "bignumber.js";
import { erc20Abi } from "viem";

export const safe3TokenId: `0x${string}` =
  "0x9A19e8574668dca5C4750eB642C614b7e5836cF4";

export const safe3Id: `0x${string}` =
  "0xA737dd6fB5Fa617540e1A359b0100Fa7875E9518";

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
        functionName: "intStudio",
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
      const { topics } = receipt.logs[0];

      console.log(topics);
      console.log(Number(topics[3]));

      return Number(topics[3]);
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

  async approve(spender: `0x${string}`, amount: any) {
    try {
      const result = await writeContract(config, {
        abi: erc20Abi,
        address: safe3TokenId,
        functionName: "approve",
        args: [spender, amount],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: result });

      return receipt.transactionHash;
    } catch (error) {
      console.log(error);

      return null;
    }
  },

  async tipContent(
    content: number,
    points: BigNumber
  ): Promise<`0x${string}` | null> {
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
