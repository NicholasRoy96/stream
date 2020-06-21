<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <v-img v-if="featuredTVShow" :height="bannerSize" :src="`https://image.tmdb.org/t/p/original${featuredTVShow.backdrop_path}`">
      <BannerOverlay v-if="featuredTVShow" :media="featuredTVShow" :keyword="formattedKeywordUpper" />
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
import BannerOverlay from '@/components/misc/BannerOverlay.vue'
import MediaCardResponsive from '@/components/cards/MediaCardResponsive.vue'

export default {
  components: {
    BannerOverlay,
    MediaCardResponsive
  },
  data() {
    return {
      tvParam: this.$route.params.id,
      tvShows: [],
      featuredTVShow: {},
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
        this.findMediaWithImages(this.tvShows)
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
    },
    findMediaWithImages(mediaArray) {
      const mediaWithImages = mediaArray.find(media => {
        return media.backdrop_path && media.poster_path
      })
      this.featuredTVShow = mediaWithImages
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