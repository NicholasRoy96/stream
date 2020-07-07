<template>
  <v-app>
    <LoadingOverlay v-show="!loaded" />
    <component v-if="loaded" :is="pageComponent"></component>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingOverlay from '@/components/misc/LoadingOverlay.vue'
import Tv from '@/components/infoPages/pages/Tv.vue'
import TvSmall from '@/components/infoPages/pages/TvSmall.vue'

export default {
  name: 'TvPage',
  components: {
    LoadingOverlay,
    Tv,
    TvSmall
  },
  data() {
    return {
      loaded: false,
      tvId: this.$route.params.id,
      tvShow: {},
      trailer: {},
      cast: [],
      crew: [],
      networksInfo: [],
      similarTvShows: [],
    }
  },
  computed: {
    pageComponent() {
      if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') return TvSmall
      return Tv
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getTvShow() {
      try {
        this.tvShow = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}?api_key=${process.env.apikey}&language=en-US`)
      } catch (err) {
        if (err.response.status === 404) {
          return this.$nuxt.error({ statusCode: 404, message: err.message })
        }
        return this.$nuxt.error({ statusCode: 500, message: err.message })
      }
    },
    async getTrailers() {
      try {
        const trailers = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/videos?api_key=${process.env.apikey}&language=en-US`)
        const trailer = trailers.results.find(trailer => {
          return trailer.type === "Trailer"
        })
        this.trailer = trailer
      } catch(err) {
        // suppress trailer lookup error
        // console.log(err)
      } 
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/credits?api_key=${process.env.apikey}`)
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
    async getSimilarTvShows () {
      try {
        const tvShows = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/similar?api_key=${process.env.apikey}&language=en-US&page=1`)
        this.similarTvShows = tvShows.results.slice(0, 18)
      } catch(err) {
        // suppress tv lookup error
        // console.log(err)
      }
    },
    async addMediaToRecentlyViewed () {
      try {
        await this.addToRecentlyViewed(this.tvShow)
      } catch(err) {
        console.log(err)
      }
    },
    async getNetworkInfo() {
      try {
        const request = []
        const logoRequest = []
        const requests = this.tvShow.networks.forEach(network => {
          request.push(this.$axios.$get(`https://api.themoviedb.org/3/network/${network.id}?api_key=${process.env.apikey}`))
        })
        const networks = await Promise.all(request)
        if (!networks.length || !networks[0].homepage ) {
          this.networksInfo = {}
        }
        const logoRequests = networks.forEach(network => {
          logoRequest.push(this.$axios.$get(`https://api.themoviedb.org/3/network/${network.id}/images?api_key=${process.env.apikey}`))
        })
        const logos = await Promise.all(logoRequest)
        logos.forEach(logo => {
          const matchingObject = networks.find(network => network.id === logo.id)
          matchingObject["logos"] = logo.logos
        })
        this.networksInfo = networks
      } catch(err) {
        console.log(err)
      }  
    },
    async getSeasons() {
      try {
        const request = []
        this.tvShow.seasons.forEach(season => {
          request.push(this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/season/${season.season_number}?api_key=${process.env.apikey}`))
        })
        this.seasons = await Promise.all(request)
      } catch(err) {
        // suppress episode lookup error
        // console.log(err)
      }
    },
    async addTvToStore() {
      try {
        await this.$store.dispatch('media/updateMedia', {
          info: this.tvShow,
          trailer: this.trailer,
          cast: this.cast,
          crew: this.crew,
          similarMedia: this.similarTvShows,
          networksInfo: this.networksInfo,
          seasons: this.seasons
        })
      } catch(err) {
        console.log(err)
      }
    }
  },
  async created() {
    await Promise.all([
      this.getTvShow(),
      this.getTrailers(),
      this.getCredits(),
      this.getSimilarTvShows()
    ])
    .then(async() => {
      await Promise.all([
        this.getNetworkInfo(),
        this.getSeasons()
      ])
    })
    .then(() => {
      this.addMediaToRecentlyViewed()
      this.addTvToStore()
      this.loaded = true
      console.log(this.tvShow)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>