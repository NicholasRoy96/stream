<template>
  <div>
    <div v-if="!posterProps.networksInfo">
      <v-img v-if="posterProps.media.poster_path" :src="`https://image.tmdb.org/t/p/w500${posterProps.media.poster_path}`" class="poster-image">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div v-else class="placeholder-poster">
        <img :src="require('@/assets/logo.png')" />
      </div>
    </div>

    <div v-if="posterProps.networksInfo">
      <v-img v-if="posterProps.media.poster_path && ( posterProps.networksInfo.length == 0 || !posterProps.networksInfo[0].homepage )" :src="`https://image.tmdb.org/t/p/w500${posterProps.media.poster_path}`" class="poster-image">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-img v-if="posterProps.media.poster_path && posterProps.networksInfo.length >= 1 && posterProps.networksInfo[0].homepage" :src="`https://image.tmdb.org/t/p/w500${posterProps.media.poster_path}`" class="poster-image-with-network">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>  
      <div v-if="!posterProps.media.poster_path" class="placeholder-poster">
        <img :src="require('@/assets/logo.png')" />
      </div>
      
      <div v-if="posterProps.networksInfo.length >= 1 && posterProps.networksInfo[0].homepage">
        <v-card tile class="networks-card">
          <v-container>
            <v-row justify="center" align="center">
              <div class="network-logo-div">
                <img :src="`https://image.tmdb.org/t/p/w300${posterProps.networksInfo[0].logos[0].file_path}`" class="network-logo" />
              </div>
              <div class="d-flex-col pl-4">
                <h2 class="network-subtitle">Now Streaming</h2>
                <a :href="posterProps.networksInfo[0].homepage" target="_blank" class="network-link">
                  <h1 class="network-title">Watch Now</h1>
                </a>
              </div>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaPoster',
  props: {
    posterProps: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.poster-image {
  border-radius: 8px;
}
.poster-image-with-network {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  z-index: 2;
}
.placeholder-poster {
  width: 100%;
  height: 520px;
  background-color: #171716;
  border-radius: 8px;
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
</style>