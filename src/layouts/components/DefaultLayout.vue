<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

// Components
import newFooter from '@/layouts/components/NavFooter.vue';

import NavbarSearch from '@/layouts/components/NavbarSearch.vue';
import ChainProfile from '@/layouts/components/ChainProfile.vue';

import { useDashboard } from '@/stores/useDashboard';
import { useBaseStore, useBlockchain } from '@/stores';

import type { NavGroup, NavLink, NavSectionTitle, VerticalNavItems } from '../types';
import dayjs from 'dayjs';

const dashboard = useDashboard();
dashboard.initial();
const blockchain = useBlockchain();
blockchain.randomSetupEndpoint();
const baseStore = useBaseStore();

const current = ref(''); // the current chain
const temp = ref('')
blockchain.$subscribe((m, s) => {
  if(current.value ===s.chainName && temp.value != s.endpoint.address) {
    temp.value = s.endpoint.address
    blockchain.initial();
  }
  if (current.value != s.chainName) {
    current.value = s.chainName;
    blockchain.randomSetupEndpoint();
  }
});

const sidebarShow = ref(false);
const sidebarOpen = ref(true);

const changeOpen = (index: Number) => {
  if (index === 0) {
    sidebarOpen.value = !sidebarOpen.value;
  }
};
const showDiscord = window.location.host.search('Quadro.Network') > -1;

function isNavGroup(nav: VerticalNavItems | any): nav is NavGroup {
   return (<NavGroup>nav).children !== undefined;
}
function isNavLink(nav: VerticalNavItems | any): nav is NavLink {
   return (<NavLink>nav).to !== undefined;
}
function isNavTitle(nav: VerticalNavItems | any): nav is NavSectionTitle {
   return (<NavSectionTitle>nav).heading !== undefined;
}
function selected(route: any, nav: NavLink) {
  const b = route.path === nav.to?.path || route.path.startsWith(nav.to?.path) && nav.title.indexOf('dashboard') === -1
  return b
}
const blocktime = computed(() => {
  return dayjs(baseStore.latest?.block?.header?.time)
});

const behind = computed(() => {
  const current = dayjs().subtract(10, 'minute')
  return blocktime.value.isBefore(current)
});

dayjs()

</script>

<template>
  <div class="items-center #new1">
    <!-- sidebar -->
    <div
      class="w-64 fixed z-50 left-0 top-0 bottom-0 overflow-auto backdrop-blur-md  dark:border-grey-700"
      :class="{ block: sidebarShow, 'hidden xl:!block': !sidebarShow }"
    >
      <div class="flex justify-between mt-1 pl-4 py-4 mb-1">
        <RouterLink to="/" class="flex items-center">
          <img class="w-100 h-10" src="https://assets.quadro.network/img/icon_min_white.png" />
         
        </RouterLink>
        <div
          class="pr-4 cursor-pointer xl:!hidden"
          @click="sidebarShow = false"
        >
          <Icon icon="mdi-close" class="text-2xl" />
        </div>
      </div>
      <div
        v-for="(item, index) of blockchain.computedChainMenu"
        :key="index"
        class="px-2 items-center"
      >
        <div
          v-if="isNavGroup(item)"
          :tabindex="index"
          class="collapse"
          :class="{
            'collapse-arrow':index > 0 && item?.children?.length > 0,
            'collapse-open': index === 0 && sidebarOpen,
            'collapse-close': index === 0 && !sidebarOpen,
          }"
        >
          <input
            v-if="index > 0"
            type="checkbox"
            class="cursor-pointer !h-10 block"
            @click="changeOpen(index)"
          />
          <div
            class=" collapse-title !py-0 px-4 flex items-center cursor-pointer "
          >
            <Icon
              v-if="item?.icon?.icon"
              :icon="item?.icon?.icon"
              class="text-xl  mr-2"
              :class="{
                'text-yellow-500': item?.title === 'Favorite',
                'text-blue-500': item?.title !== 'Favorite',
              }"
            />
            <img
              v-if="item?.icon?.image"
              :src="item?.icon?.image"
              class="w-6 h-6 items-center rounded-full mr-3"
            />
            <div
              class="bg-customDark items-center capitalize flex-1  text-customMilk whitespace-nowrap"
            >
              {{ item?.title }}
            </div>
            <div
              v-if="item?.badgeContent"
              class=" badge badge-sm text-white "
              :class="item?.badgeClass"
            >
              {{ item?.badgeContent }}
            </div>
          </div>

          
          <div class="collapse-content">
            <div v-for="(el, key) of item?.children"  class="menu w-full !p-0">
              <RouterLink
    type="button"
    v-if="isNavLink(el)"
    @click="sidebarShow = false"
    class="btn_menu_explorer btn_menu_expl"
    :class="{
      '': selected($route, el),
    }"
    :to="el.to"
  >

    <div
      class="strong text-secondary text-base capitalize dark:text-grey-300"
      :class="{
        '!text-white': selected($route, el),
      }"
    >
      {{ item?.title === 'Favorite' ? el?.title : $t(el?.title) }}
    </div>
  </RouterLink>
     

            </div>
          </div>
        </div>

        <RouterLink
          v-if="isNavLink(item)"
          :to="item?.to"
          @click="sidebarShow = false"
          class="cursor-pointer  hover:bg-customChocko rounded-lg px-4 flex items-center py-2 text-grey-100  "
        >
 
          <div
            class="text-base items-center capitalize flex-1 text-grey-100 dark:text-grey-200 whitespace-nowrap"
          >
            {{ item?.title }}
          </div>
          <div
            v-if="item?.badgeContent"
            class="badge badge-sm text-grey-100 border-none" 
            :class="item?.badgeClass"
          >
            {{ item?.badgeContent }}
          </div>
        </RouterLink>
        <div
          v-if="isNavTitle(item)"
          class="px-4 text-sm text-secondary pb-2 uppercase"
        >
          {{ item?.heading }}
        </div>
      </div>
      <div 
 class="px-2 items-center">

 <div class="px-4 menu w-full text-sm pt-2 text-customGreen pb-2 uppercase">
  <span style="display: inline-block; vertical-align: middle;">
    <img style="width: 20px; height: 20px; display: inline-block; margin-right: 5px; vertical-align: middle;" src="https://assets.quadro.network/img/connection.png" alt="" />
    <span style="display: inline-block; vertical-align: middle;">  Connections:</span>
  </span>
