<script setup lang="ts">
import { themeChange } from 'theme-change';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TxDialog from './components/TxDialog.vue';

// Инициализация изменения темы при монтировании компонента
onMounted(() => {
  themeChange(false);
});

// Получение экземпляра роутера
const router = useRouter();

// Обработчик для перезагрузки страницы при изменении URL
router.afterEach((to, from) => {
  const currentPath = window.localStorage.getItem('currentPath');
  const hasReloaded = window.localStorage.getItem('hasReloaded');

  if (to.fullPath !== currentPath && !hasReloaded) {
    window.localStorage.setItem('currentPath', to.fullPath);
    window.localStorage.setItem('hasReloaded', 'true');
    window.location.reload();
  } else {
    window.localStorage.removeItem('hasReloaded');
  }
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
<<<<<<< HEAD
  width: 100%;
=======
>>>>>>> ce19461 (xXxplorer)
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  background-color: black;
}
</style>
