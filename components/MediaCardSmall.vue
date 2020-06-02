<template>
  <v-card class="media-card">
    <v-img v-if="media.poster_path" class="media-card-poster" :src="`https://image.tmdb.org/t/p/w185${media.poster_path}`">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <div v-else class="placeholder-icon-div">
      <v-icon class="placeholder-media-icon" size="100" color="grey darken-2">mdi-video-image</v-icon>
      <h3 class="placeholder-media-title">No media poster</h3>
    </div>
    <v-card-text class="media-card-title">{{media.title || media.name}}</v-card-text>
    <v-card-text v-if="media.air_date && media.episode_count" class="media-card-subtitle pt-0">{{ media.air_date | formatYear }}, {{media.episode_count}} Episodes</v-card-text>
    <v-card-text v-else class="media-card-subtitle pt-0">Coming soon</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'mediaCardHover',
  props: {
    media: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.media-card {
  height: 275px;
  width: 140px;
  margin: 10px;
}
.media-card-poster {
  height: 214px;
  width: 100%;
}
.media-card-poster:hover {
  opacity: 0.8;
}
.placeholder-icon-div {
  height: 214px;
  width: 100%;
  text-align: center;
  padding-top: 45px;
}
.placeholder-media-title {
  color: lightgrey;
  font-size: 1em;
}
.media-card-link {
  text-decoration: none;
}
.media-card-title {
  color: white !important;
  font-size: 0.9em;
  font-weight: bold;
  line-height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 0;
}
.media-card-title:hover {
  color: #f5c518 !important;
}
.media-card-subtitle {
  font-size: 0.7em;
}
</style>