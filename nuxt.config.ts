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
        language: 'en-US',
      },
    ],
  },
  compatibilityDate: '2024-07-06',
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
  app: {
    head: {
      title: 'Your Party democracy toolkit',
      description: 'A toolkit to help you organise build democracy, solidarity and collective action in Your Party structures',
    }
  }
})
