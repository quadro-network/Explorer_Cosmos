<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { useBaseStore, useFormatter } from '@/stores';
const props = defineProps(['chain']);

const tab = ref('blocks');

const base = useBaseStore()

const format = useFormatter();

const list = computed(() => {
    // const recents = base.recents
    // return recents.sort((a, b) => (Number(b.block.header.height) - Number(a.block.header.height)))
    return base.recents
})
</script>
<template>
 
</template>
<!-- 
<route>
    {
      meta: {
        i18n: 'blocks',
        order: 5
      }
    }
  </route> -->
