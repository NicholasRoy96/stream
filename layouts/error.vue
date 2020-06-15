<template>
  <v-app id="app">
    <v-container v-if="error.statusCode === 404" class="pt-10">
      <v-row justify="center">
        <v-col cols="8">
          <v-row justify="center">
            <v-icon size="100" color="grey darken-2">mdi-alert-circle-outline</v-icon>
          </v-row>
          <v-row justify="center" class="pt-6">
            <h3 class="error-message">Oh No! We couldn't find what you were looking for!</h3>
          </v-row>
          <v-row justify="center" class="pt-3">
            <NuxtLink to="/" class="home-link">
              Let's go home
            </NuxtLink>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="pt-10">
      <v-row justify="center">
        <v-col cols="8">
          <v-row justify="center">
            <v-icon size="100" color="grey darken-2">mdi-alert-circle-outline</v-icon>
          </v-row>
          <v-row justify="center" class="pt-6">
            <h3 class="error-message">Oh No! Something went wrong.</h3>
          </v-row>
          <v-row justify="center" class="pt-3">
            <NuxtLink to="/" class="home-link">
              Let's go home
            </NuxtLink>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Roboto,Helvetica,Arial,sans-serif;
  background-color: black;
  color: white;
}
.error-message {
  color: lightgray;
  font-size: 1.1em;
}
.home-link {
  color: white;
}
.home-link:hover {
  color: lightgray;
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
