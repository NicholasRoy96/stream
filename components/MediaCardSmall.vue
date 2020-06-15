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
    </div>
    <v-card-text class="media-card-title">{{media.title || media.name}}</v-card-text>
    <div v-if="media.air_date && media.episode_count" class="media-card-subtitle pt-0">
      <span class="d-none d-md-flex media-card-released-year">{{ media.air_date | formatYear }}, </span>
      <span>{{media.episode_count}} Episodes</span>
    </div>
    <v-card-text v-else class="media-card-subtitle pt-0">Coming soon</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'mediaCardSmall',
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
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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
  font-size: 0.75em;
  display: flex;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;
  padding-left: 15px;
}
.media-card-released-year {
  font-weight: 600;
  padding-right: 3px;
}
/* MEDIA QUERIES */

/* MD */
@media(max-width: 1263px) {
  .media-card {
    width: 130px;
    height: 255px;
    margin: 8px;
  }
  .media-card-poster {
    height: 194.03px;
    width: 100%;
  }
  .placeholder-icon-div {
    height: 194.03px;
  }
}

/* SM */
@media(max-width: 959px) {
  .media-card {
    width: 120px;
    height: 240px;
    margin: 7px;
  }
  .media-card-poster {
    height: 179.1px;
    width: 100%;
  }
  .placeholder-icon-div {
    height: 179.1px;
  }
}

/* XS */
@media(max-width: 599px) {
  .media-card {
    width: 100px;
    height: 210px;
    margin: 6px;
  }
  .media-card-poster {
    height: 149.25px;
    width: 100%;
  }
  .placeholder-icon-div {
    height: 149.25px;
  }
  .media-card-title {
    font-size: 0.8em;
  }
}
</style>