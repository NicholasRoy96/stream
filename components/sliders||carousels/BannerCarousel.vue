<template>
  <v-carousel :height="bannerSize" cycle interval="5000" continuous show-arrows-on-hover hide-delimiters>
    <div v-for="(movie,i) in movies" :key="i">
      <v-carousel-item
        :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
        reverse-transition="fade-transition"
        transition="fade-transition"
        class="slide"
      >
        <v-container>
          <BannerOverlay :media="movie" />
        </v-container>
      </v-carousel-item>
    </div>
  </v-carousel>
</template>

<script>
import BannerOverlay from '@/components/misc/BannerOverlay.vue'

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
  },
  computed: {
    bannerSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '500'
        case 'sm': return '550'
        case 'md': return '600'
        case 'lg': return '650'
        case 'xl': return '650'
      }
    },
  }
}
</script>