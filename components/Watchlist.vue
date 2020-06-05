<template>
  <v-menu bottom left min-width="300" max-width="300" max-height="500" transition="slide-x-reverse-transition" :close-on-content-click="false">
    
    <template v-slot:activator="{ on }">
      
      <!-- MD + -->
        <v-btn depressed class="watchlist-button d-none d-md-block" v-on="on">
          <v-icon class="watchlist-button-icon">mdi-bookmark-plus</v-icon>
          <span class="watchlist-button-name text-capitalize">Watchlist</span><span v-if="watchlist.length" class="pl-1">({{watchlist.length}})</span>
        </v-btn>

      <!-- SM - -->
      <v-badge :value="watchlist.length" dot overlap color="#f5c518" class="d-md-none" offset-x="15" offset-y="12">
        <v-btn icon class="watchlist-button" v-on="on">
          <v-icon class="watchlist-button-icon">mdi-bookmark-plus</v-icon>
        </v-btn>
      </v-badge>

    </template>
  
    <v-list>

      <h3 v-if="watchlist.length" class="text-center watchlist-title">Your Watchlist ({{watchlist.length}})</h3>
      <h3 v-else class="text-center watchlist-title">Your Watchlist</h3>

      <v-list-item v-if="!watchlist.length">
        <v-list-item-title class="text-center watchlist-empty-title">Your watchlist is empty.</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="(watchlistMedia, i) in watchlist" :key="i" class="watchlist-item">
        <v-avatar tile height="85%" width="10%" class="watchlist-media-image">
          <v-img v-if="watchlistMedia.poster_path" :src="`https://image.tmdb.org/t/p/w185${watchlistMedia.poster_path}`" ></v-img>
          <v-icon v-else size="40" color="grey darken-2">mdi-video-image</v-icon>
        </v-avatar>
        <v-list-item-content>
          <nuxt-link :to="{ path: `/${determineMediaType(watchlistMedia)}/${watchlistMedia.id}` }" class="watchlist-media-link">
            <v-list-item-title class="watchlist-media-title">{{ watchlistMedia.title || watchlistMedia.name }}</v-list-item-title>
          </nuxt-link>
          <v-list-item-subtitle class="watchlist-rating">
            {{releasedYear(watchlistMedia)}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="removeFromWatchlist(watchlistMedia.id)">
            <v-icon color="grey darken-1">mdi-bookmark-remove</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item v-if="watchlist.length">
        <v-btn small block class="watchlist-stream-button">Stream now</v-btn>
      </v-list-item>

    </v-list>

  </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Watchlist',
  computed: {
    ...mapState(["watchlist"]),
  },
  methods: {
    ...mapActions(["removeFromWatchlist"]),
    releasedYear(media) {
      if (media.release_date) {
        const date = media.release_date.toString()
        return date.slice(0, 4)
      }
      if (media.first_air_date) {
        const date = media.first_air_date.toString()
        return date.slice(0, 4)
      }
    },
    determineMediaType(media) {
      return media.first_air_date ? "tv" : "movies"
    }
  }
}
</script>

<style scoped>
.watchlist-button {
  background-color: transparent !important;
  color: white;
}
.watchlist-button-icon {
  color: grey !important;
  margin-right: 3px;
}
.watchlist-button-name {
  font-weight: bold;
  font-size: 1.05em;
  letter-spacing: 0.48px;
}
.watchlist-title {
  padding: 10px 0 10px 0;
  font-size: 1.1em;
  color: white;
}
.watchlist-item {
  height: 100px;
}
.watchlist-media-title {
  font-size: 0.9em;
  font-weight: bold;
}
.watchlist-media-link {
  text-decoration: none;
  color: lightgrey;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.watchlist-media-link:hover {
  text-decoration: underline;
}
.watchlist-media-image {
  margin-right: 22px;
}
.watchlist-rating-star {
  color: #f5c518;
  padding-right: 4px;
}
.watchlist-empty-title {
  font-size: 0.9em;
  color: grey;
}
.watchlist-stream-button {
  color: #5799ef;
}
</style>