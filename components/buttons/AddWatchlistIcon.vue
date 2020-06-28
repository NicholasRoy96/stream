<template>
  <div>

    <!-- Standard Button -->
    <div v-if="!bottomBar">
      <v-tooltip v-if="inWatchlist" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small depressed class="watchlist-button-icon" v-on="on" @click="removeFromWatchlist(storeMedia.info.id)">
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

    <!-- Button for Mobile Bottom Bar -->
    <div v-else>
      <v-btn v-if="inWatchlist" icon small depressed class="watchlist-button-icon-bottom-bar" @click="removeFromWatchlist(storeMedia.info.id)">
        <v-icon color="#f5c518" size="28">mdi-bookmark</v-icon>
      </v-btn>
      <v-btn v-else icon small depressed class="watchlist-button-icon-bottom-bar" @click="addMediaToWatchlist">
        <v-icon size="28">mdi-bookmark-plus</v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddWatchlistIcon',
  props: {
    bottomBar: {
      type: Boolean,
      required: false
    }
  },
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
  background-color: #262625;
}
.watchlist-button-icon-bottom-bar {
  color: white;
  background-color: transparent;
}
</style>