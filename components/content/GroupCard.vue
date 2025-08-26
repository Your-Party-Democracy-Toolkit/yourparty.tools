<script setup>
const { g } = defineProps(['g'])
</script>

<template>
  <div class="link">
    <h4 class="font-medium">{{ g.name }}</h4>
    <p class="text-sm opacity-80">
      <span v-if="g.json" v-autolink>{{ g.json['Additional comments'] }}</span>
      <!-- Uniting principles or constituiton -->
    </p>
    <p class="text-sm opacity-80" v-if="!!g.json['Uniting principles or constituiton'] || !!g.json['Website or other public-facing media']">
      <span class="font-medium">Links:</span>
      <span v-if="g.json['Uniting principles or constituiton']" v-autolink> · {{ g.json['Uniting principles or constituiton'] }}</span>
      <!-- Website or other public-facing media -->
      <span v-if="g.json['Website or other public-facing media']" v-autolink> · {{ g.json['Website or other public-facing media'] }}</span>
    </p>
  </div>
</template>