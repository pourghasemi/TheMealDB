import type { Ref } from 'vue'

export interface MealCategory {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export interface Meal {
  idMeal: string
  strMeal: string
  strInstructions?: string
  strMealThumb: string
  strYoutube?: string
  ingredients?: Ingredient[]
}

export interface Ingredient {
  title: string
  measure: string
  image: string
  link: string
}

export interface MealArea {
  strArea: string
}

export interface MealSearchItem {
  name: string,
  link: string
}

interface ApiLoaderResult {
  isLoading: Ref<boolean>
  error: Ref<any | null>
  fetchData: (service: any) => Promise<void>
}

export interface ApiLoaderResultMealsType extends ApiLoaderResult {
  data: Ref<Meal[] | null>
}

export interface ApiLoaderResultMealType extends ApiLoaderResult {
  data: Ref<Meal | null>
}

export interface ApiLoaderResultAreaType extends ApiLoaderResult {
  data: Ref<MealArea[] | null>
}

export interface ApiLoaderResultCategoryType extends ApiLoaderResult {
  data: Ref<MealCategory[] | null>
}

export const SearchType = {
  Random: 0,
  Meal: 1,
  Ingredient: 2,
  Category: 3,
  Area: 4
} as const
