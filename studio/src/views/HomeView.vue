<script setup lang="ts">
</script>

<template>
  <section>
    <div class="app_width">
      <div class="start">
        <h3>Create a new content.</h3>
        <p>Select the type of content you would like to create.</p>
      </div>

      <div class="types">
        <RouterLink to="/create/article">
          <div class="type">
            <img src="/images/article.png" alt="Article">
            <h3>Article</h3>
            <p>Write text and image content.</p>
          </div>
        </RouterLink>

        <RouterLink to="/create/video">
          <div class="type">
            <img src="/images/video.png" alt="Video">
            <h3>Video</h3>
            <p>Record/upload video content.</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.start {
  text-align: center;
  margin-top: 60px;
}

.start h3 {
  font-size: 24px;
  color: var(--tx-normal);
  font-weight: 500;
}

.start p {
  margin-top: 10px;
  font-size: 14px;
  color: var(--tx-semi);
}

.types {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  margin-top: 50px;
  flex-wrap: wrap;
}

.type img {
  height: 240px;
}

.type:hover {
  transform: translateY(-4px);
}

.type {
  text-align: center;
  padding: 40px;
  border: 1px solid var(--bg-darkest);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.type h3 {
  color: var(--tx-normal);
  font-size: 24px;
  font-weight: 500;
}

.type p {
  color: var(--tx-semi);
  font-size: 16px;
  margin-top: 10px;
}
</style>
