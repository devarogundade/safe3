import { type Profile } from "@/scripts/types";
import { defineStore } from "pinia";

export const useWalletStore = defineStore("address", {
  state: () => ({
    address: null as `0x${string}` | null,
    profile: null as Profile | null,
  }),
  actions: {
    setAddress(newAddress: string | null) {
      if (!newAddress) {
        this.address = null;
        return;
      }
      this.address = newAddress as `0x${string}`;
    },
    setProfile(newProfile: Profile | null) {
      this.profile = newProfile;
    },
  },
});
