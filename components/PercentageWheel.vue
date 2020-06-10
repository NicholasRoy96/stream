<template>
  <v-progress-circular rotate="270" size="65" :value="ratingPercentage" width="5" color="#f5c518">
    {{ratingPercentage}} <v-icon size="10">mdi-percent</v-icon>
  </v-progress-circular>
</template>

<script>
export default {
  name: 'PercentageWheel',
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  computed: {
    ratingPercentage() {
      if (this.rating) {
        return Math.round((this.rating / 10) * 100)
      }
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
</style>

<style scoped>

</style>