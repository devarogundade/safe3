<script setup lang="ts">
import Button from '@/components/Button.vue';

import { ref } from "vue";
import { useWalletStore } from "@/stores/wallet";
import { useToast } from 'vue-toast-notification';

import { useRouter } from 'vue-router';
import { createContent } from '@/scripts/client';
import { ContentType, ContentCategory } from "@/scripts/types";

import Safe3Contract from '@/scripts/contract';
import Storage from '@/scripts/storage';

import 'vue-toast-notification/dist/theme-sugar.css';

const walletStore = useWalletStore();
const toast = useToast({ duration: 4000, position: 'top', dismissible: true });

const router = useRouter();
const loading = ref<boolean>(false);
const form = ref({
    title: "",
    description: "",
    domains: "",

    video_file_url: null as string | null,
    video_file: null as File | null,
    video: null as string | null,

    thumbnail_file_url: null as string | null,
    thumbnail_file: null as File | null,
    thumbnail: null as string | null,

    category: ContentCategory.Warning
});

const selectThumbnail = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
        form.value.thumbnail_file_url = URL.createObjectURL(files[0]);
        form.value.thumbnail_file = files[0];
    }
    else {
        form.value.thumbnail_file = null;
    }
};

const selectVideo = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
        form.value.video_file_url = URL.createObjectURL(files[0]);
        form.value.video_file = files[0];
    }
    else {
        form.value.video_file = null;
    }
};

const onCategoryChanged = (event: any) => {
    form.value.category = event.target.value;
};

const upload = async () => {
    if (loading.value) return;

    if (!walletStore.address) {
        return toast.error('Connect your wallet!');
    }

    if (form.value.title.length == 0) {
        return toast.error('Enter a title!');
    }

    if (form.value.description.length == 0) {
        return toast.error('Enter a description!');
    }

    if (form.value.domains.split(',').length == 0) {
        return toast.error('Enter domain(s)!');
    }

    loading.value = true;

    if (form.value.thumbnail_file) {
        form.value.thumbnail = await Storage.awaitUpload(form.value.thumbnail_file, `thumbnail_${Date.now()}`);
    } else {
        form.value.thumbnail = null;
    }

    if (!form.value.thumbnail) {
        toast.error("Failed to upload thumbnail!");
        return loading.value = false;
    }

    const tokenId = await Safe3Contract.initContent(
        JSON.stringify({
            name: form.value.title,
            description: form.value.description,
            image: form.value.thumbnail
        })
    );

    if (!tokenId) {
        toast.error('Failed to call contract.');
        return loading.value = false;
    }

    if (form.value.video_file) {
        form.value.video = await Storage.awaitUpload(form.value.video_file, `video_${Date.now()}`);
    } else {
        form.value.video = null;
    }

    if (!form.value.video) {
        toast.error("Failed to upload video file!");
        return loading.value = false;
    }

    const content = await createContent(
        tokenId,
        form.value.title,
        form.value.description,
        form.value.thumbnail,
        form.value.video,
        ContentType.Video,
        form.value.category,
        form.value.domains.replace(" ", "").split(','),
        walletStore.address
    );

    if (!content) {
        toast.error("Failed to upload video!");
        return loading.value = false;
    }

    toast.success("Video uploaded!");

    router.push('/profile');

    loading.value = false;
};
</script>


<template>
    <section>
        <div class="app_width">
            <div class="upload">
                <div class="title">
                    <h3>Upload a Video Content.</h3>
                    <p>Connect your OpenCampus ID to safe3 studio.</p>
                </div>

                <div class="form">
                    <div class="input file">
                        <label>Upload Video <span>*</span></label>
                        <div class="picker">
                            <video autoplay controls loop v-if="form.video_file_url" :src="form.video_file_url"
                                :alt="form.title"></video>
                            <input type="file" accept="video/*" @change="selectVideo">
                        </div>
                    </div>

                    <div class="input">
                        <label>Video Title <span>*</span></label>
                        <input type="text" placeholder="How to..." v-model="form.title" />
                    </div>

                    <div class="input">
                        <label>Description <span>*</span></label>
                        <textarea rows="8" v-model="form.description" placeholder="Your text goes here..."></textarea>
                    </div>

                    <div class="input file">
                        <label>Thumbnail <span>*</span></label>
                        <div class="picker">
                            <img v-if="form.thumbnail_file_url" :src="form.thumbnail_file_url" :alt="form.title">
                            <input type="file" accept="image/*" @change="selectThumbnail">
                        </div>
                    </div>

                    <div class="input">
                        <label>Domain (seperated by comma) <span>*</span></label>
                        <input type="text" placeholder="example.com, test.com" v-model="form.domains" />
                    </div>

                    <div class="input">
                        <label>Category <span>*</span></label>
                        <select @change="onCategoryChanged">
                            <option :value="ContentCategory.Warning">Warning</option>
                            <option :value="ContentCategory.Educative">Educative</option>
                        </select>
                    </div>

                    <div class="action">
                        <Button :text="'Upload'" @click="upload" :loading="loading" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.upload {
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
    width: 540px;
}

.form .input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.picker {
    width: 100%;
    height: 180px;
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

.input video {
    width: 100%;
    height: 100%;
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

select {
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