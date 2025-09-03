export default defineEventHandler(async (event) => {
  const { message, contactMethod } = await readBody<{ message: string, contactMethod: string }>(event);

  const payload = {
    message,
    contactMethod,
    date: new Date().toISOString()
  }

  return await $fetch(process.env.WEBHOOK_URL_SEND_EMAIL!, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
})