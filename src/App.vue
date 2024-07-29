<script setup lang="ts">
import { themeChange } from 'theme-change';
import { onMounted } from 'vue';
import TxDialog from './components/TxDialog.vue';

onMounted(() => {
  themeChange(false);
});
</script>

<template>
  <div class="fullscreen-background">
    <RouterView />
    <TxDialog />
  </div>
</template>
<style scoped>
.fullscreen-background {
  width: 100%;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  background-color: black;
}
</style>