export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // TODO: wire to Airtable / email / queue
  console.log('New report submission:', body)
  return { ok: true }
})
