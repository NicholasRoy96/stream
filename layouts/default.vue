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

/* MEDIA QUERIES */
/* XL */

@media(min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
  .container--fluid {
    max-width: 100%;
  }
}
</style>
