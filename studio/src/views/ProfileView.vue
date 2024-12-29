<script setup lang="ts">
import Button from '@/components/Button.vue';

import { onMounted, ref } from 'vue';
import { useWalletStore } from "@/stores/wallet";
import { useToast } from 'vue-toast-notification';

import { useRouter } from 'vue-router';
import { createProfile } from '@/scripts/client';

import Safe3Contract from '@/scripts/contract';
import Storage from '@/scripts/storage';

import 'vue-toast-notification/dist/theme-sugar.css';

const walletStore = useWalletStore();
const toast = useToast({ duration: 4000, position: 'top', dismissible: true });

const router = useRouter();
const loading = ref<boolean>(false);
const form = ref({
    username: "",
    description: null as string | null,
    image: null as string | null,
    image_file: null as File | null,
    image_file_url: null as string | null
});

const onImageSelect = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
        form.value.image_file_url = URL.createObjectURL(files[0]);
        form.value.image_file = files[0];
    }
    else {
        form.value.image_file = null;
    }
};

const create = async () => {
    if (loading.value) return;

    if (!walletStore.address) {
        return toast.error('Connect your wallet!');
    }

    if (form.value.username.length == 0) {
        return toast.error('Enter a username!');
    }

    if (!form.value.username.endsWith('.edu')) {
        return toast.error('Enter a valid .edu username!');
    }

    loading.value = true;

    const txHash = await Safe3Contract.initStudio();

    if (!txHash) {
        toast.error('Failed to call contract.');
        return loading.value = false;
    }

    if (form.value.image_file) {
        form.value.image = await Storage.awaitUpload(form.value.image_file, walletStore.address);
    } else {
        form.value.image = null;
    }

    const profile = await createProfile(
        form.value.username as `${string}.edu`,
        walletStore.address,
        form.value.description,
        form.value.image,
    );

    walletStore.setProfile(profile);

    loading.value = false;

    if (profile) router.push('/');
};

onMounted(() => {
    if (walletStore.profile) {
        form.value.username = walletStore.profile.username;
        form.value.description = walletStore.profile.description;
        form.value.image = walletStore.profile.image;
    }
});
</script>

<template>
    <section>
        <div class="app_width">
            <div class="profile">
                <div class="title">
                    <h3>Setup your Safe3 Profile.</h3>
                    <p>Connect your OpenCampus ID to safe3 studio.</p>
                </div>

                <div class="form">
                    <div class="input">
                        <label>Username (.edu) <span>*</span></label>
                        <input type="text" v-model="form.username" placeholder="johndoe.edu"
                            :disabled="Boolean(walletStore.profile)">
                    </div>

                    <div class="input">
                        <label>Description</label>
                        <textarea type="text" rows="5" v-model="form.description" placeholder="I am a cool web3 user."
                            :disabled="Boolean(walletStore.profile)"></textarea>
                    </div>

                    <div class="input file">
                        <label>Image</label>
                        <div class="picker">
                            <img v-if="form.image_file_url" :src="form.image_file_url" :alt="form.username">
                            <input type="file" @change="onImageSelect" accept="image/*"
                                :disabled="Boolean(walletStore.profile)">
                        </div>
                    </div>

                    <div class="action">
                        <Button :text="'Continue'" @click="create" :disabled="Boolean(walletStore.profile)"
                            :loading="loading" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.profile {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.title {
    text-align: center;
}

.title h3 {
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 500;
}

.title p {
    margin-top: 10px;
    font-size: 14px;
    color: var(--tx-semi);
}

.form {
    border: 1px solid var(--bg-darkest);
    border-radius: 6px;
    padding: 20px;
    width: 440px;
}

.form .input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.picker {
    width: 140px;
    height: 140px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--bg-darkest);
    display: flex;
    align-items: center;
    justify-content: center;
}

.file input {
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}

.input span {
    color: var(--sm-red);
}

.input img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
}

.input label {
    font-size: 12px;
    color: var(--tx-semi);
    font-weight: 400;
}

input {
    height: 40px;
    background: var(--bg-dark);
    border: none;
    outline: none;
    padding: 0 10px;
    border-radius: 4px;
    color: var(--tx-normal);
}

textarea {
    background: var(--bg-dark);
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 4px;
    color: var(--tx-normal);
    resize: none;
}

.action {
    display: flex;
    margin-top: 20px;
}
</style>