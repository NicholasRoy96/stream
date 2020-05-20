<template>
  <div>
    
    <!-- MD + -->
      <v-autocomplete
      v-model="result"
      :items="searchResults"
      item-text="title"
      :search-input.sync="searchString"
      class="d-none d-md-flex"
      placeholder="Search Stream"
      color="#5799ef"
      solo
      dense
      flat
      hide-no-data
      hide-details
      prepend-inner-icon="mdi-magnify"
    ></v-autocomplete>


    <!-- SM - -->
    <v-btn icon class="d-md-none">
      <v-icon class="search-icon">mdi-magnify</v-icon>
    </v-btn>

  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchString: "",
      result: null,
      searchResults: [],
    }
  },
  methods: {
    async search() {
      if (!this.searchString) {
        this.searchResults = []
        return
      }
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&query=${this.searchString}&page=1&include_adult=false`)
        this.searchResults = movies.results
      } catch (error) {
        console.log(error)
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

<style>
/* Removing dropdown icon on v-autocomplete */
#app > div.v-application--wrap > header > div > div > div.row.d-none.d-md-flex.align-center.justify-space-between > div.col.col-8 > div > div > div > div > div.v-select__slot > div {
  display: none
}
 /* Changing color of v-autocomplete prepend icon */
#app > div.v-application--wrap > header > div > div > div.row.d-none.d-md-flex.align-center.justify-space-between > div.col.col-8 > div > div > div > div > div.v-input__prepend-inner > div > i {
  color: grey;
}
</style>

<style scoped>
.search-icon {
  color: grey !important;
  margin-right: 3px;
}
</style>
