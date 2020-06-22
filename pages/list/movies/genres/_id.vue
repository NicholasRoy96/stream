<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <v-img v-if="featuredMovie" :height="bannerSize" :src="`https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`">
        <BannerOverlay v-if="featuredMovie" :media="featuredMovie" :keyword="genre" />
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <h3 class="heading">{{genre}}</h3>
      <h3 class="subheading">Explore all {{genre}} movies</h3>

      <!-- Cards start -->
      <v-row justify="center" class="pt-5">
        <MediaCardResponsive v-for="(movie, i) in movies" :key="i" :media="movie"/>
      </v-row>

      <!-- Load more cards -->
      <client-only>
        <infinite-loading spinner="waveDots" @infinite="getMoreMovies"></infinite-loading>
      </client-only>
    </v-container>
  </v-app>
</template>

<script>
import BannerOverlay from '@/components/misc/BannerOverlay.vue'
import MediaCardResponsive from '@/components/cards/MediaCardResponsive.vue'

export default {
  components: {
    BannerOverlay,
    MediaCardResponsive
  },
  data() {
    return {
      genreId: this.$route.params.id,
      genre: '',
      movies: [],
      featuredMovie: {},
      page: 2
    }
  },
  computed: {
    bannerSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '500'
        case 'sm': return '550'
        case 'md': return '600'
        case 'lg': return '650'
        case 'xl': return '650'
      }
    },
  },
  methods: {
    async getMovies() {
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.genreId}`)
        this.movies = movies.results
        this.findMediaWithImages()
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
    },
    findMediaWithImages() {
      const mediaWithImages = this.movies.find(media => {
        return media.backdrop_path && media.poster_path
      })
      this.featuredMovie = mediaWithImages
    }
  },
  created() {
    Promise.all([
      this.getMovies(),
      this.findGenreName()
    ])
    
  }
}
</script>