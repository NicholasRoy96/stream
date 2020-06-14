<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <v-img v-if="featuredMovie" :height="bannerSize" :src="`https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`">
        <BannerOverlay v-if="featuredMovie" :media="featuredMovie" :keyword="formattedKeywordUpper" />
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      
      <h3 class="movie-heading">{{formattedKeywordUpper}}</h3>
      <h3 class="movie-subheading">Explore {{formattedKeywordLower}} movies</h3>

      <!-- Cards start -->
      <v-row justify="center">
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
import BannerOverlay from "@/components/BannerOverlay.vue"
import MediaCardResponsive from '@/components/MediaCardResponsive.vue'

export default {
  components: {
    BannerOverlay,
    MediaCardResponsive
  },
  data() {
    return {
      movieParam: this.$route.params.id,
      movies: [],
      featuredMovie: '',
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
    formattedKeywordUpper() {
      if (this.movieParam) {
        if (!this.movieParam.includes('_')) {
          return this.movieParam.charAt(0).toUpperCase() + this.movieParam.slice(1)
        }
        const wordArr = this.movieParam.split('_')
        const cappedArr = wordArr.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        return cappedArr.join(' ')
      }
    },
    formattedKeywordLower() {
      if (this.movieParam) {
        if (!this.movieParam.includes('_')) {
          return this.movieParam
        }
        const wordArr = this.movieParam.split('_')
        return wordArr.join(' ')
      }
    }
  },
  methods: {
    async getMovies() {
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieParam}?api_key=${process.env.apikey}&language=en-US&page=1`)
        this.movies = movies.results
        this.findMediaWithImages()
      } catch(err) {
        // suppress movies lookup error
        // console.log(err)
      }
    },
    async getMoreMovies($state) {      
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieParam}?api_key=${process.env.apikey}&language=en-US&page=${this.page}`)
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
    this.getMovies()
  }
}
</script>

<style scoped>
.movie-heading {
  font-size: 2.5em;
  color: #f5c518;
  font-weight: bold;
  margin: 35px 0 2px 0;
  
}
.movie-subheading {
  font-size: 1.5em;
  margin-bottom: 30px;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
</style>