<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const address = ref<`0x${string}` | undefined>(undefined);
const username = ref<`${string}.edu` | undefined>(undefined);

const login = () => {
    if (!address.value || !username.value) return;
    if (!username.value.endsWith('.edu')) return;

    localStorage.setItem('address', address.value);
    localStorage.setItem('username', username.value);

    router.push('/');
};
</script>

<template>
    <section>
        <div class="app_width">
            <div class="login">
                <form>
                    <div class="input">
                        <label>Wallet address</label>
                        <input type="text" placeholder="0x..." required>
                    </div>

                    <div class="input">
                        <label>EduChain username</label>
                        <input type="text" placeholder="0x0.edu" required>
                    </div>

                    <button type="submit" @submit="login">Login</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.login {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input label {
    font-size: 12px;
    color: var(--tx-semi);
    font-weight: 400;
}

input {
    width: 100%;
    height: 40px;
    background: var(--bg-dark);
    border: none;
    outline: none;
    padding: 0 10px;
    border-radius: 4px;
    color: var(--tx-normal);
}

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
    margin-top: 30px;
}

button:hover {
    opacity: 0.8;
}
</style>