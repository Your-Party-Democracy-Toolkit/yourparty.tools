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
          genericDataByExternalDataSource(externalDataSourceId:"ab02c662-b275-48ef-be1f-0e5bea51063d") {
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