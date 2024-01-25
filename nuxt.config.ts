// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@pinia/nuxt'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {
      theme: {
        extend: {
          colors: {},
        },
      },
    },
    viewer: true,
  },
});
