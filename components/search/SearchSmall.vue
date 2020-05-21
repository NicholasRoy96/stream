<template>
  <div>
    <v-btn v-if="!searchOpen" icon class="d-md-none">
      <v-icon class="search-icon" @click="toggleSearchBar">mdi-magnify</v-icon>
    </v-btn>
    <v-autocomplete
      v-if="searchOpen"
      v-model="result"
      :items="searchResults"
      item-text="title"
      :search-input.sync="searchString"
      placeholder="Search Stream"
      color="#5799ef"
      solo
      dense
      flat
      hide-no-data
      hide-details
      prepend-inner-icon="mdi-magnify"
      append-icon="mdi-close"
      @click:append="toggleSearchBar"
    ></v-autocomplete>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchSmall',
  data() {
    return {
      searchString: "",
      result: null,
      searchResults: [],
    }
  },
  computed: {
    ...mapState(["searchOpen"])
  },
  methods: {
    ...mapActions(["toggleSearchBar"]),
    async search() {
      if (!this.searchString) {
        this.searchResults = []
        return
      }
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&query=${this.searchString}&page=1&include_adult=false`)
        this.searchResults = movies.results
      } catch (err) {
        // suppress movie lookup error
        // console.log(err)
      }
    }
  },
  watch: {
    async searchString() {
      await this.search()
    },
    result() {
      const matchedMovie = this.searchResults.find(movie => movie.title === this.result)
      this.$router.push({ path: `/movies/${matchedMovie.id}` })
      this.searchString = null
    }
  }
}
</script>

<style scoped>
.search-icon {
  color: grey !important;
}
</style>