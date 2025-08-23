<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import mapboxgl from 'mapbox-gl'

  const { data } = await useFetch('/api/groups')

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
  <div class="space-y-3">
    <div v-if="data == undefined || !data?.length" class="text-sm opacity-70">No groups loaded yet.</div>
    <MapboxMap
      map-id="map"
      class="!relative w-full max-h-screen h-[400px] rounded-lg border"
      :options="{
        style: 'mapbox://styles/mapbox/light-v11', // style URL
        center: [-3.5, 54], // starting position
        zoom: 4 // starting zoom
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
      <!-- <MapboxDefaultPopup
        v-if="selectedGroup && selectedGroup.postcodeData && selectedGroup.postcodeData.longitude && selectedGroup.postcodeData.latitude"
        popup-id="selectedGroupPopup"
        :lnglat="[selectedGroup.postcodeData.longitude, selectedGroup.postcodeData.latitude]"
        :options="{
          closeOnClick: false,
          closeButton: false
        }"
      >
        <GroupCard v-if="selectedGroup" :g="selectedGroup" />
      </MapboxDefaultPopup> -->
    </MapboxMap>
    <div
      v-if="selectedGroup"
    >
      <div class="text-sm opacity-50 mb-3 font-medium">🖤 Selected:</div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-xs relative h-full overflow-hidden transition-all hover:bg-muted p-4">
        <GroupCard :g="selectedGroup" />
      </div>
    </div>
    <section>
      <header class="mt-6 mb-3">
        <h2 class="text-lg font-medium">Directory of proto-branches</h2>
      </header>
      <main class="space-y-3">
        <div class="rounded-lg border bg-card text-card-foreground shadow-xs relative h-full overflow-hidden transition-all hover:bg-muted p-4" v-if="data && data?.length" v-for="g in data" :key="g.id" >
          <GroupCard :g="g" />
        </div>
      </main>
    </section>
  </div>
</template>