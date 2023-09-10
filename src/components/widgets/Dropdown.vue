<template>
  <button
    id="dropdownButton"
    @click="toggleDropdown"
    data-dropdown-toggle="dropdown"
    class="bg-transparent text-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button"
  >
    {{ selectedItem }}
    <ArrowIcon class="ml-3" />
  </button>
  <div
    id="dropdown"
    :class="{ hidden: !isDropdownOpen }"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <ul class="text-sm text-gray-700" aria-labelledby="dropdownButton">
      <li v-for="item in list" :key="item" @click="selectItemFromList(item)">
        <a
          href="#"
          @click.prevent="selectItemFromList(item)"
          class="block px-4 py-4 hover:bg-gray-100 text-black"
          >{{ item }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'

const props = defineProps({
  list: Array as () => string[],
  defaultValue: String
})
const emit = defineEmits(['handleSelectedItem'])

const selectedItem = ref(props.defaultValue)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectItemFromList = (value: string) => {
  selectedItem.value = value
  isDropdownOpen.value = false
  emit('handleSelectedItem', value)
}
</script>
