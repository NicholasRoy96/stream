<template>
  <v-container>
    <v-carousel height="700" continuous show-arrows-on-hover hide-delimiters>
      <div v-for="(movie,i) in movies" :key="i">
          <v-carousel-item
            :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
            reverse-transition="fade-transition"
            transition="fade-transition"
            class="slide"
          >
            <BannerOverlay :media="movie" />
          </v-carousel-item>
      </div>
    </v-carousel>
  </v-container>
</template>

<script>
import BannerOverlay from '@/components/BannerOverlay.vue'

export default {
  name: 'BannerCarousel',
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  components: {
    BannerOverlay
  }
}
</script>