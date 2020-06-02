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
      <h3 class="genre-subheading">Explore the most popular {{genre}} films</h3>

      <!-- Cards start -->
      <v-row justify="center" class="pl-1">
        <MediaCard v-for="(movie, i) in movies" :key="i" :media="movie"/>
      </v-row>

      <!-- Load more cards -->
      <client-only>
        <infinite-loading spinner="waveDots" @infinite="getMoreMovies"></infinite-loading>
      </client-only>
    </v-container>
  </v-app>
</template>

<script>
import MediaCard from '@/components/MediaCard.vue'

export default {
  components: {
    MediaCard
  },
  data() {
    return {
      genreId: this.$route.params.id,
      genre: '',
      movies: [],
      featuredBackdrop: '',
      page: 2
    }
  },
  methods: {
    async getMovies() {
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.genreId}`)
        this.movies = movies.results
        const mostPopularBackdrop = this.movies[0].backdrop_path
        this.featuredBackdrop = `https://image.tmdb.org/t/p/original${mostPopularBackdrop}`
      } catch(err) {
        // suppress movies lookup error
        // console.log(err)
      }
      
    },
    async findGenreName() {
      try {
        const response = await this.$axios.$get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.apikey}&language=en-US`)
        const genre = response.genres.filter(genre => genre.id == this.genreId)
        this.genre = genre[0].name
      } catch(err) {
        // suppress genre lookup error
        // console.log(err)
      }
      
    },
    async getMoreMovies($state) {      
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}&with_genres=${this.genreId}`)
        .then( movies => {
          if (movies.results.length) {
            this.page += 1
            this.movies = this.movies.concat(movies.results)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(err => {
          // suppress movies lookup error
          // console.log(err)
        })
    }
  },
  created() {
    this.getMovies()
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