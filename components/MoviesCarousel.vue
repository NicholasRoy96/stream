<template>
  <carousel :per-page="6" :navigationEnabled="true" :paginationEnabled="false" :min-swipe-distance="1">
    <slide v-for="(movie, i) in movies" :key="i" class="slide">
      <MovieCard :movie="movie" />
    </slide>
  </carousel>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MoviesCarousel',
  components: {
    MovieCard
  },
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.VueCarousel-navigation-button {
  color: white !important;
}
</style>

<style scoped>
.slide {
  max-width: 185px !important;
  padding: 3px;
}
</style>