import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Ingredient from '@/views/Ingredient.vue'
import NotFound from '@/views/NotFound.vue'
import { SearchType } from '@/types/types'

const router = createRouter({
  history: createWebHistory('/'),
 
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Random',
      component: HomeView,
      meta: {
        pageTitle: 'Random Meal'
      }
    },
    {
      path: '/category/:dynamicSegment',
      name: 'Category',
      component: HomeView,
      props: true,
      meta: {
        pageTitle: null
      }
    },
    {
      path: '/area/:dynamicSegment',
      name: 'Area',
      component: HomeView,
      props: true,
      meta: {
        pageTitle: null
      }
    },
    {
      path: '/meal/:dynamicSegment',
      name: 'Meal',
      component: HomeView,
      props: true,
      meta: {
        pageTitle: 'Search For'
      }
    },
    {
      path: '/ingredient/:dynamicSegment',
      name: 'Ingredient',
      component: Ingredient,
      props: true,
      meta: {
        pageTitle: 'Search For'
      }
    },
    {
      path: '/recipe/:dynamicSegment/:mealName',
      name: 'recipe',
      component: () => import('@/views/RecipeView/[id].vue'),
      props: true,
      meta: {
        pageTitle: ''
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ],
})

export default router
