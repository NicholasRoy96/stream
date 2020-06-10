<template>
  <div>
    <div v-if="!icon">
      <v-btn v-if="inWatchlist" block small depressed class="watchlist-button text-capitalize" @click="removeFromWatchlist(media.id)">
        <v-icon left>mdi-check</v-icon>
        Watchlist
      </v-btn>
      <v-btn v-else block small depressed class="watchlist-button text-capitalize" @click="addMediaToWatchlist">
        <v-icon left>mdi-plus</v-icon>
        Watchlist
      </v-btn>
    </div>
    <div v-else>
      <v-tooltip v-if="inWatchlist" bottom>
        <template v-slot:activator="{ on }">
          <v-btn  icon small depressed class="watchlist-button-alternate" v-on="on" @click="removeFromWatchlist(media.id)">
            <v-icon color="#f5c518" size="18">mdi-bookmark</v-icon>
          </v-btn>
        </template>
        <span>Remove from Watchlist</span>
      </v-tooltip>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small depressed class="watchlist-button-alternate" v-on="on" @click="addMediaToWatchlist">
            <v-icon size="18">mdi-bookmark-plus</v-icon>
          </v-btn>
        </template>
        <span>Add to Watchlist</span>
      </v-tooltip>
    </div>
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
    },
    icon: {
      type: Boolean
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
.watchlist-button-alternate {
  width: 45px;
  height: 45px;
  background-color: #032541;
}
</style>