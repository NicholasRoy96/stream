<template>
  <div>
    <v-btn v-if="!available" block small disabled class="watchlist-button">
      Coming Soon
    </v-btn>
    <v-btn v-else-if="inWatchlist && available" block small disabled class="watchlist-button">
      In Watchlist
    </v-btn>
    <v-btn v-else block small class="watchlist-button" @click="addMovieToWatchlist">
      + Watchlist
    </v-btn>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddWatchlistButton',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["watchlist"]),
    available() {
      if (this.movie && this.movie.release_date) {
        const today = new Date().toISOString().slice(0,10).split('-')
        const release = this.movie.release_date.split('-')
        return today > release
      }
    },
    inWatchlist() {
      return this.watchlist.some(watchlistMovie => {
        return watchlistMovie.id === this.movie.id
      })
    }
  },
  methods: {
    ...mapActions(["addToWatchlist"]),
    async addMovieToWatchlist () {
      await this.addToWatchlist(this.movie);
    }
  }
}
</script>

<style scoped>
.watchlist-button {
  color: #5799ef;
}
</style>