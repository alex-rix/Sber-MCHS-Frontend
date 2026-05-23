export default defineNuxtConfig({
  compatibilityDate: '2026-05-14',
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      apiURL: 'http://localhost:8080'
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/mdc'
  ],
  css: ['~/assets/css/main.css'],
})