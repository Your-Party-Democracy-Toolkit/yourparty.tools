<script setup>
const { g } = defineProps(['g'])
const links = computed(() => {
  // Get a list of URLs from g.json['Links'].
  // Then return a list of strings
  if (!g.json['Links']?.length) return []
  const urls = g.json['Links'].match(/https?:\/\/[^\s]+/g) || []
  return urls.map((url) => url.replace("<", "").replace(">", "").trim())
})
const furtherInformation = computed(() => (g.json['Further Information'] || "").trim())
</script>

<template>
  <div class="link space-y-4" id="group-{{ g.id }}">
    <h4 class="font-medium text-lg">❤️ &nbsp; {{ g.name }}</h4>

    <div v-autolink v-if="!!furtherInformation?.length" class="italic">{{ furtherInformation }}</div>

    <div v-if="!!links?.length">
      <div class="font-medium">Links</div>
      <ul class="list-disc list-inside">
        <li v-for="link in links" :key="link" class="overflow-hidden text-ellipsis whitespace-nowrap">
          <span v-autolink>{{ link }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>