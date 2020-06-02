<template>
  <v-app id="app">
    <Navbar />
    <Nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
  head () {
    return this.$nuxtI18nSeo()
  },
  components: {
    Navbar,
    Footer
  },
}
</script>

<style>
#app {
  font-family: Roboto,Helvetica,Arial,sans-serif;
  background-color: black;
  color: white;
}
</style>
