<template>
  <div>
    <v-tooltip v-if="inWatchlist" bottom>
      <template v-slot:activator="{ on }">
        <v-btn  icon small depressed class="watchlist-button-icon" v-on="on" @click="removeFromWatchlist(storeMedia.info.id)">
          <v-icon color="#f5c518" size="18">mdi-bookmark</v-icon>
        </v-btn>
      </template>
      <span>Remove from Watchlist</span>
    </v-tooltip>
    <v-tooltip v-else bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon small depressed class="watchlist-button-icon" v-on="on" @click="addMediaToWatchlist">
          <v-icon size="18">mdi-bookmark-plus</v-icon>
        </v-btn>
      </template>
      <span>Add to Watchlist</span>
    </v-tooltip>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddWatchlistIcon',
  computed: {
    ...mapState(["watchlist"]),
    storeMedia() {
      return this.$store.state.media.media
    },
    inWatchlist() {
      return this.watchlist.some(watchlistMedia => {
        return watchlistMedia.id === this.storeMedia.info.id
      })
    }
  },
  methods: {
    ...mapActions(["addToWatchlist", "removeFromWatchlist"]),
    async addMediaToWatchlist () {
      try {
        await this.addToWatchlist(this.storeMedia.info)
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.watchlist-button-icon {
  width: 45px;
  height: 45px;
  background-color: #032541;
}
</style>