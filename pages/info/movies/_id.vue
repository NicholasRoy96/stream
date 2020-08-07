<template>
  <v-app>
    <LoadingOverlay v-show="!loaded" />
    <component v-if="loaded" :is="pageComponent"></component>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingOverlay from '@/components/misc/LoadingOverlay.vue'
import Movie from '@/components/infoPages/pages/Movie.vue'
import MovieSmall from '@/components/infoPages/pages/MovieSmall.vue'

export default {
  name: 'MoviePage',
  components: {
    LoadingOverlay,
    Movie,
    MovieSmall
  },
  data () {
    return {
      loaded: false,
      movieId: this.$route.params.id,
      movie: {},
      trailer: {},
      cast: [],
      crew: {},
      collection: {},
      similarMovies: [],
    }
  },
  computed: {
    pageComponent() {
      if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') return MovieSmall
      return Movie
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getMovie() {
      try {
        this.movie = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.apikey}&language=en-US`)
        if (this.movie.backdrop_path) {
          this.movieBackdrop = `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
          // this.getAverageColor()
        }
        if (this.movie.belongs_to_collection) {
          this.getCollection()
        }
        this.addMediaToRecentlyViewed()
      } catch (err) {
        if (err.response.status === 404) {
          return this.$nuxt.error({ statusCode: 404, message: err.message })
        }
        return this.$nuxt.error({ statusCode: 500, message: err.message })
      }
    },
    async getTrailers() {
      try {
        const trailers = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=${process.env.apikey}&language=en-US`)
        const trailer = trailers.results.find(trailer => {
          return trailer.type === "Trailer"
        })
        this.trailer = trailer
      } catch(err) {
        // suppress trailer lookup error
        // console.log(err)
      } 
    },
    async getCollection() {
      try {
        this.collection = await this.$axios.$get (`https://api.themoviedb.org/3/collection/${this.movie.belongs_to_collection.id}?api_key=${process.env.apikey}&language=en-US`)
      } catch(err) {
        // supress collection lookup error
        // console.log(err)
      }
    },
    async getSimilarMovies () {
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=${process.env.apikey}&language=en-US&page=1`)
        this.similarMovies = movies.results.slice(0, 18)
      } catch(err) {
        // suppress movie lookup error
        // console.log(err)
      }
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=${process.env.apikey}`)
        this.cast = credits.cast.slice(0, 24)
        const director = credits.crew.find(crew => crew.job === "Director") || {}
        if (director) this.crew["director"] = director
        const composer = credits.crew.find(crew => crew.job === "Original Music Composer") || {}
        if (composer) this.crew["composer"] = composer
        const novel = credits.crew.find(crew => crew.job === "Novel") || {}
        if (novel) this.crew["novel"] = novel
      } catch(err) {
        // suppress cast lookup error
        // console.log(err)
      }
    },
    async addMediaToRecentlyViewed() {
      try {
        await this.addToRecentlyViewed(this.movie)
      } catch(err) {
        console.log(err)
      }
    },
    async addMovieToStore() {
      try {
        await this.$store.dispatch('media/updateMedia', {
          info: this.movie,
          trailer: this.trailer,
          cast: this.cast,
          crew: this.crew,
          collection: this.collection,
          similarMedia: this.similarMovies
        })
      } catch(err) {
        console.log(err)
      }
    }
  },
  created() {
    Promise.all([
      this.getMovie(),
      this.getCredits(),
      this.getTrailers(),
      this.getSimilarMovies(),
    ])
    .then(() => {
      this.addMovieToStore()
      this.loaded = true
    })
    .catch(err => {
      console.log(err)
    }) 
  },
}
</script>