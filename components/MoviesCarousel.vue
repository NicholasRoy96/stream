<template>

    <!-- Why is last slide not showing when screen resized?? Don't understand -->
    <!-- Also need to figure out a way of changing margin between cards when shrinkijng size -- able to changed per-page depending on screen-size?? -->
    <!-- If title of movie is too long need to shorten to ... at the end -->
    <!-- If is too difficult, just get rid of carousel and change to showing 6 on a line, then a show more button to render 6 more.. -->
    <!-- Could also just remove bottom button and have just movie poster with hover and link? -->
    <client-only>
      <carousel :per-page="6" :navigationEnabled="true" :paginationEnabled="false" :min-swipe-distance="1">
        <slide v-for="(movie, i) in movies" :key="i" class="slide">
          <MovieCard :movie="movie" />
        </slide>
      </carousel>
    </client-only>
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
  },
  data () {
    return {
      moviePoster: ''
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