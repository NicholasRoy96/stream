<template>
  <client-only>
    <carousel :per-page="6" :navigationEnabled="true" :paginationEnabled="false" :min-swipe-distance="1">
      <slide v-for="(movie, i) in movies" :key="i" class="slide">
        <MediaCard :media="movie" />
      </slide>
    </carousel>
  </client-only>
</template>

<script>
import MediaCard from '@/components/MediaCard.vue'

export default {
  name: 'MoviesCarousel',
  components: {
    MediaCard
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