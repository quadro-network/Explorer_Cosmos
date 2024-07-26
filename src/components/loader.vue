
<template>
    <div id="loader" class="loader" v-if="loading">
      <div class="loading-text">
        <span class="loading-text-words">L</span>
        <span class="loading-text-words">O</span>
        <span class="loading-text-words">A</span>
        <span class="loading-text-words">D</span>
        <span class="loading-text-words">I</span>
        <span class="loading-text-words">N</span>
        <span class="loading-text-words">G</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const loading = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  });
  </script>
  
  <style scoped>
  @import url(https://fonts.googleapis.com/css?family=Quattrocento+Sans);
#loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100px;
  line-height: 100px;
}
.loading-text span {
  display: inline-block;
  margin: 0 5px;
  color: #fff;
  font-family: "Quattrocento Sans", sans-serif;
}
.loading-text span:nth-child(1) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 0s infinite linear alternate;
          animation: blur-text 1.5s 0s infinite linear alternate;
}
.loading-text span:nth-child(2) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 0.2s infinite linear alternate;
          animation: blur-text 1.5s 0.2s infinite linear alternate;
}
.loading-text span:nth-child(3) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 0.4s infinite linear alternate;
          animation: blur-text 1.5s 0.4s infinite linear alternate;
}
.loading-text span:nth-child(4) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 0.6s infinite linear alternate;
          animation: blur-text 1.5s 0.6s infinite linear alternate;
}
.loading-text span:nth-child(5) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 0.8s infinite linear alternate;
          animation: blur-text 1.5s 0.8s infinite linear alternate;
}
.loading-text span:nth-child(6) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 1s infinite linear alternate;
          animation: blur-text 1.5s 1s infinite linear alternate;
}
.loading-text span:nth-child(7) {
  filter: blur(0px);
  -webkit-animation: blur-text 1.5s 1.2s infinite linear alternate;
          animation: blur-text 1.5s 1.2s infinite linear alternate;
}

@-webkit-keyframes blur-text {
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(4px);
  }
}

@keyframes blur-text {
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(4px);
  }
}
  </style>
  