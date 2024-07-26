<script lang="ts" setup>
import MdEditor from 'md-editor-v3';
import PriceMarketChart from '@/components/charts/PriceMarketChart.vue';

import { Icon } from '@iconify/vue';
import {
  useBlockchain,
  useFormatter,
  useTxDialog,
  useWalletStore,
  useStakingStore,
  useParamStore,
} from '@/stores';
import { onMounted, ref } from 'vue';
import { useIndexModule, colorMap } from './indexStore';
import { computed } from '@vue/reactivity';

import CardStatisticsVertical from '@/components/CardStatisticsVertical.vue';
import ProposalListItem from '@/components/ProposalListItem.vue';
import ArrayObjectElement from '@/components/dynamic/ArrayObjectElement.vue'
import AdBanner from '@/components/ad/AdBanner.vue';

const props = defineProps(['chain']);

const blockchain = useBlockchain();
const store = useIndexModule();
const walletStore = useWalletStore();
const format = useFormatter();
const dialog = useTxDialog();
const stakingStore = useStakingStore();
const paramStore = useParamStore()
const coinInfo = computed(() => {
  return store.coinInfo;
});

onMounted(() => {
  store.loadDashboard();
  walletStore.loadMyAsset();
  paramStore.handleAbciInfo()
  // if(!(coinInfo.value && coinInfo.value.name)) {
  // }
});
const ticker = computed(() => store.coinInfo.tickers[store.tickerIndex]);

const currName = ref("")
blockchain.$subscribe((m, s) => {
  if (s.chainName !== currName.value) {
    currName.value = s.chainName
    store.loadDashboard();
    walletStore.loadMyAsset();
    paramStore.handleAbciInfo()
  }
});
function shortName(name: string, id: string) {
  return name.toLowerCase().startsWith('ibc/') ||
    name.toLowerCase().startsWith('0x')
    ? id
    : name;
}

const comLinks = [
  {
    name: 'Website',
    icon: 'mdi-web',
    href: store.homepage,
  },
  {
    name: 'Twitter',
    icon: 'mdi-twitter',
    href: store.twitter,
  },
  {
    name: 'Telegram',
    icon: 'mdi-telegram',
    href: store.telegram,
  },
  {
    name: 'Github',
    icon: 'mdi-github',
    href: store.github,
  },
];

// wallet box
const change = computed(() => {
  const token = walletStore.balanceOfStakingToken;
  return token ? format.priceChanges(token.denom) : 0;
});
const color = computed(() => {
  switch (true) {
    case change.value > 0:
      return 'text-customGreen';
    case change.value === 0:
      return 'text-grey-500';
    case change.value < 0:
      return 'text-red-600';
  }
});

function updateState() {
  walletStore.loadMyAsset()
}

function trustColor(v: string) {
  return `text-${colorMap(v)}`
}

const quantity = ref(100)
const qty = computed({
  get: () => {
    return parseFloat(quantity.value.toFixed(6))
  },
  set: val => {
    quantity.value = val
  }
})
const amount = computed({
  get: () => {
    return quantity.value * ticker.value.converted_last.usd || 0
  },
  set: val => {
    quantity.value = val / ticker.value.converted_last.usd || 0
  }
})

</script>

