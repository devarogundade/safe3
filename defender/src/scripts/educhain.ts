import type { Chain } from "viem";

export const eduTestnet = {
  id: 656476,
  name: "Edu Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EDU",
    symbol: "EDU",
  },
  rpcUrls: {
    public: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    etherscan: {
      name: "EduChain Explorer",
      url: "https://opencampus-codex.blockscout.com",
    },
    default: {
      name: "EduChain Explorer",
      url: "https://opencampus-codex.blockscout.com",
    },
  },
} as const satisfies Chain;
