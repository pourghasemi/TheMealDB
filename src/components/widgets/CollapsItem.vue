<template>
  <h2 :id="`accordion-collapse-heading-${id}`">
    <button
      type="button"
      class="flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border-0 border-b-1 border-gray-200 bg-black bg-opacity-10 text-white"
      :data-accordion-target="`#accordion-collapse-body-${id}`"
      aria-expanded="true"
      :aria-controls="`accordion-collapse-body-${id}`"
    >
      <span>{{ title }}</span>
      <ArrowIcon />
    </button>
  </h2>
  <div
    :id="`accordion-collapse-body-${id}`"
    class="hidden"
    :aria-labelledby="`accordion-collapse-heading-${id}`"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
const props = defineProps({
  title: String,
  id: String
})
</script>
