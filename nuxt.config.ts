export default defineNuxtConfig({
  compatibilityDate: '2025-05-13',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api',
    },
  },
})
