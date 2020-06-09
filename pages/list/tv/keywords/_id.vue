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
      <h3 class="tv-heading">{{formattedKeywordUpper}}</h3>
      <h3 class="tv-subheading">Explore {{formattedKeywordLower}} TV shows</h3>

      <!-- Cards start -->
      <v-row justify="center">
        <MediaCardResponsive v-for="(tvShow, i) in tvShows" :key="i" :media="tvShow"/>
      </v-row>

      <!-- Load more cards -->
      <client-only>
        <infinite-loading spinner="waveDots" @infinite="getMoreTvShows"></infinite-loading>
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
      tvParam: this.$route.params.id,
      tvShows: [],
      featuredBackdrop: '',
      page: 2
    }
  },
  computed: {
    formattedKeywordUpper() {
      if (this.tvParam) {
        if (!this.tvParam.includes('_')) {
          return this.tvParam.charAt(0).toUpperCase() + this.tvParam.slice(1)
        }
        const wordArr = this.tvParam.split('_')
        const cappedArr = wordArr.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        return cappedArr.join(' ')
      }
    },
    formattedKeywordLower() {
      if (this.tvParam) {
        if (!this.tvParam.includes('_')) {
          return this.tvParam
        }
        const wordArr = this.tvParam.split('_')
        return wordArr.join(' ')
      }
    }
  },
  methods: {
    async getTvShows() {
      try {
        const tvShows = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvParam}?api_key=${process.env.apikey}&language=en-US&page=1`)
        this.tvShows = tvShows.results
        if (this.tvShows[0].backdrop_path) {
          const mostPopularBackdrop = this.tvShows[0].backdrop_path
          this.featuredBackdrop = `https://image.tmdb.org/t/p/original${mostPopularBackdrop}`
        } else {
          const mostPopularBackdrop = this.tvShows[1].backdrop_path
          this.featuredBackdrop = `https://image.tmdb.org/t/p/original${mostPopularBackdrop}`
        }        
      } catch(err) {
        // suppress TV show lookup error
        // console.log(err)
      }
    },
    async getMoreTvShows($state) {      
      const tvShows = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvParam}?api_key=${process.env.apikey}&language=en-US&page=${this.page}`)
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
          // suppress TV show lookup error
          // console.log(err)
        })
    }
  },
  created() {
    this.getTvShows()
  }
}
</script>

<style scoped>
.tv-heading {
  font-size: 2.5em;
  color: #f5c518;
  font-weight: bold;
  margin: 35px 0 2px 0;
  
}
.tv-subheading {
  font-size: 1.5em;
  margin-bottom: 30px;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
</style>