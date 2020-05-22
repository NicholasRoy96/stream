<template>
  <v-app id="app">
    <client-only>
      <Navbar />
      <Nuxt />
      <Footer />
    </client-only>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
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
