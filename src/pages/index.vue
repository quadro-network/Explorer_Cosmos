<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import {
  useDashboard,
  LoadingStatus,
  type ChainConfig,
} from '@/stores/useDashboard';
import ChainSummary from '@/components/ChainSummary.vue';
import AdBanner from '@/components/ad/AdBanner.vue';

import { computed, onMounted, ref } from 'vue';
import { useBlockchain } from '@/stores';

const dashboard = useDashboard();

const keywords = ref('');
const chains = computed(() => {
  if (keywords.value) {
    const lowercaseKeywords = keywords.value.toLowerCase();

    return Object.values(dashboard.chains).filter(
      (x: ChainConfig) => x.chainName.toLowerCase().indexOf(lowercaseKeywords) > -1 
      || x.prettyName.toLowerCase().indexOf(lowercaseKeywords) > -1
    );
  } else {
    return Object.values(dashboard.chains);
  }
});

const featured = computed(() => {
  const names = ["cosmos", "osmosis", "akash", "celestia", "evmos", "injective", "dydx", "noble"];
  return chains.value
    .filter(x => names.includes(x.chainName))
    .sort((a, b)=> (names.indexOf(a.chainName) - names.indexOf(b.chainName)))
})

const chainStore = useBlockchain()

</script>
<template>
  <div class="">
    <div class="flex md:flex-row flex-col items-center justify-center mb-6 mt-14 gap-2">
      <div class="w-80 rounded-full overflow-hidden" style="user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">
  <img class="w-full h-full" src="https://assets.quadro.network/img/me.png" style="width: 280px; height: 230px; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;" />
</div>

</div>

    <div class="text-center text-base">
      <p class="mb-1">
        {{ $t('pages.slogan') }}
      </p>
    </div>
    <div
      v-if="dashboard.status !== LoadingStatus.Loaded"
      class="flex justify-center"
    >
      <progress class="progress progress-info w-80 h-1"></progress>
    </div>

    <div v-if="featured.length>0" class="text-center text-base mt-6  #saved">
      <h2 class="mb-6"> Recommended Blockchains 🪩 </h2>
    </div>

    <div v-if="featured.length>0"
      class="grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5"
    >
    <ChainSummary
        v-for="(chain, index) in featured"
        :key="index"
        :name="chain.chainName"
      />
    </div>

    <AdBanner id="home-banner-ad" unit="banner" width="970px" height="90px" />

    <div class="text-center text-base mt-6  #saved">
      <h2 class="mb-6">{{ $t('pages.description') }}</h2>
    </div>




    <!-- <div class="flex items-center rounded-lg #saved  border border-grey-200 dark:border-grey-700 mt-10">
      <Icon icon="mdi:magnify" class="text-2xl text-grey-400 ml-3"/>
      <input :placeholder="$t('pages.search_placeholder')" class="px-4 h-10 bg-transparent flex-1 outline-none text-base" v-model="keywords" />
      <div class="px-4 text-base hidden md:!block">{{ chains.length }}/{{ dashboard.length }}</div>
    </div> -->


    <div class="search-box">
    <div class="chain-box">
  
      <input
     
      v-model="keywords"
      type="text" name=""  required="" >
      <label>Search Chain Name</label>
      
    </div>
</div>
<!-- <div class="px-4 text-base hidden md:!block">{{ chains.length }}/{{ dashboard.length }}</div> -->


    <div
      class="grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5"
    >
      <ChainSummary
        v-for="(chain, index) in chains"
        :key="index"
        :name="chain.chainName"
      />
    </div>
  </div>
</template>

<style scoped>
 .logo path{
  fill: #000000;
}


.search-box {
  position: relative;
  margin-top: 5%;
  left: 50%;
  width: 400px;

  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.search-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.search-box .chain-box {
  position: relative;
}

.search-box .chain-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.search-box .chain-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.search-box .chain-box input:focus ~ label,
.search-box .chain-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #c9f31d;
  font-size: 12px;
}




</style>


