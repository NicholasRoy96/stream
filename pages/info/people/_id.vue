<template>
  <v-app>
    <LoadingOverlay v-show="!loaded" />
    <Person v-if="loaded" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingOverlay from '@/components/misc/LoadingOverlay.vue'
import Person from '@/components/infoPages/pages/Person.vue'

export default {
  name: 'PersonPage',
  components: {
    LoadingOverlay,
    Person
  },
  data() {
    return {
      loaded: false,
      personId: this.$route.params.id,
      personInfo: {},
      castCredits: [],
      crewCredits: [],
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getPerson() {
      try {
        this.personInfo = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.personId}?api_key=${process.env.apikey}&language=en-US`)
        this.addMediaToRecentlyViewed()
      } catch(err) {
        if (err.response.status === 404) {
          return this.$nuxt.error({ statusCode: 404, message: err.message })
        }
        return this.$nuxt.error({ statusCode: 500, message: err.message })
      }
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.personId}/combined_credits?api_key=${process.env.apikey}&language=en-US`)
        if (credits.cast.length) {
          const sortedArray = credits.cast.sort((a, b) => b.popularity - a.popularity)
          const modSortedArray = sortedArray.map(media => {
            return {
              ...media,
              title: media.title || media.name
            }
          })
          const uniqueCredits = [...new Map(modSortedArray.map(media => {
            return [media['title'], media]
          })).values()]
          this.castCredits = uniqueCredits.slice(0, 18)
        }
        if (credits.crew.length) {
          const sortedArray = credits.crew.sort((a, b) => b.popularity - a.popularity)
          const modSortedArray = sortedArray.map(media => {
            return {
              ...media,
              title: media.title || media.name
            }
          })
          const uniqueCredits = [...new Map(modSortedArray.map(media => {
            return [media['title'], media]
          })).values()]
          this.crewCredits = uniqueCredits.slice(0, 18)
        } 
      } catch(err) {
        // suppress credits lookup error
        // console.log(err)
      }
    },
    async addMediaToRecentlyViewed () {
      try {
        await this.addToRecentlyViewed(this.personInfo)
      } catch(err) {
        console.log(err)
      }
    },
    async addPersonToStore() {
      try {
        await this.$store.dispatch('media/updateMedia', {
          info: this.personInfo,
          castCredits: this.castCredits,
          crewCredits: this.crewCredits,
        })
      } catch(err) {
        console.log(err)
      }
    }
  },
  created() {
    Promise.all([
      this.getPerson(),
      this.getCredits()
    ])
    .then(() => {
      this.addPersonToStore()
      this.loaded = true
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>