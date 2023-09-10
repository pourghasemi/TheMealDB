<template>
  <div>
    <ul>
      <li v-for="area in data" :key="area.strArea">
        <LinkItem :link="`${areaLink}/${area.strArea}`" :title="area.strArea" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import MealService from '@/services/MealService.ts'
import LinkItem from '@/components/layout/sidebar/LinkItem.vue'
import useApiLoader from '@/composables/useApiLoader'
import type { ApiLoaderResultAreaType } from '@/types/types.ts'

const { data, fetchData }: ApiLoaderResultAreaType = useApiLoader()

const areaLink = '/area'

onMounted(async () => {
  fetchData(MealService.getAreas())
})
</script>
