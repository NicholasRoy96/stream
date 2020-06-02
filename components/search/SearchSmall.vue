<template>
  <div>
    <v-btn v-if="!searchOpen" icon class="d-md-none">
      <v-icon class="search-icon" @click="toggleSearchBar">mdi-magnify</v-icon>
    </v-btn>
    <v-autocomplete
      v-if="searchOpen"
      v-model="result"
      :items="formattedResults"
      item-text="title"
      :search-input.sync="searchString"
      placeholder="Search Stream"
      color="#5799ef"
      solo
      dense
      flat
      hide-no-data
      hide-details
      prepend-inner-icon="mdi-magnify"
      append-icon="mdi-close"
      @click:append="toggleSearchBar"
    >
      <template v-slot:item="media">

        <!-- IF MEDIA IS PERSON -->
        <v-list-item-content v-if="media.item.media_type === 'person'" class="search-list">
          <div class="item-div">
            <v-img v-if="media.item.profile_path" max-width="50" :src="`https://image.tmdb.org/t/p/w185${media.item.profile_path}`"></v-img>
            <v-icon v-else size="50" color="grey darken-2">mdi-account</v-icon>
            <div class="title-div">
              <v-list-item-title class="item-title">{{media.item.name}}</v-list-item-title>
              <v-list-item-subtitle class="item-subtitle mb-1">
                {{formatRole(media.item.known_for_department)}}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="item-subtitle" v-if="media.item.known_for && media.item.known_for.length > 1">
                {{ media.item.known_for[0].title || media.item.known_for[0].name }}, {{ media.item.known_for[1].title || media.item.known_for[1].name }}
              </v-list-item-subtitle>
            </div>
          </div>
        </v-list-item-content>

        <!-- IF MEDIA IS MOVIE OR TV -->
        <v-list-item-content v-else class="search-list">
          <div class="item-div">
            <v-img max-width="50" v-if="media.item.poster_path" :src="`https://image.tmdb.org/t/p/w185${media.item.poster_path}`"></v-img>
            <v-icon v-else size="50" color="grey darken-2">mdi-video-image</v-icon>
            <div class="title-div">
              <v-list-item-title class="item-title">{{media.item.title}}</v-list-item-title>
              <v-list-item-subtitle class="item-subtitle" v-if="media.item.media_type === 'movie'">
                Movie, {{ media.item.release_date | formatYear }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="item-subtitle" v-if="media.item.media_type === 'tv'">
                TV Series, {{ media.item.first_air_date | formatYear }}
              </v-list-item-subtitle>
            </div>
          </div>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchSmall',
  data() {
    return {
      searchString: "",
      result: null,
      searchResults: [],
    }
  },
  computed: {
    ...mapState(["searchOpen"]),
    formattedResults() {
      return this.searchResults.map(item => {
        return {
          ...item,
          title: item.title || item.name
        }
      })
    }
  },
  methods: {
    ...mapActions(["toggleSearchBar"]),
    async search() {
      if (!this.searchString) {
        this.searchResults = []
        return
      }
      try {
        const searchMedia = await this.$axios.$get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.apikey}&language=en-US&query=${this.searchString}&page=1&include_adult=false`)
        this.searchResults = searchMedia.results
      } catch (err) {
        // suppress media lookup error
        // console.log(err)
      }
    },
    determineMediaType(media) {
      if (media.media_type === 'person') return 'people'
      if (media.media_type === 'movie') return 'movies'
      return 'tv'
    },
    formatRole(role) {
      if (role === 'Acting') return 'Actor'
      if (role === 'Directing') return 'Director'
      if (role === 'Sound') return 'Composer'
      if (role === 'Writing') return 'Writer'
      if (role === 'Production') return 'Producer'
      return role
    }
  },
  watch: {
    async searchString() {
      await this.search()
    },
    result() {
      const matchedMedia = this.formattedResults.find(media => media.title === this.result)
      const type = this.determineMediaType(matchedMedia)
      this.$router.push({ path: `/${type}/${matchedMedia.id}` })
      this.searchString = null
    }
  }
}
</script>

<style scoped>
.search-icon {
  color: grey !important;
}
.search-list {
  border-bottom: 1px solid;
  border-color: rgb(169,169,169, 0.3);
}
.item-div {
  display: flex;
}
.title-div {
  display: block;
  padding: 10px 0 0 15px;
}
.item-title {
  font-size: 1em !important;
  padding-bottom: 5px;
  letter-spacing: 0.38px;
}
.item-subtitle {
  font-size: 0.9em !important;
}
</style>