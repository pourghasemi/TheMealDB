<template>
  <div>
    <ul v-if="data?.length">
      <li v-for="category in data" :key="category.idCategory">
        <LinkItem
          :link="`${categoryLink}/${category.strCategory}`"
          :title="category.strCategory"
          :image="category.strCategoryThumb"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MealService from '@/services/MealService.ts'
import LinkItem from '@/components/layout/sidebar/LinkItem.vue'
import useApiLoader from '@/composables/useApiLoader'
import type { ApiLoaderResultCategoryType } from '@/types/types.ts'

const { data, fetchData }: ApiLoaderResultCategoryType = useApiLoader()

const categoryLink = '/category'

onMounted(async () => {
  fetchData(MealService.getAllCategories())
})
</script>
