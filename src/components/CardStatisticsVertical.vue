<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { controlledComputed } from '@vueuse/core'

interface Props {
  title: string;
  color?: string;
  icon: string;
  stats: string;
  change?: number;
 subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'customGreen',
});

const isPositive = controlledComputed(
  () => props.change,
  () => Math.sign(props.change || 0) === 1
);
</script>

<template>
  <div class="#saved cardStatistic text-secondary shadow rounded p-4">
    <div  class="flex items-center justify-center">
      <div 
        v-if="props.icon"
        class="relative w-15 h-15 rounded overflow-hidden flex items-center justify-center"
      >
        <Icon :class="[`text-${props?.color}`]"  :icon="props.icon" size="32" />
        <div
          class="absolute top-0 left-0 bottom-0 right-0 opacity-20"
          :class="[`bg-${props?.color}`]"
        ></div>
      </div>

      <div
        v-if="props.change"
        :class="isPositive ? 'text-base-content' : 'text-error'"
        class="flex items-center text-secondary text-sm font-semibold"
      >
        <span>{{ isPositive ? `+${props.change}` : props.change }}%</span>
        <Icon :icon="isPositive ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
      </div>
    </div>

    <div class="">
      <h6 class="text-lg text-center font-semibold mt-2 mb-1">
        {{ props.stats || '-'}}
      </h6>
      <p class="text-sm title2 text-center">
        {{ props.title }}
      </p>

      <div v-if="props.subtitle" size="x-small" class="font-semibold">
        <span class="truncate">{{ props.subtitle }}</span>
      </div>
    </div>
  </div>
</template>
