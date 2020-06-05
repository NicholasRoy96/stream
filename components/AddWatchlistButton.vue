<template>
  <div>
    <v-btn v-if="inWatchlist" block small depressed class="watchlist-button text-capitalize" @click="removeFromWatchlist(media.id)">
      <v-icon left>mdi-check</v-icon>
      Watchlist
    </v-btn>
    <v-btn v-else block small depressed class="watchlist-button text-capitalize" @click="addMediaToWatchlist">
      <v-icon left>mdi-plus</v-icon>
      Watchlist
    </v-btn>   
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddWatchlistButton',
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["watchlist"]),
    inWatchlist() {
      return this.watchlist.some(watchlistMedia => {
        return watchlistMedia.id === this.media.id
      })
    }
  },
  methods: {
    ...mapActions(["addToWatchlist", "removeFromWatchlist"]),
    async addMediaToWatchlist () {
      try {
        await this.addToWatchlist(this.media)
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.watchlist-button {
  color: #5799ef;
  font-weight: bold;
  font-size: 0.87em;
  letter-spacing: 0.5px;
}
</style>