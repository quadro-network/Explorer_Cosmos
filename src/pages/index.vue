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
const selectedNetworkType = ref('all');

const chains = computed(() => {
  let filteredChains = Object.values(dashboard.chains);
  if (selectedNetworkType.value !== 'all') {
    filteredChains = filteredChains.filter(chain => chain.network_type === selectedNetworkType.value);
  }
  if (keywords.value) {
    const lowercaseKeywords = keywords.value.toLowerCase();
    filteredChains = filteredChains.filter(
      (x: ChainConfig) => x.chainName.toLowerCase().indexOf(lowercaseKeywords) > -1 
      || x.prettyName.toLowerCase().indexOf(lowercaseKeywords) > -1
    );
  }
  return filteredChains;
});

const featured = computed(() => {
  const names = [""];
  return chains.value
    .filter(x => names.includes(x.chainName))
    .sort((a, b)=> (names.indexOf(a.chainName) - names.indexOf(b.chainName)))
})

const chainStore = useBlockchain()

const setNetworkType = (type: string) => {
  selectedNetworkType.value = type;
};

</script>
<template>
  <div class="">
<<<<<<< HEAD
<<<<<<< HEAD
    <div class="flex avat md:flex-row flex-col items-center justify-center mb-6 mt-14 gap-2">
      <div class="w-80 rounded-full overflow-hidden avat" style="user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">
=======
    <div class="flex md:flex-row flex-col items-center justify-center mb-6 mt-14 gap-2">
      <div class="w-80 rounded-full overflow-hidden" style="user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">
>>>>>>> ce19461 (xXxplorer)
=======
    <div class="flex avat md:flex-row flex-col items-center justify-center mb-6 mt-14 gap-2">
      <div class="w-80 rounded-full overflow-hidden avat" style="user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">
>>>>>>> ac113ca (updated)
        <img class="w-full h-full" src="https://assets.quadro.network/img/me.png" style="width: 280px; height: 230px; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;" />
      </div>
    </div>

    <div class="text-center text-base">
      <p class="mb-1">
        {{ $t('pages.slogan') }}
      </p>
    </div>

    <div v-if="dashboard.status !== LoadingStatus.Loaded" class="flex justify-center">
      <progress class="progress progress-info w-80 h-1"></progress>
    </div>

<<<<<<< HEAD
<<<<<<< HEAD
    <div v-if="featured.length > 0" class="text-center text-base mt-6 #saved">
      <h2 class="mb-6">Recommended Blockchains 🪩</h2>
=======

    <div v-if="featured.length > 0" class="text-center text-base mt-6  #saved">
      <h2 class="mb-6"> Recommended Blockchains 🪩 </h2>
>>>>>>> ce19461 (xXxplorer)
=======
    <div v-if="featured.length > 0" class="text-center text-base mt-6 #saved">
      <h2 class="mb-6">Recommended Blockchains 🪩</h2>
>>>>>>> ac113ca (updated)
    </div>

    <div v-if="featured.length > 0" class="grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5">
      <ChainSummary v-for="(chain, index) in featured" :key="index" :name="chain.chainName" />
    </div>

    <AdBanner id="home-banner-ad" unit="banner" width="970px" height="90px" />

    <div class="text-center text-base mt-6 #saved">
      <h2 class="mb-6">{{ $t('pages.description') }}</h2>
    </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
    
>>>>>>> ce19461 (xXxplorer)
=======
>>>>>>> ac113ca (updated)
    <div class="tabs">
      <button class="btn_menu_explorer text-secondary btn_menu_expl" @click="setNetworkType('all')" :class="{ active: selectedNetworkType === 'all' }">All</button>
      <button class="btn_menu_explorer text-secondary btn_menu_expl" @click="setNetworkType('mainnet')" :class="{ active: selectedNetworkType === 'mainnet' }">Mainnet</button>
      <button class="btn_menu_explorer text-secondary btn_menu_expl" @click="setNetworkType('testnet')" :class="{ active: selectedNetworkType === 'testnet' }">Testnet</button>
<<<<<<< HEAD
<<<<<<< HEAD

      <div class="search-box">
        <div class="chain-box">
          <input v-model="keywords" type="text" name="" required>
          <label>Search Chain Name</label>
        </div>
      </div>
    </div>
=======
    
=======

