<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <v-img :src="movieBackdrop">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <!-- Poster image and movie info -->
      <v-row class="mt-10">

        <v-col cols="4" class="d-none d-md-block">
          <v-img v-if="moviePoster" :src="moviePoster">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-icon v-else size="300" color="grey darken-2">mdi-video-image</v-icon>
        </v-col>

        <v-col cols="12" md="8">
          <div class="pl-4">
            <div class="movie-title-div">
              <span class="movie-title">{{movie.title}}</span><span class="released-year">({{releasedYear}})</span>
            </div>
            <div v-if="movie.tagline" class="movie-tagline">"{{movie.tagline}}"</div>
            <div class="movie-info">
              <div v-if="movie.runtime" class="movie-info-item">
                <v-icon color="blue" class="mr-2">mdi-clock-outline</v-icon>{{movie.runtime}} minutes
              </div>
              <div v-if="movie.vote_average" class="movie-info-item">
                <v-icon color="yellow" class="mr-2">mdi-star</v-icon>{{movie.vote_average}}
              </div>
            </div>
            <div class="movie-overview">
              {{movie.overview}}
            </div>
            <div class="genre-info">
              <span class="genres">Genres: </span>
              <a class="genre-name" v-for="(genre, i) in movie.genres" :key="i" :href="'/genres/'+ genre.id">{{genre.name}}</a>
            </div>
            <div>
              <AddWatchlistButton :movie="movie" />
            </div>
          </div>
        </v-col>

      </v-row>

      <!-- Cast cards -->
      <!-- TODO: Separate into separate component -->
      <div v-if="cast.length" class="sub-div">
        <h3 class="sub-heading">Cast</h3>
        <h3 class="sub-heading-description">Meet the stars</h3>
      </div>
      <v-row>
        <v-col cols="6" sm="4" lg="2" v-for="(actor, i) in cast" :key="i" align-self="center">
          <ActorCard :actor="actor" />
        </v-col>
      </v-row>

      <!-- Similar movies cards -->
      <div v-if="similarMovies.length" class="sub-div">
        <h3 class="sub-heading">Similar movies</h3>
        <h3 class="sub-heading-description">We found more movies you might like</h3>
      </div>
      <v-row>
        <v-col cols="4" sm="3" lg="2" v-for="(movie, i) in similarMovies" :key="i">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import AddWatchlistButton from '@/components/AddWatchlistButton.vue'
import ActorCard from '@/components/ActorCard.vue'

export default {
  components: {
    MovieCard,
    AddWatchlistButton,
    ActorCard
  },
  data () {
    return {
      movieId: this.$route.params.id,
      movie: {},
      moviePoster: '',
      movieBackdrop: '',
      cast: [],
      similarMovies: []
    }
  },
  computed: {
    releasedYear() {
      if (this.movie && this.movie.release_date) {
        const date = this.movie.release_date.toString()
        return date.slice(0, 4)
      }
      return ''
    }
  },
  methods: {
    async getMovie() {
      this.movie = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=fac214f57908d267c5cd93e69460f956&language=en-US`)
      console.log(this.movie)
      if (this.movie.poster_path) {
        this.moviePoster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      }
      this.movieBackdrop = `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
    },
    async getSimilarMovies () {
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=fac214f57908d267c5cd93e69460f956&language=en-US&page=1`)
      this.similarMovies = movies.results.slice(0, 12)
    },
    async getCredits() {
      const credits = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=fac214f57908d267c5cd93e69460f956`)
      this.cast = credits.cast.slice(0, 6)
      console.log(this.cast)
    }
  },
  created() {
    this.getMovie()
    this.getSimilarMovies()
    this.getCredits()
  }
}
</script>

<style scoped>
.movie-title-div {
  color: #f5c518;
  font-weight: bold;
}
.movie-title {
  font-size: 2.5em;
  margin-right: 8px;
}
.released-year {
  font-size: 1.7em;
  font-weight: normal;
}
.movie-tagline {
  font-size: 1.3em;
  font-weight: bold;
}
.movie-info {
  margin-top: 20px;
  font-weight: bold;
}
.movie-info-item {
  margin-bottom: 10px;
}
.movie-overview {
  margin-top: 30px;
  margin-bottom: 15px;
}
.genre-info {
  color: lightgrey;
  margin-bottom: 40px;
  max-width: 100%;
  display: block;
  word-wrap: break-word;
}
.genres {
  margin-right: 10px;
  font-weight: bold;
}
.genre-name {
  margin-right: 12px;
  color: lightgrey !important;
  text-decoration: none;
}
.genre-name:hover {
  text-decoration: underline;
}
.sub-div {
  margin: 40px 0 20px 0
}
.sub-heading {
  font-size: 1.5em;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.sub-heading-description {
  color: darkgrey;
  padding-left: 10px;
}
</style>