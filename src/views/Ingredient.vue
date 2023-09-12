<template>
  <div class="text-center" v-if="isLoading"><Spinner /></div>

  <div v-if="!isLoading && meals?.length">
    <div class="text-center">
      <Recipe
        :title="(route.params.dynamicSegment as string)"
        :foods="meals"
        foodsTitle="Meals"
        :image="`${IMAGE_URL}/ingredients/${route.params.dynamicSegment}.png`"
      />
    </div>
  </div>
  <NoResult v-if="!isLoading && !meals?.length" />
</template>

<script setup lang="ts">
import { IMAGE_URL } from '@/services/config'
import MealService from '@/services/MealService.ts'
import Spinner from '@/components/widgets/Spinner.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import useApiLoader from '@/composables/useApiLoader'
import useRouteHead from '@/composables/useRouteHead'
import Recipe from '@/components/widgets/Recipe.vue'
import NoResult from '@/components/widgets/NoResult.vue'
import type { Ingredient, Meal, ApiLoaderResultMealsType } from '@/types/types.ts'

const route = useRoute()
const props = defineProps(['dynamicSegment'])

const { isLoading, data, error, fetchData }: ApiLoaderResultMealsType = useApiLoader()
useRouteHead(props);

const meals = ref<Ingredient[] | null>(null)

onMounted(async () => {
  await fetchRecipe()
})

watch(
  () => route.params.dynamicSegment,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await fetchRecipe()
    }
  }
)

async function fetchRecipe() {
  await fetchData(MealService.getMealsByIngredient(route.params.dynamicSegment))
  ProductModel()
}

function ProductModel() {
  if (data.value)
    meals.value = data.value.map((meal: Meal) =>
      MealService.mapIngredientResponseToIngredientModel(
        meal.strMeal,
        meal.strMealThumb,
        `/recipe/${meal.idMeal}/${meal.strMeal}`
      )
    )
}
</script>