>>>>>>> ac113ca (updated)
      <div class="search-box">
        <div class="chain-box">
          <input v-model="keywords" type="text" name="" required>
          <label>Search Chain Name</label>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    </div>
 
>>>>>>> ce19461 (xXxplorer)
=======
>>>>>>> ac113ca (updated)

    <div class="grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5">
      <ChainSummary v-for="(chain, index) in chains" :key="index" :name="chain.chainName" />
    </div>
  </div>

  <footer>
    <div class="foot"></div>
  </footer>
</template>

<style scoped>
.tabs {
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 3em;
}

.foot {
  margin-top: 50px;
  height: 100px;
}

.search-box {
<<<<<<< HEAD
<<<<<<< HEAD
  position: absolute; 
=======
  position: absolute; /* Или fixed, если вы хотите, чтобы элемент оставался на месте при прокрутке */
>>>>>>> ce19461 (xXxplorer)
=======
  position: absolute; 
>>>>>>> ac113ca (updated)
margin-bottom: 5em;
  width: 450px;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  display: flex;
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
  width: 200%;
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
  top: 0;
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


.btn_menu_explorer {
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 170px;
  overflow: hidden;
  height: 3rem;
  background-size: 300% 300%;
  transition: 0.5s;
  margin-bottom: 10px;
  border-radius: 4rem;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-color:  #212121;
  background-origin: border-box;
  background-clip: content-box, border-box;
}
<<<<<<< HEAD

strong {
  z-index: 4;
  font-style: normal;
  font-size: 16px;
  margin-left: 2%;
}

.circle-container {
  position: relative;
  width: 100%;
  height: 100%;
  animation: orbit 5s linear infinite;
}

.circle {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  filter: blur(2rem);
}

.circle:nth-of-type(1) {
  background: #c9f31d;
  animation: orbit 8s linear infinite;
}

.btn_menu_explorer:hover {

  color: #c9f31d;
  border-bottom: #c9f31d solid 2px;

  background-color: transparent;
}

.btn_menu_expl:active {
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
  border-radius: 7rem; 
  width: 165px;
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    margin-top: -30px;
  }


  .btn_menu_explorer {
    width: 100%;
    max-width: 200px;
    font-size: 13px;
    margin-right: 50%;
    height:  40px;
  }

  .search-box {
    margin-top: 100px;
    top: 60%;
    right: 50%;
    width: 150px;
    font-size: 10px;
  }
  .search-box .chain-box {
  position: relative;
  font-size: 10px;
}
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}



@media (max-width: 360px) {
  .tabs {
    flex-direction: column;
  }


  .btn_menu_explorer {
    width: 100%;
    max-width: 150px;
    font-size: 10px;
    margin-right: 50%;
  }

  .search-box {
    margin-top: 100px;
    top: 60%;
    width: 150px;
  }
  .search-box .chain-box {
  position: relative;
  font-size: 10px;
}
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
=======
>>>>>>> ce19461 (xXxplorer)

strong {
  z-index: 4;
  font-style: normal;
  font-size: 16px;
  margin-left: 2%;
}

.circle-container {
  position: relative;
  width: 100%;
  height: 100%;
  animation: orbit 5s linear infinite;
}

.circle {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  filter: blur(2rem);
}

.circle:nth-of-type(1) {
  background: #c9f31d;
  animation: orbit 8s linear infinite;
}

.btn_menu_explorer:hover {

  color: #c9f31d;
  border-bottom: #c9f31d solid 2px;

  background-color: transparent;
}

.btn_menu_expl:active {
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
  border-radius: 7rem; 
  width: 165px;
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    margin-top: -30px;
  }


  .btn_menu_explorer {
    width: 100%;
    max-width: 200px;
    font-size: 13px;
    margin-right: 50%;
    height:  40px;
  }

  .search-box {
    margin-top: 100px;
    top: 60%;
    right: 50%;
    width: 150px;
    font-size: 10px;
  }
  .search-box .chain-box {
  position: relative;
  font-size: 10px;
}
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}



@media (max-width: 360px) {
  .tabs {
    flex-direction: column;
  }


  .btn_menu_explorer {
    width: 100%;
    max-width: 150px;
    font-size: 10px;
    margin-right: 50%;
  }

  .search-box {
    margin-top: 100px;
    top: 60%;
    width: 150px;
  }
  .search-box .chain-box {
  position: relative;
  font-size: 10px;
}
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


</style>
