import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const MNEMONIC = vars.get("MNEMONIC");

const EDU_RPC_URL = "https://rpc.open-campus-codex.gelato.digital";

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      viaIR: true,
    },
  },
  defaultNetwork: "opencampus",
  networks: {
    opencampus: {
      url: EDU_RPC_URL,
      chainId: 656476,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  etherscan: {
    apiKey: {
      opencampus: "your-etherscan-api-key",
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus-codex.blockscout.com/api",
          browserURL: "https://opencampus-codex.blockscout.com",
        },
      },
    ],
  },
};
