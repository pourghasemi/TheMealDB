<template>
  <div class="text-center" v-if="isLoading"><Spinner /></div>

  <div v-if="!isLoading">
    <div class="text-center md:text-left">
      <Recipe
        :title="`${data?.strMeal}`"
        :image="data?.strMealThumb"
        :description="data?.strInstructions"
        :foods="data?.ingredients"
        foodsTitle="Ingredients"
        descritionTitle="Meal Instructions"
        :video="data?.strYoutube"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMAGE_URL } from '@/services/config.ts'
import MealService from '@/services/MealService.ts'
import Spinner from '@/components/widgets/Spinner.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import useApiLoader from '@/composables/useApiLoader'
import Recipe from '@/components/widgets/Recipe.vue'
import type { ApiLoaderResultMealType } from '@/types/types.ts'

const route = useRoute()
const { isLoading, data, error, fetchData }: ApiLoaderResultMealType = useApiLoader()

onMounted(async () => {
  await fetchRecipe(route.params.dynamicSegment)
})

watch(
  () => route.params.dynamicSegment,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await fetchRecipe(newId)
    }
  }
)

async function fetchRecipe(id: string | string[]) {
  await fetchData(MealService.getRecipe(id as string))
}
</script>
