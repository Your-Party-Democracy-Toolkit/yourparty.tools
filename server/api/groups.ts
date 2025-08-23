export default defineEventHandler(async (event) => {
  const key = process.env.MAPPED_API_KEY

  const request = await $fetch("https://api.mapped.commonknowledge.coop/graphql", {
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
              region: europeanElectoralRegion
              latitude
              longitude
            }
          }
        }
      `
    }
  })
  const data = (request as any)?.data?.genericDataByExternalDataSource

  return data
})