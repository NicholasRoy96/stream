<template>
  <div>
    <!-- MD + -->
    <v-text-field
    v-model="searchString"
    label="Search Stream"
    prepend-icon="mdi-magnify"
    clearable
    hide-details
    class="d-none d-md-flex">
    </v-text-field>

    <!-- SM - -->
    <v-btn icon class="d-md-none" @click="search">
      <v-icon class="search-icon">mdi-magnify</v-icon>
    </v-btn>

  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchString: "Hunger",
      searchResults: []
    }
  },
  methods: {
    async search() {
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&query=${this.searchString}&page=1&include_adult=true`)
        .then(movies => {
          this.searchResults = movies.results
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.search-icon {
  color: grey !important;
  margin-right: 3px;
}
</style>
