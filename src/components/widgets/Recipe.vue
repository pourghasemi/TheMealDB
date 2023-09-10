<template>
  <div class="flex flex-col md:flex-row">
    <div class="flex-1 max-w-[400px] mx-auto md:mr-8">
      <h1 v-if="title" class="mb-6 text-2xl">{{ title }}</h1>

      <img :src="image" class="rounded-md mr-4 mb-4" :alt="title" />
    </div>
    <div class="flex-1" v-if="foods?.length">
      <h2 class="text-2xl mb-2" v-if="foodsTitle">{{ foodsTitle }}</h2>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="food in foods" :key="food.title">
          <Card :image="food.image" :link="food.link" :title="food.title" :measure="food.measure" />
        </div>
      </div>
    </div>
  </div>

  <div class="text-center max-w-[800px] m-auto my-8">
    <h2 class="text-2xl mb-2" v-if="descriptionTitle">{{ descriptionTitle }}</h2>
    <p v-for="(instruction, index) in description.split('.').slice(0)" :key="index">
      {{ instruction }}.
    </p>
  </div>

  <div v-if="video" class="mb-6 max-w-[800px] m-auto">
    <VideoPlayer :videoId="video" />
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/widgets/VideoPlayer.vue'
import Card from '@/components/widgets/Card.vue'

const props = defineProps({
  foods: {
    type: Array as () => { image: string; link: string; title: string; measure: string }[],
    default: () => []
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  image: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  video: {
    type: String,
    default: ''
  },
  foodsTitle: {
    type: String,
    default: ''
  },
  descriptionTitle: {
    type: String,
    default: ''
  }
})
</script>
