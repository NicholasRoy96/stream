<template>
  <v-progress-circular rotate="270" :size="circleSize" :value="ratingPercentage" :width="width" color="#f5c518">
    {{ratingPercentage}} <v-icon :size="iconSize">mdi-percent</v-icon>
  </v-progress-circular>
</template>

<script>
export default {
  name: 'PercentageWheel',
  computed: {
    storeMedia() {
      return this.$store.state.media.media
    },
    ratingPercentage() {
      if (this.storeMedia.info.vote_average) {
        return Math.round((this.storeMedia.info.vote_average / 10) * 100)
      }
    },
    circleSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 50
      if (this.$vuetify.breakpoint.name === 'sm') return 55
      return 65
    },
    width() {
      if (this.$vuetify.breakpoint.name === 'xs') return 3.5
      if (this.$vuetify.breakpoint.name === 'sm') return 4
      return 5
    },
    iconSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 8
      if (this.$vuetify.breakpoint.name === 'sm') return 9
      return 10
    }
  }
}
</script>

<style>
.mdi-percent::before {
  margin-bottom: 10px;
  color: white;
}
.v-progress-circular__info {
  font-weight: 650;
  font-size: 1.15em;
  color: white;
}

/* MEDIA QUERIES */
/* SM */
@media(max-width: 959px) {
  .v-progress-circular__info {
    font-weight: 620;
    font-size: 0.95em;
  }
}

/* XS */
@media(max-width: 599px) {
  .v-progress-circular__info {
    font-weight: 570;
    font-size: 0.85em;
  }
}
</style>

<style scoped>

</style>