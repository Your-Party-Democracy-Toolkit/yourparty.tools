<template>
  <div class="flex size-full items-start justify-start border-[12px] border-solid bg-gray-50">
    <div class="flex h-full items-start justify-start">
      <div class="flex size-full flex-col justify-between p-20 text-left w-full gap-3">
        <span class="text-4xl text-left font-bold w-full">❤️ Your Party democracy toolkit</span>
        <h1 class="text-[80px] font-black w-full">
          {{ title }}
        </h1>
        <div class="text-4xl font-thin text-gray-500  w-full">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  description?: string;
}>(), {
  title: 'title',
});
</script>