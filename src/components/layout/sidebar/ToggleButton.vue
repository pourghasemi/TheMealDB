<template>
  <button
    data-drawer-target="sidebar"
    data-drawer-toggle="sidebar"
    aria-controls="sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
  >
    <span class="sr-only">Open sidebar</span>
    <ToggleButtonIcon />
    <div
      @click="toggleSidebar"
      v-if="hiddenSidebar"
      drawer-backdrop=""
      class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToggleButtonIcon from '@/components/icons/ToggleButtonIcon.vue'

let hiddenSidebar = ref(false)

const toggleSidebar = () => {
  hiddenSidebar.value = !hiddenSidebar.value
}
</script>
