<script setup lang="ts">
import Button from '@/components/Button.vue';
import { dislikeContent, fetchContents, likeContent, viewContent } from '@/scripts/client';
import Safe3Contract, { safe3Id } from '@/scripts/contract';
import Converter from '@/scripts/converter';
import { ContentType, type Content } from '@/scripts/types';
import { useWalletStore } from '@/stores/wallet';
import BigNumber from 'bignumber.js';
import { onMounted, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router'; import { useToast } from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-sugar.css';

const route = useRoute();
const tipping = ref<boolean>(false);
const liking = ref<boolean>(false);
const disliking = ref<boolean>(false);
const loading = ref<boolean>(false);
const content = ref<Content | null>(null);
const walletStore = useWalletStore();
const toast = useToast({ duration: 4000, position: 'top', dismissible: true });

const getContent = async (tokenId: number) => {
    content.value = await fetchContents(tokenId);
    loading.value = false;
};

const like = async () => {
    const tokenId = route.params.id;
    if (!tokenId) return;

    if (!walletStore.address) {
        toast.error('Connect your wallet!');
        return;
    }

    liking.value = true;

    await likeContent(Number(tokenId), walletStore.address);
    getContent(Number(tokenId));

    liking.value = false;
};

const dislike = async () => {
    const tokenId = route.params.id;
    if (!tokenId) return;

    if (!walletStore.address) {
        toast.error('Connect your wallet!');
        return;
    }

    disliking.value = true;

    await dislikeContent(Number(tokenId), walletStore.address);
    getContent(Number(tokenId));

    disliking.value = false;
};

const view = async () => {
    const tokenId = route.params.id;
    if (!tokenId) return;
    viewContent(Number(tokenId), walletStore.address ? walletStore.address : '0x');
};

const tip = async () => {
    const tokenId = route.params.id;
    if (!tokenId) return;

    if (!walletStore.address) {
        toast.error('Connect your wallet!');
        return;
    }

    tipping.value = true;

    const amount = prompt("Enter an amount");
    const points = new BigNumber(Number(amount));

    await Safe3Contract.approve(safe3Id, points);

    const txHash = await Safe3Contract.tipContent(Number(tokenId), Converter.up(points, 18));

    if (txHash) {
        toast.success('Tipped!');
    } else {
        toast.error('Failed to tip content.');
    }

    tipping.value = false;
};

onMounted(() => {
    loading.value = true;
    const tokenId = route.params.id;
    if (tokenId) getContent(Number(tokenId));

    view();
});
</script>

<template>
    <section>
        <div class="app_width">
            <p class="loading" v-if="loading">Loading...</p>
            <div class="detail" v-else-if="content">
                <div class="image">
                    <img v-if="content.type == ContentType.Article" :src="content.image" :alt="content.title">
                    <video v-if="content.type == ContentType.Video" :poster="content.image" :src="content.file"
                        controls></video>
                </div>

                <div class="title">
                    <h3>{{ content.title }} | {{ content.category }}</h3>
                    <div class="stats">
                        <p>Views {{ content.views.length }} • 👍{{ content.likes.length }} • 👎 {{
                            content.dislikes.length }}
                        </p>
                    </div>
                </div>

                <div class="body">
                    <p>{{ content.description }}</p>
                </div>

                <div class="actions">
                    <Button :text="'Like'" @click="like" :loading="liking" />
                    <Button :text="'Dislike'" @click="dislike" :loading="disliking" />
                    <Button :text="'Tip 5 $SAFE'" @click="tip" :loading="tipping" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.app_width {
    max-width: 100%;
}

.image {
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title {
    padding: 20px;
}

.title h3 {
    font-size: 20px;
    font-weight: 500;
    color: var(--tx-normal);
}

.stats {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-semi);
}

.body {
    font-size: 16px;
    line-height: 26px;
    font-weight: 500;
    color: var(--tx-dimmed);
    padding: 20px;
    border-top: 1px solid var(--bg-darkest);
}

.actions {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border-top: 1px solid var(--bg-darkest);
}

.loading {
    text-align: center;
    padding: 100px 0;
    font-size: 16px;
    color: var(--tx-dimmed);
}
</style>