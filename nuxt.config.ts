// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  modules: ['@nuxt/content','nuxt-mapbox'],
  mapbox: {
    accessToken: 'pk.eyJ1IjoiY29tbW9ua25vd2xlZGdlIiwiYSI6ImNtZW84MW56MDA3NHAya3F6aXEwMDd0MDUifQ.tujAvZh2HBN_NRPdlhwLzA'
  },
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
  studio: {
    enabled: true,
  },
  site: {
    title: "Your Party democracy toolkit",
    description: "For democratic, liberatory, struggle-oriented organising",
  }
})