<template>
  <div class="bottom-bar-div">
    <div v-if="storeMedia.networksInfo && storeMedia.networksInfo.length">
      <v-card tile class="networks-card">
        <v-container>
          <v-row justify="center" align="center">
            <div v-if="storeMedia.networksInfo[0].logos && storeMedia.networksInfo[0].logos[0].file_path" class="network-logo-div">
              <img :src="`https://image.tmdb.org/t/p/w300${storeMedia.networksInfo[0].logos[0].file_path}`" class="network-logo" />
            </div>
            <div v-if="storeMedia.networksInfo[0].homepage" class="d-flex-col pl-4">
              <h2 class="network-subtitle">Now Streaming</h2>
              <a :href="storeMedia.networksInfo[0].homepage" target="_blank" class="network-link">
                <h1 class="network-title">Watch Now</h1>
              </a>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </div>

    <v-row no-gutters justify="space-around" align="center" class="background-row">
      <v-btn icon depressed @click="goBack">
        <v-icon size="28">mdi-arrow-left</v-icon>
      </v-btn>
      <TrailerDialog :trailerId="storeMedia.trailer.key" :bottomBar="true" />
      <AddWatchlistIcon :bottomBar="true"/>
    </v-row>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddWatchlistIcon from '@/components/buttons/AddWatchlistIcon.vue'
import TrailerDialog from '@/components/infoPages/TrailerDialog.vue'

export default {
  name: 'BottomBar',
  components: {
    AddWatchlistIcon,
    TrailerDialog
  },
  computed: {
    storeMedia() {
      return this.$store.state.media.media
    }
  },
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style scoped>
.bottom-bar-div {
  position: fixed;
  bottom: 0;
  width: 100%;
  opacity: 0.98;
  margin-bottom: -1px;
}
.background-row {
  background-color: black;
  color: white;
  height: 50px;
}
.networks-card {
  margin-bottom: -1px;
  background-color: #0d0d0c;
}
.network-logo-div {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 9px 9px;
}
.network-logo {
  height: 26px;
  max-width: 155px;
}
.network-link {
  color: white;
  text-decoration: none;
}
.network-link:hover {
  color: #f5c518;
}
.network-title {
  font-size: 0.95em;
  font-weight: 600;
  margin-top: -5px;
}
.network-subtitle {
  font-size: 0.9em;
  font-weight: 400;
  opacity: 0.8;
  letter-spacing: 0.03em;
}
</style>