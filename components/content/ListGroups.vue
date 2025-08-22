<script setup lang="ts">
  const { data } = await useAsyncData('groups', () => {
    console.log('querying groups')
    const data = queryCollection('groups').all()
    console.log({data})
    return data
  })
</script>

<template>
  <div class="space-y-3">
    <h3>List component</h3>
    <!-- List of JSON strings -->
    <pre>
      {{ data }}
    </pre>
    <!-- <div v-if="!groups.length" class="text-sm opacity-70">No groups loaded yet.</div>
    <div v-for="g in groups" :key="g.name" class="border rounded p-3">
      <div class="font-medium">{{ g.name }}</div>
      <div class="text-sm opacity-80">
        <span v-if="g.city">{{ g.city }}</span>
        <span v-if="g.region"> · {{ g.region }}</span>
        <span v-if="g.country"> · {{ g.country }}</span>
        <span v-if="g.status"> · {{ g.status }}</span>
      </div>
      <div class="text-sm mt-1 space-x-2">
        <a v-if="g.whatsapp" :href="g.whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        <a v-if="g.facebook" :href="g.facebook" target="_blank" rel="noopener">Facebook</a>
        <a v-if="g.telegram" :href="g.telegram" target="_blank" rel="noopener">Telegram</a>
        <a v-if="g.website" :href="g.website" target="_blank" rel="noopener">Website</a>
      </div>
    </div> -->
  </div>
</template>
