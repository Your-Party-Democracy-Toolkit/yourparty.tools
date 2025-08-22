<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mapEl = ref<HTMLElement | null>(null)
let map: any
</script>

<template>
  <div>
    <h3>Map component</h3>
    <div ref="mapEl" class="w-full h-80 rounded-lg border">
    </div>
  </div>
</template>
