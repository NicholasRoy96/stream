<template>
    <div>
      <Carousel />
      <v-container>
        <h3 class="heading">What to watch</h3>
        <div class="subheading-div">
          <h3 class="subheading">Most popular</h3>
          <h3 class="subheading-description">The fan favourite films</h3>
        </div>
        
        <!-- LG+ -->
        <MoviesCarousel :movies="popularMovies" class="mb-10 d-none d-lg-block" />

        <!-- MD- -->
        <v-row class="d-lg-none mb-10">
          <v-col cols="4" sm="3" v-for="(movie, i) in trimmedPopularMovies" :key="i">
            <MovieCard :movie="movie"/>
          </v-col>
        </v-row>

        <div class="subheading-div">
          <h3 class="subheading">Top rated</h3>
          <h3 class="subheading-description">The most critically acclaimed</h3>
        </div>

        <!-- LG+ -->
        <MoviesCarousel :movies="topMovies" class="d-none d-lg-block" />

        <!-- MD- -->
        <v-row class="d-lg-none">
          <v-col cols="4" sm="3" v-for="(movie, i) in trimmedTopMovies" :key="i">
            <MovieCard :movie="movie"/>
          </v-col>
        </v-row>

        <h3 class="heading">Explore genres</h3>
          <v-row>
            <v-col cols="6" md="4" v-for="(genre, i) in genres" :key="i">
              <GenreCard :genre="genre" />
            </v-col>
          </v-row>

          <h3 class="heading">Explore more</h3>
          <div class="subheading-div">
            <h3 class="subheading">Trending today</h3>
            <h3 class="subheading-description">Most popular actors</h3>
          </div>
          <v-row>
            <v-col cols="6" sm="4" lg="2" v-for="(actor, i) in trendingActors" :key="i" align-self="center">
              <ActorCard :actor="actor" />
            </v-col>
          </v-row>
        
      </v-container>
    </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue"
import MoviesCarousel from "@/components/MoviesCarousel.vue"
import MovieCard from "@/components/MovieCard.vue"
import GenreCard from "@/components/GenreCard.vue"
import ActorCard from '@/components/ActorCard.vue'

export default {
  components: {
    Carousel,
    MoviesCarousel,
    MovieCard,
    GenreCard,
    ActorCard
  },
  data() {
    return {
      popularMovies: [],
      topMovies: [],
      trendingActors: [],
      genres: [
        { name: "Action", genreId: 28, backdropImage: "https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg"},
        { name: "Adventure", genreId: 12, backdropImage: "https://image.tmdb.org/t/p/original/zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg"},
        { name: "Animation", genreId: 16, backdropImage: "https://image.tmdb.org/t/p/original/xFxk4vnirOtUxpOEWgA1MCRfy6J.jpg"},
        { name: "Comedy", genreId: 35, backdropImage: "https://image.tmdb.org/t/p/original/165GzcOatgvHMeDu8FdKJcO23KI.jpg"},
        { name: "Crime", genreId: 80, backdropImage: "https://image.tmdb.org/t/p/original/7VrRna8S3x6xbijooeBmxqvHXiu.jpg"},
        { name: "Documentary", genreId: 99, backdropImage: "https://image.tmdb.org/t/p/original/dPBoyjIj8Hl8HnEVOVDk8hyl1OZ.jpg"},
        { name: "Drama", genreId: 18, backdropImage: "https://image.tmdb.org/t/p/original/sixfWYfNegaGGHKdXrNNUHaMiAC.jpg"},
        { name: "Family", genreId: 10751, backdropImage: "https://image.tmdb.org/t/p/original/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg"},
        { name: "Fantasy", genreId: 14, backdropImage: "https://image.tmdb.org/t/p/original/bVmSXNgH1gpHYTDyF9Q826YwJT5.jpg"},
        { name: "History", genreId: 36, backdropImage: "https://image.tmdb.org/t/p/original/w2ezhZUk7ZJH9Mdk1Y6CTmaDRg5.jpg"},
        { name: "Horror", genreId: 27, backdropImage: "https://image.tmdb.org/t/p/original/vZ7EVk7FaNEWYqlVWbFLHP8Z0LU.jpg"},
        { name: "Music", genreId: 10402, backdropImage: "https://image.tmdb.org/t/p/original/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg"},
        { name: "Mystery", genreId: 9648, backdropImage: "https://image.tmdb.org/t/p/original/AbRYlvwAKHs0YuyNO6NX9ofq4l6.jpg"},
        { name: "Romance", genreId: 10749, backdropImage: "https://image.tmdb.org/t/p/original/6VmFqApQRyZZzmiGOQq2C92jyvH.jpg"},
        { name: "Sci-Fi", genreId: 878, backdropImage: "https://image.tmdb.org/t/p/original/3dPhs7hUnQLphDFzdkD407VZDYo.jpg"},
        { name: "TV Movie", genreId: 10770, backdropImage: "https://image.tmdb.org/t/p/original/rBnUusNA6FmypqjGmRo5dvgycqL.jpg"},
        { name: "Thriller", genreId: 53, backdropImage: "https://image.tmdb.org/t/p/original/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg"},
        { name: "War", genreId: 10752, backdropImage: "https://image.tmdb.org/t/p/original/cqa3sa4c4jevgnEJwq3CMF8UfTG.jpg"},
        { name: "Western", genreId: 37, backdropImage: "https://image.tmdb.org/t/p/original/s4cJQaj40SwMifUrrdtdOJsjnRO.jpg"}
      ]
    }
  },
  computed: {
    trimmedPopularMovies() {
      if (this.popularMovies) {
        return this.popularMovies.slice(0, 12)
      }
    },
    trimmedTopMovies() {
      if (this.topMovies) {
        return this.topMovies.slice(0, 12)
      }
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
    },
    async getTrendingActors() {
      const actors = await this.$axios.$get('https://api.themoviedb.org/3/person/popular?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&page=1');
      this.trendingActors = actors.results.slice(0, 12)
    }
  },
  created() {
    this.getPopularMovies();
    this.getTopMovies();
    this.getTrendingActors();
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

</style>