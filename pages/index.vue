<template>
    <div>
    <Carousel />
    <v-container>
      <h3 class="heading">What to watch</h3>
      <div class="subheading-div">
        <h3 class="subheading">Most popular</h3>
        <h3 class="subheading-description">The fan favourite films</h3>
      </div>
      <MoviesCarousel :movies="popularMovies" class="mb-10" />

      <div class="subheading-div">
        <h3 class="subheading">Top rated</h3>
        <h3 class="subheading-description">The most critically acclaimed</h3>
      </div>
      <MoviesCarousel :movies="topMovies"/>

      <h3 class="heading">Explore genres</h3>
        <v-row>
          <v-col cols="6" md="4" v-for="(genre, i) in genres" :key="i">
            <v-hover v-slot:default="{ hover }">
              <nuxt-link :to="{ path: `/genres/${genre.genreId}` }">
                <v-card>
                  <v-img :src="genre.backdropImage">
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal display-3"
                        style="height: 100%;"
                      >
                      <span class="v-card--reveal-name">{{genre.name}}</span>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-card>
              </nuxt-link>
            </v-hover>
          </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue"
import MoviesCarousel from "@/components/MoviesCarousel.vue"

export default {
  components: {
    Carousel,
    MoviesCarousel
  },
  data() {
    return {
      popularMovies: [],
      topMovies: [],
      genres: [
        { name: "Action", genreId: 28, backdropImage: "https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg"},
        { name: "Comedy", genreId: 35, backdropImage: "https://image.tmdb.org/t/p/original/165GzcOatgvHMeDu8FdKJcO23KI.jpg"},
        { name: "Family", genreId: 10751, backdropImage: "https://image.tmdb.org/t/p/original/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg"},
        { name: "Horror", genreId: 27, backdropImage: "https://image.tmdb.org/t/p/original/vZ7EVk7FaNEWYqlVWbFLHP8Z0LU.jpg"},
        { name: "Mystery", genreId: 9648, backdropImage: "https://image.tmdb.org/t/p/original/AbRYlvwAKHs0YuyNO6NX9ofq4l6.jpg"},
        { name: "Sci-Fi", genreId: 878, backdropImage: "https://image.tmdb.org/t/p/original/3dPhs7hUnQLphDFzdkD407VZDYo.jpg"}
      ]
    }
  },
  methods: {
    async getPopularMovies() {
      const movies = await this.$axios.$get('https://api.themoviedb.org/3/movie/popular?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&page=1');
      this.popularMovies = movies.results;
    },
    async getTopMovies() {
      const movies = await this.$axios.$get('https://api.themoviedb.org/3/movie/top_rated?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&page=1');
      this.topMovies = movies.results;
    }
  },
  created() {
    this.getPopularMovies();
    this.getTopMovies();
  }
}
</script>

<style scoped>
.heading {
  font-size: 2.5em;
  color: #f5c518;
  font-weight: bold;
  margin: 25px 0 20px 0;
}
.subheading-div {
  margin: 20px 0 20px 0
}
.subheading {
  font-size: 1.5em;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.subheading-description {
  color: darkgrey;
  padding-left: 10px;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
span.v-card--reveal-name {
  color: #f5c518;
  font-weight: bold;
  font-size: 2rem;
}
</style>