<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import mapboxgl from 'mapbox-gl'

  const { data } = await useFetch('/api/groups')

  const groupedGroups = computed(() => {
    return Object.entries(data.value?.reduce((acc: any, g: any) => {
      const region = g?.postcodeData?.region || "Other"
      acc[region] = acc[region] || []
      acc[region].push(g)
      return acc
    }, {})).map(([region, groups]) => ({
      region,
      groups
    })).sort((a: any, b: any) => a.region.localeCompare(b.region)).reverse()
  })

  const selectedGroup = useState('selectedGroup', () => null)

  function selectGroup(g: any) {
    if (selectedGroup.value && selectedGroup.value.id === g.id) {
      selectedGroup.value = null
    } else {
      selectedGroup.value = g
    }
  }
</script>

<template>
  <div v-if="data == undefined || !data?.length" class="text-sm opacity-70">No groups loaded yet.</div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    <div class='w-full min-h-[200px]'>
      <div class='sticky top-0 max-h-full min-h-[200px] h-[400px] md:h-screen'>
      <MapboxMap
        map-id="map"
        class="!absolute w-full max-w-screen rounded-lg border overflow-hidden"
        :options="{
          style: 'mapbox://styles/mapbox/light-v11', // style URL
          center: [-3, 53.5], // starting position
          zoom: 5.5 // starting zoom
        }"
      >
        <template v-if="data && data?.length" v-for="g in data">
          <MapboxDefaultMarker
            v-if="g && g.id && g.postcodeData && g.postcodeData.longitude && g.postcodeData.latitude"
            :key="g.id"
            :marker-id="g.id"
            :lnglat="[g.postcodeData.longitude, g.postcodeData.latitude]"
          >
            <template #marker>
              <div @click="selectGroup(g)">
                <span class="text-4xl" v-if="selectedGroup && selectedGroup.id === g.id">🖤</span>
                <span class="text-2xl" v-else>❤️</span>
              </div>
            </template>
          </MapboxDefaultMarker>
          </template>
        </MapboxMap>
      </div>
    </div>
    <aside>
      <div
        v-if="selectedGroup"
      >
        <div class="text-sm opacity-50 mb-3 font-medium">🖤 Selected:</div>
        <div class="rounded-lg border bg-card text-card-foreground shadow-xs relative h-full overflow-hidden transition-all hover:bg-muted p-4">
          <GroupCard :g="selectedGroup" />
        </div>
      </div>
      <section>
        <main class="space-y-8">
          <section
            v-if="data && data?.length"
            v-for="gg in groupedGroups"
            :key="gg.region"
          >
            <h3 class="text-2xl font-medium mb-3">{{ gg.region }}</h3>
            <div class="space-y-3">
              <article
                v-for="g in gg.groups"
                :key="g.id"
                class="rounded-lg border bg-card text-card-foreground shadow-xs relative h-full overflow-hidden transition-all hover:bg-muted p-4"
              >
                <GroupCard :g="g" />
              </article>
            </div>
          </section>
        </main>
      </section>
    </aside>
  </div>
</template>