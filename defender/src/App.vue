<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openContents") {
    router.push(`/contents?domain=${message.data}`);
  }
});
</script>

<template>
  <RouterView />
</template>