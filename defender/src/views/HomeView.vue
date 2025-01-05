<script setup lang="ts">
import MoreIcon from "@/components/icons/MoreIcon.vue";
import PowerIcon from "@/components/icons/PowerIcon.vue";
import WalletIcon from "@/components/icons/WalletIcon.vue";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";
import type { activationData } from "@/scripts/types";
import { getTokenBalance } from "../scripts/erc20";
import Converter from "@/scripts/converter";

import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import BigNumber from "bignumber.js";

const router = useRouter();

const activated = ref<boolean>(true);
const safePoints = ref<any>(new BigNumber(0));

const toggleactivation = () => {
  chrome.runtime.sendMessage({ action: "toggle-activation" });
};

onMounted(async () => {
  chrome.runtime.sendMessage({ action: "init" });

  //  safePoints.value = await getTokenBalance(address.value); 

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message', message);

    if (message.action == "activation-data") {
      activated.value = message.data.state;
    }

    if (message.action == "open-contents") {
      router.push(`/contents?domain=${message.data}`);
    }
  });
});

const connect = () => {

};
</script>

<template>
  <section>
    <div class="app_width">
      <div class="toolbar">
        <RouterLink :to="`/contents?domain=${'opensea.io'}`">
          <MoreIcon />
        </RouterLink>
        <WalletIcon @click="connect" />
      </div>

      <div class="power">
        <button @click="toggleactivation"
          :style="{ background: activated ? 'var(--primary-light)' : 'var(--bg-darker)' }">
          <PowerIcon />
        </button>

        <p>Defender is {{ activated ? "On" : "Off" }}</p>
      </div>

      <div class="profile">
        <div class="info">
          <div class="user">
            <div class="bio">
              <img src="/images/user.png" alt="user">
              <p>{{ 'Test User' }}</p>
            </div>
            <p class="level">Lite</p>
          </div>
          <ChevronRightIcon />
        </div>
        <div class="points">
          <p>Safe Points:</p>
          <p>{{ Converter.toMoney(Converter.down(safePoints, 18)) }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.toolbar svg {
  cursor: pointer;
}

.power {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 16px;
}

.power button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
}

.power svg {
  width: 50px;
  height: 50px;
}

.power p {
  font-size: 16px;
  font-weight: 500;
  color: var(--tx-normal);
}

.profile {
  border-radius: 6px;
  background: var(--bg-dark);
  margin: 30px 0;
}

.info {
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid var(--bg-darkest);
  align-items: center;
  padding: 10px;
}

.bio {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.bio img {
  width: 30px;
  height: 30px;
  border-radius: 16px;
}

.bio p {
  font-size: 12px;
  font-weight: 500;
  color: var(--tx-normal);
}

.level {
  padding-left: 40px;
  font-size: 12px;
  font-weight: 400;
  color: var(--tx-semi);
}

.points {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.points p:first-child {
  color: var(--tx-dimmed);
  font-size: 12px;
  font-weight: 400;
}

.points p:last-child {
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
}
</style>