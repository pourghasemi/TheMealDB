<template>
  <main>
    <h2 class="border-b-2 border-gray-300 pb-3 mb-3">
      {{ $route.meta.pageTitle }} {{ dynamicSegment }}
    </h2>
    <div v-if="isLoading" class="flex justify-center"><Spinner /></div>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" v-if="data">
      <Card
        v-for="meal in data"
        :key="meal.idMeal"
        :title="meal.strMeal"
        :link="`${recipeLink}/${meal.idMeal}`"
        :image="`${meal.strMealThumb}/preview`"
      />
    </ul>
    <NoResult v-if="!isLoading && !data?.length" />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { SearchType } from '@/types/types'
import MealService from '@/services/MealService.ts'
import Card from '@/components/widgets/Card.vue'
import Spinner from '@/components/widgets/Spinner.vue'
import useApiLoader from '@/composables/useApiLoader'
import NoResult from '@/components/widgets/NoResult.vue'

const route = useRoute()
const { isLoading, data, fetchData } = useApiLoader()
const props = defineProps(['dynamicSegment'])
const recipeLink = '/recipe'
type SearchType = keyof typeof SearchType

useHead({
  title: `${props.dynamicSegment || route.name}`,
  meta: [{ name: 'description', content: `About ${props.dynamicSegment || route.name}` }]
})

onMounted(async () => {
  fetchMeals()
})

watch(
  () => route.params,
  () => {
    fetchMeals()
  }
)

async function fetchMeals() {
  await fetchData(
    MealService.searchMeals(SearchType[route.name as SearchType], props.dynamicSegment)
  )
}
</script>
