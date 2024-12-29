<script setup lang="ts">
import Button from './Button.vue';
import Converter from '@/scripts/converter';

import { useWalletStore } from '@/stores/wallet';
import { createWeb3Modal } from '@web3modal/wagmi/vue';
import { useWeb3Modal } from '@web3modal/wagmi/vue';
import { config, chains } from '@/scripts/config';
import { onMounted, ref } from 'vue';
import { watchAccount } from '@wagmi/core';
import { fetchProfile } from '@/scripts/client';
import { useRouter } from 'vue-router';

const router = useRouter();
const walletStore = useWalletStore();

createWeb3Modal({
    wagmiConfig: config,
    projectId: import.meta.env.VITE_PROJECT_ID,
    // @ts-ignore
    chains: chains,
    enableAnalytics: true,
    themeMode: 'light'
});

const modal = useWeb3Modal();

const getProfile = async (address: `0x${string}`) => {
    const profile = await fetchProfile(address);

    walletStore.setProfile(profile);
    if (!profile) return router.push('/profile');
};

onMounted(() => {
    watchAccount(config, {
        onChange(account) {
            if (account.address) {
                walletStore.setAddress(account.address);
                getProfile(account.address);
            }
        },
    });
});
</script>

<template>
    <section>
        <div class="app_width">
            <header>
                <RouterLink to="/">
                    <h3>Safe3 <span>Studio.</span></h3>
                </RouterLink>

                <Button @click="walletStore.address ? router.push('/profile') : modal.open()"
                    :text="walletStore.address ? Converter.toChecksumAddress(walletStore.address) : 'Connect Wallet'"></Button>
            </header>
        </div>
    </section>
</template>

<style scoped>
section {
    border-bottom: 1px solid var(--bg-darkest);
    position: sticky;
    top: 0;
    z-index: 99;
    background: var(--bg);
}

header {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

header h3 {
    color: var(--tx-normal);
    font-weight: 500;
    font-size: 20px;
}

header span {
    color: var(--primary);
}
</style>