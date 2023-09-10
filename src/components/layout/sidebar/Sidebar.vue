<template>
  <aside
    id="sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="min-h-[100vh] text-white bg-[#382B1F] sm:bg-white sm:bg-opacity-5">
      <Collaps>
        <CollapsItem title="Categories" id="1">
          <Categories />
        </CollapsItem>
        <CollapsItem title="Area" id="2">
          <Areas />
        </CollapsItem>
      </Collaps>
    </div>
  </aside>
</template>

<script setup lang="ts">
import Collaps from '@/components/widgets/Collaps.vue'
import CollapsItem from '@/components/widgets/CollapsItem.vue'
import Areas from '@/components/layout/sidebar/Areas.vue'
import Categories from '@/components/layout/sidebar/Categories.vue'
</script>
