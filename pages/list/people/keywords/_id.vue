<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <!-- <v-img :src="featuredBackdrop">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img> -->
      <h3 class="heading">{{formattedKeywordUpper}}</h3>
      <h3 class="subheading">Explore {{formattedKeywordLower}} celebs</h3>

      <!-- Cards start -->
      <v-row justify="center" class="pt-5">
        <MediaCardRecent v-for="(person, i) in people" :key="i" :media="person"/>
      </v-row>

      <!-- Load more cards -->
      <client-only>
        <infinite-loading spinner="waveDots" @infinite="getMorePeople"></infinite-loading>
      </client-only>
    </v-container>
  </v-app>
</template>

<script>
import MediaCardRecent from '@/components/cards/MediaCardRecent.vue'

export default {
  components: {
    MediaCardRecent
  },
  data() {
    return {
      peopleParam: this.$route.params.id,
      people: [],
      featuredBackdrop: '',
      page: 2
    }
  },
  computed: {
    formattedKeywordUpper() {
      if (this.peopleParam) {
        if (!this.peopleParam.includes('_')) {
          return this.peopleParam.charAt(0).toUpperCase() + this.peopleParam.slice(1)
        }
        const wordArr = this.peopleParam.split('_')
        const cappedArr = wordArr.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        return cappedArr.join(' ')
      }
    },
    formattedKeywordLower() {
      if (this.peopleParam) {
        if (!this.peopleParam.includes('_')) {
          return this.peopleParam
        }
        const wordArr = this.peopleParam.split('_')
        return wordArr.join(' ')
      }
    }
  },
  methods: {
    async getPeople() {
      try {
        const people = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.peopleParam}?api_key=${process.env.apikey}&language=en-US&page=1`)
        this.people = people.results
      } catch(err) {
        // suppress people lookup error
        // console.log(err)
      }
    },
    async getMorePeople($state) {      
      const people = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.peopleParam}?api_key=${process.env.apikey}&language=en-US&page=${this.page}`)
        .then( people => {
          if (people.results.length) {
            this.page += 1
            this.people = this.people.concat(people.results)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(err => {
          // suppress people show lookup error
          // console.log(err)
        })
    }
  },
  created() {
    this.getPeople()
  }
}
</script>