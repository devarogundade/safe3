<script setup lang="ts">
import MoreIcon from "@/components/icons/MoreIcon.vue";
import WalletIcon from "@/components/icons/WalletIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchContents } from "@/scripts/client";
import { type Content } from "@/scripts/types";

const route = useRoute();
const domain = computed(() => route.query.domain as string | undefined);
const contents = ref<Content[]>([]);
const loading = ref<boolean>(false);
const search = ref<string>("");

const getContents = async (domain: string) => {
    loading.value = true;

    contents.value = await fetchContents(domain);

    loading.value = false;
};

const openContent = (tokenId: number) => {
    const url = `https://studio.safethree.xyz/details/${tokenId}`;

    const popupWidth = 600; // Width of the popup
    const popupHeight = 500; // Height of the popup

    // Calculate the position to center the popup
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;

    // Define the options with centered position
    const options = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=no,resizable=no`;
    window.open(url, "CenteredPopup", options);
};

watch(domain, (newDomain) => {
    if (!newDomain) return;
    getContents(newDomain);
});
</script>

<template>
    <section>
        <div class="app_width">
            <div class="toolbar">
                <MoreIcon />
                <h3>Contents</h3>
                <WalletIcon />
            </div>

            <div class="domain">
                <div></div>
                <p>{{ domain }}</p>
            </div>

            <div class="search">
                <SearchIcon />
                <input type="text" placeholder="Enter a keyword" v-model="search">
            </div>

            <div class="videos">
                <div class="video" v-for="content in contents" :key="content.tokenId"
                    @click="openContent(content.tokenId)">
                    <div class="banner">
                        <img :src="content.image" :alt="content.title">
                        <span>{{ content.category.toString() }} •{{ content.type.toString() }} • {{ content.views }}
                            views</span>
                    </div>
                    <div class="info">
                        <p class="title">{{ content.title }}</p>
                        <p class="description">{{ content.description }}</p>
                        <div class="stats">
                            <div class="stat"><span>{{ content.likes }}</span>Likes</div>
                            <div class="stat"><span>{{ content.dislikes }}</span>Dislikes</div>
                        </div>
                    </div>
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

.toolbar h3 {
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 500;
    text-align: center;
}

.domain {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 16px;
    background: var(--primary-light);
    border-radius: 2px;
    position: sticky;
    top: 6px;
    z-index: 10;
}

.domain div {
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background: var(--primary);
}

.domain p {
    color: var(--tx-dimmed);
    font-size: 10px;
    font-weight: 500;
}

.search {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 36px;
    border-radius: 4px;
    background: var(--bg-darkest);
    border: 1px solid var(--bg-dark);
    overflow: hidden;
    font-size: 14px;
    font-weight: 500;
    padding: 0 10px;
}

.search input {
    width: 100%;
    background: none;
    outline: none;
    border: none;
    padding: 0 10px;
    color: var(--tx-normal);
}

.search svg {
    width: 18px;
    height: 18px;
}

.video {
    border-bottom: 1px solid var(--bg-darker);
    padding: 10px 0;
    cursor: pointer;
}

.video:hover img {
    transform: scale(1.1, 1.1);
}

.video .banner {
    position: relative;
    height: 140px;
    overflow: hidden;
    border-radius: 4px;
}

.banner span {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 11px;
    padding: 2px 8px;
    background: rgba(0, 0, 0, 0.6);
    color: var(--tx-normal);
    font-weight: 400;
    border-top-right-radius: 4px;
}

.banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video .info {
    margin-top: 10px;
}

.info .title {
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}

.info .description {
    color: var(--tx-semi);
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
}

.info .stats {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 4px;
    border: 1px solid var(--bg-darkest);
}

.info .stat {
    text-align: center;
    padding: 4px;
    font-size: 12px;
    color: var(--tx-dimmed);
}

.info .stat span {
    margin-right: 4px;
    color: var(--primary);
    font-weight: 500;
}

.info .stat:last-child span {
    color: var(--sm-red);
}
</style>