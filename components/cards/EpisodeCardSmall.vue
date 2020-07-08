<template>
  <v-card tile class="episode-card">
    <v-row align="center">
      <v-col cols="5" sm="3">
        <v-img v-if="episode.still_path" :src="`https://image.tmdb.org/t/p/original${this.episode.still_path}`">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div v-if="!episode.still_path" class="placeholder-div">
          <img :src="require('@/assets/logo.png')" class="placeholder-logo" />
        </div>
      </v-col>
      <v-col cols="7" sm="9">
        <h3 class="episode-name">{{episode.episode_number}}. {{episode.name}}</h3>
      </v-col>
    </v-row>
    <p class="episode-overview">{{episode.overview}}</p>
  </v-card>
</template>

<script>
export default {
  name: 'EpisodeCardSmall',
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.episode-card {
  width: 100%;
  background-color: transparent;
  padding-bottom: 6px;
}
.placeholder-div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.placeholder-logo {
  width: 150px;
}
.episode-name {
  padding-right: 10px;
  font-size: 1.15em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.episode-overview {
  padding-top: 4px;
  padding-right: 10px;
  font-size: 0.85em;
  opacity: 0.76;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* MEDIA QUERIES */
/* XS */
@media(max-width: 599px) {
  .episode-name {
    font-size: 1.1em;
  }
  .episode-overview {
    font-size: 0.8em;
  }
}
</style>

