<template>
  <v-card tile class="episode-card">
    <v-img v-if="episode.still_path" :src="`https://image.tmdb.org/t/p/original${this.episode.still_path}`" class="episode-still">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
        </v-row>
      </template>
      <h3 class="episode-number">{{episode.episode_number}}</h3>
    </v-img>
    <div v-if="!episode.still_path" class="placeholder-div">
      <img :src="require('@/assets/logo.png')" class="placeholder-logo" />
      <h3 class="episode-number">{{episode.episode_number}}</h3>
    </div>
    <h3 class="episode-name">{{episode.name}}</h3>
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
  width: 305px;
  height: 280px;
  background-color: transparent;
}
.episode-still {
  height: 170px;
  width: 100%;
}
.placeholder-div {
  height: 170px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.placeholder-logo {
  width: 150px;
}
.episode-number {
  font-size: 1.5em;
  position: absolute;
  bottom: 0;
  left: 10px;
}
.episode-name {
  font-size: 1.1em;
  opacity: 0.87;
  padding-top: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.episode-overview {
  font-size: 0.9em;
  opacity: 0.76;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>