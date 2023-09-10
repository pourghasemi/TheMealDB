import axios from 'axios'

import { API_URL, IMAGE_URL } from '@/services/config'
import service from '@/services/MealService'
import { SearchType } from '@/types/types'

jest.mock('axios')

describe('MealServiceAPITest', () => {
  test('should fetch and return meals for an area', async () => {
    axios.get.mockResolvedValueOnce({ data: { meals: ['Chicken', 'Pasta'] } })

    const expectedMeals = ['Chicken', 'Pasta']

    const result = await service.getAreas()

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}list.php?a=list`)
    expect(result).toEqual(expectedMeals)
  })

  test('should handle errors and return null while fetching areas', async () => {
    const mockError = new Error('Server error')
    axios.get.mockRejectedValueOnce(mockError)

    console.error = jest.fn()

    const result = await service.getAreas()

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}list.php?a=list`)
    expect(console.error).toHaveBeenCalledWith('Error:', 'Server error')
    expect(result).toBeNull()
  })

  test('should fetch and return categories on success', async () => {
    axios.get.mockResolvedValueOnce({ data: { categories: ['beef', 'dessert'] } })

    const expectedMeals = ['beef', 'dessert']

    const result = await service.getAllCategories()

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}categories.php`)
    expect(result).toEqual(expectedMeals)
  })

  it('should return meals by name for searchType = meal', async () => {
    const searchQuery = 'Chicken'
    const searchType = SearchType.Meal
    axios.get.mockResolvedValueOnce({ data: { meals: ['Chicken 1', 'Chicken 2'] } })

    const expectedMeals = ['Chicken 1', 'Chicken 2']

    const result = await service.searchMeals(searchType, searchQuery)

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}search.php?s=${searchQuery}`)
    expect(result).toEqual(expectedMeals)
  })

  it('should return meals by filter ingredient for searchType = ingredient', async () => {
    const searchQuery = 'Tomato'
    const searchType = SearchType.Ingredient

    axios.get.mockResolvedValueOnce({ data: { meals: ['Pizza1', 'Pizza2'] } })

    const expectedMeals = ['Pizza1', 'Pizza2']

    const result = await service.searchMeals(searchType, searchQuery)

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}filter.php?i=${searchQuery}`)
    expect(result).toEqual(expectedMeals)
  })

  it('should return meals by category name for searchType = category', async () => {
    const searchQuery = 'Desserts'
    const searchType = SearchType.Category

    axios.get.mockResolvedValueOnce({ data: { meals: ['Dessert 1', 'Dessert 2'] } })

    const expectedMeals = ['Dessert 1', 'Dessert 2']

    const result = await service.searchMeals(searchType, searchQuery)

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}filter.php?c=${searchQuery}`)
    expect(result).toEqual(expectedMeals)
  })

  it('should return meals by filter area for searchType = area', async () => {
    const searchQuery = 'Italian'
    const searchType = SearchType.Area

    axios.get.mockResolvedValueOnce({ data: { meals: ['Pizza', 'Pasta'] } })

    const expectedMeals = ['Pizza', 'Pasta']

    const result = await service.searchMeals(searchType, searchQuery)

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}filter.php?a=${searchQuery}`)
    expect(result).toEqual(expectedMeals)
  })

  it('should return an empty array for an unrecognized searchType', async () => {
    const searchQuery = 'Invalid Query'
    const searchType = 99

    const result = await service.searchMeals(searchType, searchQuery)

    expect(result).toEqual([])
  })

  it('should map meal response to meal model', async () => {
    const data = {
      idMeal: '1',
      strMeal: 'Sample Meal',
      strInstructions: 'Sample instructions',
      strMealThumb: 'sample.jpg',
      strYoutube: 'youtube.com?v=123',
      strIngredient1: 'Ingredient 1',
      strMeasure1: '1 cup'
    }

    const expectedMeal = {
      idMeal: '1',
      strMeal: 'Sample Meal',
      strInstructions: 'Sample instructions',
      strMealThumb: 'sample.jpg',
      strYoutube: '123',
      ingredients: [
        {
          title: 'Ingredient 1',
          image: `${IMAGE_URL}/ingredients/Ingredient 1-Small.png`,
          link: '/ingredient/Ingredient 1',
          measure: '1 cup'
        }
      ]
    }
    const meal = await service.mapMealResponseToMealModel(data)
    expect(meal).toEqual(expectedMeal)
  })
})
