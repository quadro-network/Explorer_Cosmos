<script lang="ts" setup>
import { useDashboard } from '@/stores/useDashboard';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const dashboardStore = useDashboard();
const conf = computed(() => dashboardStore.chains[props.name] || {});

const addFavor = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
  dashboardStore.favoriteMap[props.name] =
    !dashboardStore?.favoriteMap?.[props.name];
  window.localStorage.setItem(
    'favoriteMap',
    JSON.stringify(dashboardStore.favoriteMap)
  );
};
</script>
<template>
   <RouterLink
    :to="`/${name}`"
    class="backdrop-blur-md card_explorer rounded shadow flex flex-col items-center px-3 py-3 cursor-pointer"
  >
    <div class="rounded-full overflow-hidden">
      <img :src="conf.logo" class="logo_chain" />
    </div>
    <div class="font-semibold mt-4 text-secondary text-center capitalize">
      {{ conf?.prettyName || props.name }}
    </div>

  </RouterLink>
</template>


<style scoped>
.card_explorer {
  justify-content: center; 
  align-items: center;
 width: 150px;
 height: 184px;
 border-radius: 30px;
 margin-left: 10px;
 margin-bottom: 40px;
 background: #212121;
 box-shadow:  10px 5px 30px rgb(25, 25, 25),
 -10px -10px 10px rgb(60, 60, 60);
}
.card_explorer:hover .logo {
  animation: spin 1s infinite linear;
}
.logo_chain {
width: 120px;
height: 120px;
  transition: transform 0.5s ease;
}

.logo_chain:hover {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


@media (max-width: 768px) {
 
  .card_explorer {
  justify-content: center; 
  align-items: center;
 width: 150px;
 height: 184px;
 margin-top: 15%;
 border-radius: 30px;
 margin-left: 100px;
 margin-bottom: 40px;
 background: #212121;
 box-shadow:  10px 5px 30px rgb(25, 25, 25),
 -10px -10px 10px rgb(60, 60, 60);
}

.logo_chain {
width: 120px;
height: 120px;
  transition: transform 0.5s ease;
}



}

</style>