</div>

        <a
          href="https://twitter.com/quadro_network"
          target="_blank"
          class="flex btn_menu_explorer btn_menu_expl items-center py-3 backdrop-blur-md mb-4 rounded px-4 sticky top-0 z-10 text-secondary "
        >
        <img  style="width: 20px; margin-right: 5px; height: 20px;" src="https://assets.quadro.network/img/qr/twitter.svg" alt="" />
          <div
            class=" flex-1 text-links text-grey-100 dark:text-grey-50"
          >
             Twitter
          </div>
        </a>
        
       
        <a
          href="https://github.com/quadro-network"
          target="_blank"
          class="flex btn_menu_explorer btn_menu_expl items-center  py-3 backdrop-blur-md mb-4 rounded px-4 sticky top-0 z-10 text-secondary "
        >
        <img style="width: 20px; margin-right: 5px; height: 20px;" src="https://assets.quadro.network/img/qr/git.svg" alt="" />
          <div
            class="text-base text-links capitalize flex-1  text-grey-100 dark:text-grey-200"
          >
             GitHub
          </div>
        </a>
      </div>
    </div>
    <div class="xl:!ml-64 px-3 pt-4">
      <!-- header -->
      <div
        class="flex items-center py-3 backdrop-blur-md 
 mb-4 rounded px-4 sticky top-0 z-10"
      >
        <div
          class="text-2xl pr-3 cursor-pointer xl:!hidden"
          @click="sidebarShow = true"
        >
          <Icon icon="mdi-menu" />
        </div>

        <ChainProfile />

        <div class="flex-1 w-0"></div>

   
        <NavbarSearch class="!inline-block" />
       
      </div>

      <!-- 👉 Pages -->
      <div style="min-height: calc(100vh - 180px);">
          <div v-if="behind" class="alert alert-error mb-4">
              <div class="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      class="stroke-current flex-shrink-0 w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{{ $t('pages.out_of_sync') }} {{ blocktime.format() }} ({{ blocktime.fromNow() }})</span>
              </div>
          </div>
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>

      <newFooter />
    </div>
  </div>
</template>
<style scoped>
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
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-color: #000000;
  background-origin: border-box;
  background-clip: content-box, border-box;
}

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
  transform: scale(1.1);
  color: #c9f31d;
  border-bottom: #c9f31d solid 2px;
  width: 140px;
  background-color: transparent;
}

.btn_menu_expl:active {
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: transparent;
  transform: scale(0.95);
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
  border-radius: 7rem; 
  width: 165px;
}

.text-links{
  display: flex;
  justify-content: center; 
  align-items: center;
}

</style>
