<script setup lang="ts">
import ProgressInnerBox from '@/components/ProgressInnerBox.vue';

const props = defineProps({
    text: { type: String, require: true },
    disabled: { type: Boolean },
    loading: { type: Boolean }
});
</script>

<template>
    <button :disabled="props.disabled">
        <p v-if="!loading" class="text">{{ props.text }}</p>
        <ProgressInnerBox v-else />

        <slot v-if="!loading"></slot>
    </button>
</template>

<style scoped>
button {
    height: 40px;
    border-radius: 4px;
    background: var(--primary);
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s;
    gap: 10px;
}

button:hover {
    opacity: 0.8;
}

button:disabled {
    cursor: not-allowed;
}

.text {
    color: var(--bg);
    font-size: 14px;
    font-weight: 500;
}
</style>