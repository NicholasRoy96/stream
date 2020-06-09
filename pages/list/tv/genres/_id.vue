<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <v-img :src="featuredBackdrop">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <h3 class="genre-heading">{{genre}}</h3>
      <h3 class="genre-subheading">Explore all {{genre}} TV shows</h3>

      <!-- Cards start -->
      <v-row justify="center">
        <MediaCardResponsive v-for="(tvShow, i) in tvShows" :key="i" :media="tvShow"/>
      </v-row>

      <!-- Load more cards -->
      <client-only>
        <infinite-loading spinner="waveDots" @infinite="getMoreTVShows"></infinite-loading>
      </client-only>
    </v-container>
  </v-app>
</template>

<script>
import MediaCardResponsive from '@/components/MediaCardResponsive.vue'

export default {
  components: {
    MediaCardResponsive
  },
  data() {
    return {
      genreId: this.$route.params.id,
      genre: '',
      tvShows: [],
      featuredBackdrop: '',
      page: 2
    }
  },
  methods: {
    async getTvShows() {
      try {
        const tvShows = await this.$axios.$get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.apikey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${this.genreId}&include_null_first_air_dates=false`)
        console.log(this.genreId)
        console.log(tvShows)
        this.tvShows = tvShows.results
        const mostPopularBackdrop = this.tvShows[0].backdrop_path
        this.featuredBackdrop = `https://image.tmdb.org/t/p/original${mostPopularBackdrop}`
      } catch(err) {
        // suppress TV lookup error
        // console.log(err)
      }
      
    },
    async findGenreName() {
      try {
        const response = await this.$axios.$get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.apikey}&language=en-US`)
        const genre = response.genres.filter(genre => genre.id == this.genreId)
        this.genre = genre[0].name
      } catch(err) {
        // suppress genre lookup error
        // console.log(err)
      }
      
    },
    async getMoreTVShows($state) {      
      const tvShows = await this.$axios.$get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.apikey}&language=en-US&sort_by=popularity.desc&page=${this.page}&with_genres=${this.genreId}&include_null_first_air_dates=false`)
        .then( tvShows => {
          if (tvShows.results.length) {
            this.page += 1
            this.tvShows = this.tvShows.concat(tvShows.results)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(err => {
          // suppress TV lookup error
          // console.log(err)
        })
    }
  },
  created() {
    this.getTvShows()
    this.findGenreName()
  }
}
</script>

<style scoped>
.genre-heading {
  font-size: 2.5em;
  color: #f5c518;
  font-weight: bold;
  margin: 35px 0 2px 0;
  
}
.genre-subheading {
  font-size: 1.5em;
  margin-bottom: 30px;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
</style>