<template>
  <div>
    <div v-if="coinInfo && coinInfo.name" class="#saved rounded shadow">
      <div class="grid grid-cols-2 md:grid-cols-3 p-4">
        <div class="col-span-2 md:col-span-1">
          <div class="text-xl font-semibold text-main">
            {{ coinInfo.name }} (<span class="uppercase">{{
              coinInfo.symbol
            }}</span>)
          </div>
          <div class="text-xs mt-2">
            {{ $t('index.rank') }}:
            <div class="badge text-xs badge-error bg-[#fcebea] dark:bg-[#070707] text-red-400">
              #{{ coinInfo.market_cap_rank }}
            </div>
          </div>

          <div class="my-4 flex flex-wrap items-center">
            <a v-for="(item, index) of comLinks" :key="index" :href="item.href"
              class="link link_style  px-2 py-1 rounded-sm no-underline hover: #saved  hover:bg-grey-950 dark:hover:bg-grey-950 flex items-center">
              <Icon :icon="item?.icon" />
              <span class="ml-1 text-sm uppercase">{{ item?.name }}</span>
            </a>
          </div>

          <div>
            <div class="dropdown dropdown-hover w-full">
              <label>
                <div
                  class="bg-customDark dark:bg-[#141414] flex items-center justify-between px-4 py-2 cursor-pointer rounded">
                  <div>
                    <div  class="font-semibold text-xl text-[#6e6e6d] dark:text-white">
                      {{ ticker?.market?.name || '' }}
                    </div>
                    <div class="text-accent-content text-sm">
                      {{ shortName(ticker?.base, ticker?.coin_id) }}/{{
                        shortName(ticker?.target, ticker?.target_coin_id)
                      }}
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="text-xl font-semibold text-[#6e6e6d] dark:text-white">
                      ${{ ticker?.converted_last?.usd }}
                    </div>
                    <div class="text-sm" :class="store.priceColor">
                      {{ store.priceChange }}%
                    </div>
                  </div>
                </div>
              </label>
              <div class="dropdown-content pt-1">
                <div class="h-64 overflow-auto w-full shadow rounded">
                  <ul class="menu w-full bg-customDark rounded dark:bg-[#141414]">
                    <li v-for="(item, index) in store.coinInfo.tickers" :key="index" @click="store.selectTicker(index)">
                      <div class="flex items-center justify-between hover:#saved">
                        <div class="flex-1">
                          <div class="text-main text-sm" :class="trustColor(item.trust_score)">
                            {{ item?.market?.name }}
                          </div>
                          <div class="text-sm text-grey-50 dark:text-grey-400">
                            {{ shortName(item?.base, item?.coin_id) }}/{{
                              shortName(item?.target, item?.target_coin_id)
                            }}
                          </div>
                        </div>

                        <div class="text-base text-main">
                           ${{ item?.converted_last?.usd }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="flex">
            
              <div class="modal">
                <div class="modal-box">
                  <h3 class="text-lg font-bold">{{ $t('index.price_calculator') }}</h3>
                  <div class="flex flex-col w-full mt-5">
                    <div class="grid h-20 flex-grow card rounded-box place-items-center">
                      <div class="join w-full">
                        <label class="join-item btn">
                          <span class="uppercase">{{ coinInfo.symbol }}</span>
                        </label>
                        <input type="number" v-model="qty" min="0" placeholder="Input a number" class="input grow input-bordered join-item" />
                      </div>
                    </div>
                    <div class="divider">=</div>
                    <div class="grid h-20 flex-grow card rounded-box place-items-center">
                      <div class="join w-full">
                        <label class="join-item btn">
                          <span>USD</span>
                        </label>
                        <input type="number" v-model="amount" min="0" placeholder="Input amount" class="join-item grow input input-bordered" />
                      </div>
                    </div>
                  </div>
                </div>
                <label class="modal-backdrop" for="calculator">{{ $t('index.close') }}</label>
              </div>
              <a class="my-5 !text-white btn grow" :class="{'!btn-base-content': store.trustColor === 'green', '!btn-customGreen': store.trustColor === 'yellow'}" :href="ticker.trade_url"
                target="_blank">
                {{ $t('index.buy') }} {{ coinInfo.symbol || '' }}
              </a>
            </div>
          </div>
        </div>

        <div class="col-span-2">
          <PriceMarketChart />
        </div>
      </div>
      <div class="h-[1px] w-full bg-grey-100 dark:bg-[#141414]"></div>
      <div class="max-h-[250px] overflow-auto p-4 text-sm">
        <MdEditor :model-value="coinInfo.description?.en" previewOnly></MdEditor>
      </div>
      <div class="mx-4 flex flex-wrap items-center">
        <div v-for="tag in coinInfo.categories"
          class="mr-2 mb-4 text-xs bg-grey-100 dark:bg-[#141414] px-3 rounded-full py-1">
          {{ tag }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:!grid-cols-3 lg:!grid-cols-6 mt-4">
      <div v-for="(item, key) in store.stats" :key="key">
        <CardStatisticsVertical v-bind="item" />
      </div>
    </div>

    <AdBanner id="chain-home-banner-ad" unit="banner" width="970px" height="90px" />

    <div v-if="blockchain.supportModule('governance')" class="#saved rounded mt-4 shadow">
      <div class="pool  px-4 pt-4 pb-2 text-lg font-semibold text-main">
      
      </div>
      <div class="px-4 pb-4">
        <ProposalListItem :proposals="store?.proposals" />
      </div>
 
    </div>

    <div style="display: none" class="#saved rounded mt-4 shadow">
      <div class="flex justify-between px-4 pt-4 pb-2 text-lg font-semibold text-main">
        <span class="truncate" >{{ walletStore.currentAddress || 'Not Connected' }}</span>
        <RouterLink v-if="walletStore.currentAddress"
          class="float-right text-sm cursor-pointert link link_style no-underline font-medium"
          :to="`/${chain}/account/${walletStore.currentAddress}`">{{ $t('index.more') }}</RouterLink>
      </div>
      <div class="grid grid-cols-1 md:!grid-cols-4 auto-cols-auto gap-4 px-4 pb-6">
        <div class="bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('account.balance') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.balanceOfStakingToken) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.balanceOfStakingToken) }}
          </div>
        </div>
        <div class="bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('module.staking') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.stakingAmount) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.stakingAmount) }}
          </div>
        </div>
        <div class="bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('index.reward') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.rewardAmount) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.rewardAmount) }}
          </div>
        </div>
        <div class="bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('index.unbonding') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.unbondingAmount) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.unbondingAmount) }}
          </div>
        </div>
      </div>

      <div v-if="walletStore.delegations.length > 0" class="px-4 pb-4 overflow-auto">
        <table class="table table-compact w-full table-zebra">
          <thead>
            <tr>
              <th>{{ $t('account.validator') }}</th>
              <th>{{ $t('account.delegations') }}</th>
              <th>{{ $t('account.rewards') }}</th>
              <th>{{ $t('staking.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in walletStore.delegations" :key="index">
              <td>
                <RouterLink class="link link_style no-underline" :to="`/${chain}/staking/${item?.delegation?.validator_address}`">
                {{
                  format.validatorFromBech32(
                    item?.delegation?.validator_address
                  )
                }}
                </RouterLink>
              </td>
              <td>{{ format.formatToken(item?.balance) }}</td>
              <td>
                {{
                  format.formatTokens(
                    walletStore?.rewards?.rewards?.find(
                      (el) =>
                        el?.validator_address ===
                        item?.delegation?.validator_address
                    )?.reward)
                }}
              </td>
              <td>
                <div>
                  <label for="delegate" class="btn !btn-xs ! #sav1 btn-ghost rounded-sm mr-2"
                    @click="dialog.open('delegate', { validator_address: item.delegation.validator_address }, updateState)">
                    {{ $t('account.btn_delegate') }}
                  </label>
                  <label for="withdraw" class="btn !btn-xs ! #sav1 btn-ghost rounded-sm"
                    @click="dialog.open('withdraw', { validator_address: item.delegation.validator_address }, updateState)">
                    {{ $t('index.btn_withdraw_reward') }}
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-3 gap-4 px-4 pb-6 mt-4">
        <label for="PingTokenConvert" class="btn  #sav1 text-white">{{ $t('index.btn_swap') }}</label>
        <label for="send" class="btn !bg-yes !border-yes text-white" @click="dialog.open('send', {}, updateState)">{{ $t('account.btn_send') }}</label>
        <label for="delegate" class="btn !bg-info !border-info text-white"
          @click="dialog.open('delegate', {}, updateState)">{{ $t('account.btn_delegate') }}</label>
        <RouterLink to="/wallet/receive" class="btn !bg-info !border-info text-white hidden">{{ $t('index.receive') }}</RouterLink>
      </div>
      <Teleport to="body">
        <ping-token-convert :chain-name="blockchain?.current?.prettyName" :endpoint="blockchain?.endpoint?.address"
          :hd-path="walletStore?.connectedWallet?.hdPath"></ping-token-convert>
      </Teleport>
    </div>

    <div class="#saved rounded mt-4">
      <div class="px-4 pt-4 pb-2 text-lg font-semibold text-main">
        {{ $t('index.app_versions') }}
      </div>
      <!-- Application Version -->
      <ArrayObjectElement :value="paramStore.appVersion?.items" :thead="false" />
      <div class="h-4"></div>
    </div>

    <div v-if="!store.coingeckoId" class="#saved rounded mt-4">
      <div class="px-4 pt-4 pb-2 text-lg font-semibold text-main">
        {{ $t('index.node_info') }}
      </div>
      <ArrayObjectElement :value="paramStore.nodeVersion?.items" :thead="false" />      
      <div class="h-4"></div>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      i18n: 'dashboard',
      order: 1,
    }
  }
</route>


<style>
.link_style{
  color: white;
}
</style>