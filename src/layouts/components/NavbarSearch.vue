<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useBlockchain } from '@/stores';
const vueRouters = useRouter();
const blockStore = useBlockchain();
let searchModalShow = ref(false);
let searchQuery = ref('');
let errorMessage = ref('');
onMounted(() => {});

function closeSearchModal() {
  searchModalShow.value = false;
}
function openSearchModal() {
  searchModalShow.value = true;
}

function preventClick(event: any) {
  event.preventDefault();
  event.stopPropagation();
}
function confirm() {
  errorMessage.value = '';
  const key = searchQuery.value;
  if (!key) {
    errorMessage.value = 'Please enter a value!';
    return;
  }
  const height = /^\d+$/;
  const txhash = /^[A-Z\d]{64}$/;
  const addr = /^[a-z\d]+1[a-z\d]{38,58}$/;

  const current = blockStore?.current?.chainName || '';
  const routeParams = vueRouters?.currentRoute?.value;

  if (!Object.values(routeParams?.params).includes(key)) {
    if (height.test(key)) {
      vueRouters.push({ path: `/${current}/block/${key}` });
      setTimeout(() => {
        closeSearchModal();
      }, 1000);
    } else if (txhash.test(key)) {
      vueRouters.push({ path: `/${current}/tx/${key}` });
      setTimeout(() => {
        closeSearchModal();
      }, 1000);
      //     this.$router.push({ name: 'transaction', params: { chain: c.chain_name, hash: key } })
    } else if (addr.test(key)) {
      vueRouters.push({ path: `/${current}/account/${key}` });
      setTimeout(() => {
        closeSearchModal();
      }, 1000);
    } else {
      errorMessage.value = 'The input not recognized';
    }
  }
}
</script>
<template>
 
    <button
      class="btn btn-ghost btn-circle btn-sm mx-1"
      @click="confirm"
    >
      <Icon
        icon="mdi:magnify"
        class="text-2xl text-grey-500 dark:text-grey-400"
      />
    </button>
    <div class="flex search_tx items-center rounded-lg border border-grey-200 dark:border-grey-700 mt-3">
  <input 
    placeholder="Height/Transaction/Account Address"
    @keyup.enter="confirm"
    class="px-4 h-10 bg-transparent flex-1 search_tx outline-none text-base"  
    v-model="searchQuery" 
  />
  <div class="px-4 text-base hidden md:!block mr-4">
    <div
      class="mt-2 text-right text-sm text-error"
      v-show="errorMessage"
    >
      {{ errorMessage }}
    </div>
  </div>
</div>




</template>


<style scoped>
.right-margin {
  right: 50%; 
}

@media (max-width: 768px) {
 
  .search_tx {
 font-size: 13px;
 width: 200px;
 margin-right: 10%;
}
}

</style>