<template>
  <router-link :to="link" class="flex px-4 py-2 text-white">
    <img v-if="image" :src="image" class="w-[30px] rounded mr-4" :alt="title" />
    {{ title }}
  </router-link>
</template>

<script setup>
const Props = defineProps({
  title: String,
  link: String,
  image: String
})
</script>

<style scoped>
.active {
  background: rgba(0, 0, 0, 0.2);
}
</style>
