<script setup lang="ts">
  const { data } = await useFetch('/api/groups')

  const totalGroups = computed(() => data.value?.length || 0)

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

  // on change of selectedGroup, scroll to that group in the list
  watch(selectedGroup, (newVal) => {
    if (newVal) {
      const group = document.getElementById(`group-${newVal.id}`)
      if (group) {
        group.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })


  useMapbox('map', (map) => {
    map.on('load', () => {
      // on change of selectedGroup, scroll to that group in the list
      watch(selectedGroup, (newVal: any) => {
        if (newVal && newVal.postcodeData && newVal.postcodeData.longitude && newVal.postcodeData.latitude) {
          map.flyTo({
            center: [newVal.postcodeData.longitude, newVal.postcodeData.latitude],
          })
        }
      })
    })
  })
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
        <MapboxGeolocateControl position="top-left" />
        <MapboxGeocoder ref="geocoderRef" />
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
      <section>
        <main class="space-y-8">
          <header class='mb-3'>
            <h2 class="text-3xl font-medium">
              <span class="focus:ring-ring inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/80 border-transparent rounded-md px-1.5 py-0.5 font-normal leading-none">{{ totalGroups }}</span> proto-branches
            </h2>
          </header>
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
                class="cursor-pointer scroll-mt-36 rounded-lg border bg-card text-card-foreground shadow-xs relative h-full overflow-hidden transition-all hover:bg-muted p-4"
                :class="{ 'border-foreground border-2 [&_.link_a]:!text-red-500': selectedGroup && selectedGroup.id === g.id }"
                :id="`group-${g.id}`"
                @click="selectGroup(g)"
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