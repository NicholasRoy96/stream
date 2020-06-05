<template>
  <div class="bookmark-div">
    <div v-if="inWatchlist" @click="removeFromWatchlist(media.id)">
      <v-icon size="60" class="add-watchlist-icon-background checked">mdi-bookmark</v-icon>
      <v-icon size="23" class="add-watchlist-icon">mdi-check</v-icon>
    </div>
    <div v-else @click="addMediaToWatchlist">
      <v-icon size="60" class="add-watchlist-icon-background">mdi-bookmark</v-icon>
      <v-icon size="23" class="add-watchlist-icon">mdi-plus</v-icon>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Bookmark',
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
.bookmark-div {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  margin-top: -7px;
  margin-left: -12px;
}
.add-watchlist-icon-background {
  color: rgba(12, 12, 12, 0.68);
}
.add-watchlist-icon-background.checked {
  color: #d1a918;
}
.bookmark-div:hover {
  cursor: pointer;
}
.bookmark-div:hover .add-watchlist-icon-background {
  color: rgba(44, 42, 42, 0.705);
}
.bookmark-div:hover .add-watchlist-icon-background.checked {
  color: #b39630;
}
.add-watchlist-icon {
  position: absolute;
  left: 18px;
  top: 16px;
}
.add-watchlist-icon.checked {
  color: black;
}
</style>