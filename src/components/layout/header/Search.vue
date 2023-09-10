<template>
  <div
    class="flex flex-row align-middle max-w-md m-auto mb-2 border-2 bg-zinc-100 rounded-[30px] px-[15px] border-gray-200 text-black"
  >
    <Autocomplete
      :source="searchResults"
      v-model="searchQuery"
      @searchQuery="getSearchQuery"
      class="flex-1"
    />
    <Dropdown
      :list="searchTypeList"
      v-model="selectedCategory"
      defaultValue="Meal"
      @handleSelectedItem="updateSelectedCategory"
    />
    <SearchIcon />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Autocomplete from '@/components/widgets/Autocomplete.vue'
import Dropdown from '@/components/widgets/Dropdown.vue'
import MealService from '@/services/MealService'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useRouter } from 'vue-router'
import type { MealSearchItem } from '@/types/types'
import { SearchType } from '@/types/types'

const searchTypeList = Object.entries(SearchType)
  .filter(([key, value]) => key !== 'Random')
  .map(([key]) => key)

const searchQuery = ref<string>('')
const selectedCategory = ref<string>('Meal')
type SearchType = keyof typeof SearchType

const searchResults = ref<MealSearchItem[]>([])
let selectedType = ref(SearchType)

const router = useRouter()

const getSearchQuery = (searchKey: string) => {
  router.push({ name: selectedCategory.value.toString(), params: { dynamicSegment: searchKey } })
}

const updateSelectedCategory = (type: string) => {
  selectedCategory.value = type
  if (searchQuery.value)
    router.push({
      name: selectedCategory.value.toString(),
      params: { searchItem: searchQuery.value }
    })
}

watch([searchQuery, selectedType], async () => {
  searchResults.value = await MealService.loadMeals(
    searchQuery.value,
    SearchType[selectedCategory.value as SearchType]
  )
})
</script>
