<script setup lang="ts">
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoie1xuIFwiZXhwXCI6IFwiMjAzNS0wOC0yMS0xMC0yNS01Mi0rMDAwMFwiLFxuIFwib3JpZ0lhdFwiOiBcIjIwMjUtMDgtMjMtMTAtMjUtNTItKzAwMDBcIixcbiBcInVzZXJuYW1lXCI6IFwiamFuXCJcbn0ifQ.jTVn9e2H82VLVDayrqcBwnPXZMEfKDK9L4k1Jxgl9O8"
  const { data } = await useAsyncData('groups', async () => {
    const data = await $fetch("https://api.mapped.commonknowledge.coop/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${key}`
      },
      body: {
        query: `
          query {
            genericDataByExternalDataSource(externalDataSourceId:"e3d5eb5c-4a44-478d-8799-054c7dad569f") {
              id
              name
              json
              postcodeData {
                adminWard
                region
                latitude
                longitude
              }
            }
          }
        `
      }
    })
    return data.data.genericDataByExternalDataSource
  })

  // Mapbox
  const mapRef = ref(null)
  onMounted(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29tbW9ua25vd2xlZGdlIiwiYSI6ImNqc3Z3NGZxcDA4NGo0OXA2dzd5eDJvc2YifQ.f68VZ1vlc6s3jg3JgShd0A';
    const map = new mapboxgl.Map({
        container: mapRef,
        style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
        projection: 'globe', // display the map as a globe
        zoom: 12, // initial zoom level, 0 is the world view, higher values zoom in
        center: [30, 15] // center the map on this longitude and latitude
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });
  })
</script>

<template>
  <div class="space-y-3">
    <h3>List component</h3>
    <div v-if="data == undefined || !data?.length" class="text-sm opacity-70">No groups loaded yet.</div>
    <div id="map" ref="map" class="w-full h-80 rounded-lg border" />
    <div v-if="data?.length" v-for="g in data" :key="g.id" class="border rounded p-3 link">
      <h4 class="font-medium">{{ g.name }} <span v-if="g.postcodeData?.region"> · {{ g.postcodeData?.region }}</span></h4>
      <p class="text-sm opacity-80">
        <span v-if="g.json" v-autolink>{{ g.json['Additional comments'] }}</span>
        <!-- Uniting principles or constituiton -->
      </p>
      <p class="text-sm opacity-80">
        <span class="font-medium">Links:</span>
        <span v-if="g.json['Uniting principles or constituiton']" v-autolink> · {{ g.json['Uniting principles or constituiton'] }}</span>
        <!-- Website or other public-facing media -->
        <span v-if="g.json['Website or other public-facing media']" v-autolink> · {{ g.json['Website or other public-facing media'] }}</span>
      </p>
    </div>
  </div>
</template>
