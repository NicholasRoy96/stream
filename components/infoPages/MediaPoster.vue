<template>
  <div>
    <div v-if="storeMedia">
      <v-img v-if="storeMedia.info.poster_path" :src="`https://image.tmdb.org/t/p/w500${storeMedia.info.poster_path}`" class="poster-image" :class="{'poster-image-with-network': storeMedia.networksInfo && showNetworksCard}">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div v-else class="placeholder-poster" :class="{'placeholder-poster-with-network': storeMedia.networksInfo}">
        <img :src="require('@/assets/logo.png')" />
      </div>
    </div>

    <div v-if="storeMedia.networksInfo && storeMedia.networksInfo.length && showNetworksCard">
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
  </div>
</template>

<script>
export default {
  name: 'MediaPoster',
  computed: {
    storeMedia() {
      return this.$store.state.media.media
    },
    showNetworksCard() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return false
        case 'sm': return false
        case 'md': return true
        case 'lg': return true
        case 'xl': return true
      }
    }
  }
}
</script>

<style scoped>
.poster-image {
  border-radius: 8px;
  height: 522.39px;
  width: 350px;
}
.poster-image-with-network {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  z-index: 2;
}
.placeholder-poster {
  width: 350px;
  height: 522.39px;
  background-color: #171716;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.placeholder-poster-with-network {
  width: 100%;
  height: 520px;
  background-color: #171716;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.networks-card {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-top: -1px;
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

/* MEDIA QUERIES */
/* MD */
@media(max-width: 1263px) {
  .poster-image {
    width: 300px;
    height: 447.76px;
  }
  .placeholder-poster {
    width: 300px;
    height: 447.76px;
  }
}

/* SM */
@media(max-width: 959px) {
  .poster-image {
    width: 180.9px;
    height: 270px;
  }
  .placeholder-poster {
    width: 180.9px;
    height: 270px;
  }
}

/* XS */
@media(max-width: 599px) {
  .poster-image {
    width: 117.25px;
    height: 175px;
  }
  .placeholder-poster {
    width: 117.25px;
    height: 175px;
  }
}
</style>