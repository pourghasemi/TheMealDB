<template>
  <div class="h-full">
    <router-link :to="`${link}`" class="h-full flex text-yellow-600">
      <div class="flex flex-col w-full">
        <div class="overflow-hidden min-h-8 flex-1 bg-gray pt-8 text-center">
          <div class="w-[70%] m-auto h-full rounded-md">
            <img :src="image" :alt="title" class="w-full rounded-md" />
          </div>
        </div>
        <div class="flex-none mt-4">
          <div class="h-[74px] flex justify-center">
            <h3 class="text-center px-2">{{ measure }} {{ title }}</h3>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  link: String,
  image: String,
  measure: String
})
</script>
