import colors from 'vuetify/es5/util/colors'

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Stream",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#121212" },
      {
        hid: "stream",
        name: "stream",
        content: "The only place to stream movies"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=2" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/scroller.js", mode: "client" },
    { src: "~/plugins/infiniteLoading.js", mode: "client" },
    { src: "~/plugins/vuex-persist.js", mode: "client" },
    { src: "~/plugins/youtubeEmbed.js", mode: "client" },
    { src: "~/plugins/filters.js", mode: "client" },
    { src: "~/plugins/averageColor.js", mode: "client" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  router: {
    middleware: 'closeSearch'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    apikey: "fac214f57908d267c5cd93e69460f956"
  },
  target: "static"
};
