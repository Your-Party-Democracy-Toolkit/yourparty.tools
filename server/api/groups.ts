import merge from "lodash/merge"

export default defineEventHandler(async (event) => {
  const username = process.env.MAPPED_API_USER
  const password = process.env.MAPPED_API_PASSWORD

  if (!username || !password) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing MAPPED_API_USER or MAPPED_API_PASSWORD environment variables'
    })
  }

  // Create basic auth header
  const credentials = Buffer.from(`${username}:${password}`).toString('base64')

  const request = await $fetch("https://mapped.tools/api/rest/data-sources/f8aec68c-d025-4579-9b87-2d2eda0f8cf5/geojson?all=true", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${credentials}`
    }
  })

  // The response is a GeoJSON FeatureCollection
  // We need to transform it to match the expected format
  const features = ((request as any)?.features || []) as Array<GeoJSON.Feature<GeoJSON.Point, {
  Area:                  string;
  Links:                 string;
  Region:                string;
  Created:               Date;
  Latitude:              null;
  Longitude:             null;
  "Group Name":          string;
  "Further Information": string;
  _dataSourceId:         string;
  _externalId:           string;
  _geocodeResult:        {
    areas:        any;
    samplePoint:  { lat: number; lng: number };
    centralPoint: { lat: number; lng: number };
  }
  }>>
  
  const transformedData = features.map((feature) => {
    return merge(feature, {  
      id: feature.properties._externalId,
      properties: {
        id: feature.properties._externalId,
        name: feature.properties["Group Name"],
        region: feature.properties.Region,
        description: feature.properties["Further Information"]
      }
    })
  })

  return transformedData
})