// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  modules: [
    'nuxt-toast', '@formkit/nuxt', '@nuxt/content', 'nuxt-mapbox', 'nuxt-og-image', 'nuxt-toast'],
  mapbox: {
    accessToken: 'pk.eyJ1IjoiY29tbW9ua25vd2xlZGdlIiwiYSI6ImNtZW84MW56MDA3NHAya3F6aXEwMDd0MDUifQ.tujAvZh2HBN_NRPdlhwLzA'
  },
  app: {
    head: {
      script: [
        ...(process.env.NODE_ENV === 'production'
          ? [
              { src: '/_vercel/insights/script.js', defer: true },
              {
                src: 'https://va.vercel-scripts.com/v1/script.js',
                defer: true,
                'data-domain': 'yourparty.tools'
              }
            ]
          : [])
      ]
    }
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
  site: {
    title: "Your Party democracy toolkit",
    description: "For democratic, liberatory, struggle-oriented organising",
  }
})