<template>
  <div class="relative max-w-[500px] z-10">
    <input
      type="text"
      placeholder="Search"
      :value="modelValue"
      @input="handleInput"
      @keyup.enter="passSearchQueryToParent"
      class="w-full py-0 px-2 rounded-md border-none bg-transparent h-full"
    />

    <ul
      v-show="searchInput && autocompleteListVisible"
      class="mt-1 rounded-md absolute w-full bg-zinc-50 max-h-[250px] overflow-y-hidden"
    >
      <li v-for="result in source" :key="result.name" @click="selectItemFromSearchList(result)">
        <router-link :to="result.link" class="block p-2">
          {{ result.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  source: {
    type: Array as () => Array<{ name: string; link: string }>,
    required: true,
    default: () => []
  },
  modelValue: String,
  resultsPage: String
})

const emit = defineEmits(['update:modelValue', 'searchQuery'])
const searchInput = ref('')
const autocompleteListVisible = ref(false)

const selectItemFromSearchList = (item: { name: string; link: string }) => {
  autocompleteListVisible.value = false
  searchInput.value = item.name
  emit('update:modelValue', searchInput.value)
}

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  autocompleteListVisible.value = true
  searchInput.value = inputElement.value
  emit('update:modelValue', searchInput.value)
}

const passSearchQueryToParent = (event: KeyboardEvent) => {
  const searchString = event.target instanceof HTMLInputElement ? event.target.value : ''
  autocompleteListVisible.value = false

  if (searchString) emit('searchQuery', searchString)
}

const addClickListener = () => {
  window.addEventListener('click', listenForCloseClick)
}

const removeClickListener = () => {
  window.removeEventListener('click', listenForCloseClick)
}

const listenForCloseClick = () => {
  autocompleteListVisible.value = false
}

watch(autocompleteListVisible, (newValue) => {
  if (newValue) {
    addClickListener()
  } else {
    removeClickListener()
  }
})

onBeforeUnmount(() => {
  removeClickListener()
})
</script>
