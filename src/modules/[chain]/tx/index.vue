<template>
  <div>
    <div v-show="tab === 'recent'" class="#saved rounded overflow-x-auto">
      <table class="table w-full table-compact">
        <thead class="bg-grey-950 text-customGreen border">
          <tr>
            <th style="position: relative; z-index: 2;">{{ $t('account.height') }}</th>
            <th style="position: relative; z-index: 2;">{{ $t('account.hash') }}</th>
            <th>{{ $t('account.messages') }}</th>
            <th>{{ $t('block.fees') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in base.txsInRecents" :key="index" class="hover">
            <td class="text-sm border #saved">
              <RouterLink :to="`/${props.chain}/block/${item.height}`">{{ item.height }}</RouterLink>
            </td>
            <td class="truncate #saved" width="50%">
              <RouterLink :to="`/${props.chain}/tx/${item.hash}`">{{ item.hash }}</RouterLink>


<!-- 
              <button @click="copyToClipboard(item.hash, index)" class="ml-2 p-1 text-gray-500 hover:text-grey-950 relative">
                <img style="width: 20px; margin-right: 5px; height: 20px;" src="https://assets.quadro.network/img/copy.png" alt="" />
                <span v-if="copiedIndices.includes(index)" class="copied-message">Copied!</span>
              </button> -->


<button  @click="copyToClipboard(item.hash, index)" class="copy">
  <span
  v-if="copiedIndices.includes(index)"
 ></span>
  <span>

    <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 6.35 6.35" y="0" x="0" height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" class="clipboard">
      <g>
        <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
      </g>
    </svg>
    <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 24 24" y="0" x="0" height="18" width="18" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" class="checkmark">
      <g>
        <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
      </g>
    </svg>

    <span v-if="copiedIndices.includes(index)" class="copied-message">Copied!</span>
  </span>
</button>




            </td>
            <td>{{ format.messages(item.tx.body.messages) }}</td>
            <td>{{ format.formatTokens(item.tx.authInfo.fee?.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-show="tab === 'search'" class="#saved rounded overflow-x-auto">
      <div class="p-4">
        <div class="form-control">
          <input v-model="hash" type="text" class="input input-bordered" placeholder="Search by Tx Hash" @blur="search"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useBaseStore, useBlockchain, useFormatter } from '@/stores';
// import type { PaginatedTxs } from '@/types';

const { t } = useI18n();
// const route = useRoute();
const router = useRouter();

const props = defineProps<{ chain: string }>();
const vueRouters = useRouter();
const tab = ref('recent');
const copiedIndices = ref<number[]>([]);

const base = useBaseStore();
const chainStore = useBlockchain();
const format = useFormatter();
const hashReg = /^[A-Z\d]{64}$/;
const hash = ref('');
const current = chainStore?.current?.chainName || '';

onMounted(() => {
  tab.value = String(vueRouters.currentRoute.value.query.tab || 'recent');
  console.log(tab.value);
});

const copyToClipboard = (text: string, index: number) => {
  navigator.clipboard.writeText(text).then(() => {
    copiedIndices.value.push(index);
    setTimeout(() => {
      const i = copiedIndices.value.indexOf(index);
      if (i > -1) copiedIndices.value.splice(i, 1);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};


function search() {
  if (hashReg.test(hash.value)) {
    vueRouters.push({ path: `/${current}/tx/${hash.value}` });
  }
}
</script>



<route>
  {
    meta: {
      i18n: 'tx',
      order: 5
    }
  }
</route>

<style scoped>
.copied-message {
  position: absolute;
  top: 0px;
  right: 0;
  background-color: #c9f31d;
  color: rgb(5, 5, 5);
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  opacity: 0;
  animation: fadeInOut 2s;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
    transform: translateX(-30);
  }
  50% {
    opacity: 1;
    transform: translateX(80px);
  }
}




.copy {
  /* button */
  --button-bg: #353434;
  --button-hover-bg: #464646;
  --button-text-color: #CCCCCC;
  --button-hover-text-color: #c9f31d;
  --button-border-radius: 10px;
  --button-diameter: 36px;
  --button-outline-width: 1px;
  --button-outline-color: rgb(141, 141, 141);
 
}

.copy {
  box-sizing: border-box;
  width: var(--button-diameter);
  height: var(--button-diameter);
  border-radius: var(--button-border-radius);
  background-color: var(--button-bg);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  position: relative;
  outline: none;
  margin-left: 10px;
}


.copy svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkmark {
  display: none;
}

/* actions */

.copy:hover .tooltip,
.copy:focus:not(:focus-visible) .tooltip {
  opacity: 1;
  visibility: visible;
  top: calc((100% + var(--tooltip-offset)) * -1);
}

.copy:focus:not(:focus-visible) .tooltip::before {
  content: attr(data-text-end);
}

.copy:focus:not(:focus-visible) .clipboard {
  display: none;
}

.copy:focus:not(:focus-visible) .checkmark {
  display: block;
}

.copy:hover,
.copy:focus {
  background-color: var(--button-hover-bg);
}

.copy:active {
  outline: var(--button-outline-width) solid var(--button-outline-color);
}

.copy:hover svg {
  color: var(--button-hover-text-color);
}
</style>




