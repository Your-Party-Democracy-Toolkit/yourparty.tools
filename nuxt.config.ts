// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-GB',
      },
    ],
  },
  compatibilityDate: '2024-07-06',
  content: {
    preview: { api: 'https://api.nuxt.studio' }
  },
  studio: {
    enabled: true,
  },
})
