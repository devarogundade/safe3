import { walletConnect } from "@wagmi/connectors";
import { defaultWagmiConfig } from "@web3modal/wagmi";
import { eduTestnet } from "./educhain";

const metadata = {
  name: "Safe3",
  description: "Safe3",
  url: "https://studio.safethree.xyz",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const chains = [eduTestnet];

export const config = defaultWagmiConfig({
  // @ts-ignore
  chains,
  projectId: import.meta.env.VITE_PROJECT_ID,
  metadata,
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_PROJECT_ID,
    }),
  ],
});
