import axios from 'axios'
import { API_URL, IMAGE_URL } from './config'
import type { Meal, MealCategory, MealArea, Ingredient } from '../types/types'
import { SearchType } from '../types/types'

export default {
  async getAllCategories(): Promise<MealCategory | null> {
    try {
      const response = await axios.get(`${API_URL}categories.php`)
      return response.data.categories
    } catch (error) {
      this.handleError(error)
      return null
    }
  },

  async getRandomMeals(): Promise<Meal[]> {
    try {
      const response = await axios.get(`${API_URL}random.php`)
      return response.data.meals
    } catch (error) {
      this.handleError(error)
      return []
    }
  },

  async getRecipe(id: string): Promise<Meal | null> {
    try {
      const response = await axios.get(`${API_URL}lookup.php?i=${id}`)
      const meal: Meal = await this.mapMealResponseToMealModel(response.data.meals[0])
      return meal
    } catch (error) {
      this.handleError(error)
      return null
    }
  },

  async getMealsByCategory(name: string): Promise<Meal[]> {
    try {
      const response = await axios.get(`${API_URL}filter.php?c=${name}`)
      return response.data.meals
    } catch (error) {
      this.handleError(error)
      return []
    }
  },

  async getMealsByName(name: string): Promise<Meal[]> {
    try {
      const response = await axios.get(`${API_URL}search.php?s=${name}`)
      return response.data.meals
    } catch (error) {
      this.handleError(error)
      return []
    }
  },

  async getMealsByArea(name: string): Promise<Meal[]> {
    try {
      const response = await axios.get(`${API_URL}filter.php?a=${name}`)
      return response.data.meals
    } catch (error) {
      this.handleError(error)
      return []
    }
  },

  async getMealsByIngredient(name: string | string[]): Promise<Meal[]> {
    try {
      const response = await axios.get(`${API_URL}filter.php?i=${name}`)
      return response.data.meals
    } catch (error) {
      this.handleError(error)
      return []
    }
  },

  async getAreas(): Promise<MealArea | null> {
    try {
      const response = await axios.get(`${API_URL}list.php?a=list`)
      return response.data.meals
    } catch (error) {
      this.handleError(error)
      return null
    }
  },

  async mapMealResponseToMealModel(data: any): Promise<Meal> {
    const mealIngredients: Meal = {
      idMeal: data.idMeal,
      strMeal: data.strMeal,
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealThumb,
      strYoutube: this.extractYoutubeVideoId(data.strYoutube),
      ingredients: this.extractIngredients(data)
    }

    return mealIngredients
  },

  extractYoutubeVideoId(youtubeUrl: string): string {
    return youtubeUrl.split('=')[1]
  },

  extractIngredients(data: any): Ingredient[] {
    const ingredients: Ingredient[] = []

    // Iterate over the properties in the 'data' object
    for (let key in data) {
      // Check if the property exists and its name starts with 'strIngredient'
      if (data[key] && key.startsWith('strIngredient')) {
        // Extract the ingredient number from the property name
        const ingredientNumber = key.replace('strIngredient', '')
        // Get the ingredient name from the 'data' object
        const ingredient = data[key]
        // Generate the URL for the ingredient image using the ingredient name
        const ingredientImageUrl = `${IMAGE_URL}/ingredients/${ingredient}-Small.png`
        const ingredientLink = `/ingredient/${ingredient}`
        // Get the measurement for the current ingredient using the ingredient number
        const ingredientMeasure = data[`strMeasure${ingredientNumber}`]

        const ingredientModel = this.mapIngredientResponseToIngredientModel(
          ingredient,
          ingredientImageUrl,
          ingredientLink,
          ingredientMeasure
        )

        ingredients.push(ingredientModel)
      }
    }

    return ingredients
  },

  mapIngredientResponseToIngredientModel(
    title: string,
    image: string,
    link: string,
    measure: string = ''
  ): Ingredient {
    return {
      title,
      measure,
      image,
      link
    }
  },

  handleError(error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error:', error.message)
    }
  },

  async loadMeals(searchQuery: string, searchType: number) {
    const results = await this.searchMeals(searchType, searchQuery)
    if (results) {
      return results.map((result: any) => {
        return { name: result.strMeal, link: `/recipe/${result.idMeal}` }
      })
    }
    return null
  },

  // Search for meals based on the specified search type and query
  async searchMeals(searchType: number, searchQuery: string = ''): Promise<Meal[]> {
    switch (searchType) {
      // If the search type is Random, fetch random meals
      case SearchType.Random:
        return this.getRandomMeals()

      // If the search type is Meal, fetch meals by name
      case SearchType.Meal:
        return this.getMealsByName(searchQuery)

      // If the search type is Ingredient, fetch meals by ingredient
      case SearchType.Ingredient:
        return this.getMealsByIngredient(searchQuery)

      // If the search type is Category, fetch meals by category
      case SearchType.Category:
        return this.getMealsByCategory(searchQuery)

      // If the search type is Area, fetch meals by area
      case SearchType.Area:
        return this.getMealsByArea(searchQuery)

      // Handle the case where searchType is not recognized
      default:
        return []
    }
  }
}
