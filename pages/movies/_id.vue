<template>
  <v-app>
      
    <!-- Dynamic banner image -->
    <v-img :src="movieBackdrop" class="backdrop-image">

      <!-- Poster image and movie info -->
      <v-container fluid fill-height class="overlay-container">
        <v-container>
          <v-row align="center">
            <v-col cols="4" class="d-none d-md-block">
              <v-img v-if="moviePoster" :src="moviePoster" class="poster-image">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-icon v-else size="300" color="grey darken-2">mdi-video-image</v-icon>
            </v-col>

            <v-col cols="12" md="8">
              <div class="movie-div">
                <div class="movie-title-div">
                  <span class="movie-title">{{movie.title}}</span><span v-if="movie.release_date" class="released-year">({{ movie.release_date | formatYear }})</span>
                </div>
                <div v-if="movie.tagline" class="movie-tagline">"{{movie.tagline}}"</div>

                <PercentageWheel v-if="movie.vote_average" class="mt-3" :rating="this.movie.vote_average" />

                <div class="movie-info">
                  <div v-if="movie.runtime" class="movie-info-item">
                    <v-icon color="blue" class="mr-2" size="20">mdi-clock-outline</v-icon>
                    <span class="movie-info-item-data">{{movie.runtime}} minutes</span>
                  </div>
                </div>

                <!-- OVERVIEW SHORTENED IF 400+ CHARS -->
                <div v-if="movie.overview">
                  <div class="movie-overview-title">Overview</div>
                  <div v-if="trimmedOverview && !expandOverview" class="movie-overview">
                    <span class="movie-overview">{{trimmedOverview}}</span>
                    <v-icon @click="expandOverview = true" icon>mdi-chevron-down</v-icon>
                  </div>
                  
                  <!-- OVERVIEW EXPANDED -->
                  <div v-if="!trimmedOverview || expandOverview" class="movie-overview">{{movie.overview}}
                    <v-icon v-if="expandOverview" @click="expandOverview = false">mdi-chevron-up</v-icon>
                  </div>
                </div>

                <div class="extra-info">
                  <div v-if="director.name" class="extra-info-item">
                    <span class="extra-info-title">Directed by: </span>
                    <a class="extra-info-data" :href="`/people/${director.id}`">{{director.name}}</a>
                  </div>
                  <div v-if="movie.genres.length" class="extra-info-item">
                    <span class="extra-info-title">Genres: </span>
                    <a class="extra-info-data" v-for="(genre, i) in movie.genres" :key="i" :href="`/genres/${genre.id}`">{{genre.name}}</a>
                  </div>
                  <div v-if="movie.status">
                    <span class="extra-info-title">Status: </span>
                    <span>{{movie.status}}</span>
                  </div>
                </div>
                <div>
                  <AddWatchlistButton :media="movie" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-img>
      
    <v-container>
      <!-- Cast cards -->
      <div v-if="cast && cast.length" class="sub-div">
        <h3 class="sub-heading">Cast</h3>
        <h3 class="sub-heading-description">Meet the stars</h3>
      </div>
      <v-row>
        <v-col cols="6" sm="4" lg="2" v-for="(actor, i) in cast" :key="i" align-self="center">
          <PersonCard :person="actor" />
        </v-col>
      </v-row>

      <!-- Crew cards -->
      <div v-if="crew && crew.length" class="sub-div">
        <h3 class="sub-heading">Crew</h3>
        <h3 class="sub-heading-description">Meet the production team</h3>
      </div>
      <v-row>
        <v-col cols="6" sm="4" lg="2" v-for="(crew, i) in crew" :key="i" align-self="center">
          <PersonCard :person="crew" />
        </v-col>
      </v-row>

      <!-- Trailers -->
      <div v-if="trailers.length" class="sub-div">
        <h3 class="sub-heading">Trailers</h3>
        <h3 class="sub-heading-description">Get a preview</h3>
      </div>
      <v-row v-if="trailers.length">
        <v-col cols="12" md="6" v-for="(trailer, i) in trailers" :key="i">
          <client-only>
            <youtube :video-id="trailer.key" player-height="350" player-width="100%"></youtube>
          </client-only>
        </v-col>
      </v-row>

      <!-- Collection cards -->
      <div v-if="collectionExists">
        <div class="sub-div">
          <h3 class="sub-heading">{{collection.name}}</h3>
          <h3 class="sub-heading-description">Explore the entire collection</h3>
        </div>
        <MediaCarousel :media="collection.parts" />
      </div>

      <!-- Similar movies cards -->
      <div v-if="similarMovies.length">
        <div class="sub-div">
          <h3 class="sub-heading">Similar movies</h3>
          <h3 class="sub-heading-description">We found more movies you might like</h3>
        </div>
        <MediaCarousel :media="similarMovies" />
      </div>

    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import MediaCard from '@/components/MediaCard.vue'
import AddWatchlistButton from '@/components/AddWatchlistButton.vue'
import PersonCard from '@/components/PersonCard.vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import PercentageWheel from '@/components/PercentageWheel.vue'

export default {
  components: {
    MediaCard,
    AddWatchlistButton,
    PersonCard,
    MediaCarousel,
    PercentageWheel
  },
  data () {
    return {
      movieId: this.$route.params.id,
      movie: {genres: []},
      moviePoster: '',
      movieBackdrop: '',
      trailers: [],
      expandOverview: false,
      cast: [],
      crew: [],
      director: {},
      collection: {},
      collectionExists: false,
      similarMovies: []
    }
  },
  computed: {
    trimmedOverview() {
      if (this.movie && this.movie.overview) {
        if (this.movie.overview.length < 400) {
          return ''
        }
        return this.movie.overview.slice(0, 400).trim() + "..."
      }
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getMovie() {
      try {
        this.movie = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.apikey}&language=en-US`)
        console.log(this.movie)
        if (this.movie.poster_path) {
          this.moviePoster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        }
        if (this.movie.backdrop_path) {
          this.movieBackdrop = `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
        }
        if (this.movie.belongs_to_collection) {
          this.getCollection()
        }
        this.addMediaToRecentlyViewed()
      } catch (err) {
        // suppress movie lookup error
        // console.log(err)
      }
    },
    async getTrailers() {
      try {
        const trailers = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=${process.env.apikey}&language=en-US`)
        this.trailers = trailers.results.slice(0, 2)
      } catch(err) {
        // suppress trailer lookup error
        // console.log(err)
      } 
    },
    async getCollection() {
      try {
        const collection = await this.$axios.$get (`https://api.themoviedb.org/3/collection/${this.movie.belongs_to_collection.id}?api_key=${process.env.apikey}&language=en-US`)
        this.collection = collection
        this.collectionExists = true
      } catch(err) {
        // supress collection lookup error
        // console.log(err)
      }
    },
    async getSimilarMovies () {
      try {
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=${process.env.apikey}&language=en-US&page=1`)
        this.similarMovies = movies.results.slice(0, 18)
      } catch(err) {
        // suppress movie lookup error
        // console.log(err)
      }
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=${process.env.apikey}`)
        console.log(credits.crew)
        this.cast = credits.cast.slice(0, 6)
        this.crew = credits.crew.slice(0, 6)
        this.director = credits.crew.find(crew => crew.job === "Director") || {}
      } catch(err) {
        // suppress cast lookup error
        // console.log(err)
      }
    },
    async addMediaToRecentlyViewed () {
      try {
        await this.addToRecentlyViewed(this.movie)
      } catch(err) {
        console.log(err)
      }
    }
  },
  created() {
    this.getMovie()
    this.getCredits()
    this.getTrailers()
    this.getSimilarMovies()
  }
}
</script>

<style scoped>
.backdrop-image {
  height: 700px;
}
.poster-image {
  border-radius: 8px;
}
.overlay-container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, rgba(12, 10, 9, 0.95) 150px, rgba(32, 28, 20, 0.8) 100%);
  align-items: center;
}
.movie-div {
  padding-left: 16px;
}
.movie-title-div {
  font-weight: bold;
}
.movie-title {
  font-size: 2.3em;
  margin-right: 8px;
}
.released-year {
  color: lightgrey;
  font-size: 1.8em;
  font-weight: normal;
}
.movie-tagline {
  font-size: 1em;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.movie-info {
  margin-top: 20px;
}
.movie-info-item {
  margin-bottom: 10px;
  vertical-align: center;
}
.movie-info-item-data {
  vertical-align: middle;
}
.vote-count {
  font-size: 0.8em;
}
.movie-overview-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
}
.movie-overview {
  color: lightgrey;
  margin-bottom: 25px;
  font-size: 0.95em;
}
.extra-info {
  color: lightgrey;
  margin-bottom: 40px;
  max-width: 100%;
  display: block;
  word-wrap: break-word;
}
.extra-info-item {
  padding-bottom: 5px;
}
.extra-info-title {
  margin-right: 10px;
  font-weight: bold;
}
.extra-info-data {
  margin-right: 12px;
  color: lightgrey !important;
  text-decoration: none;
}
.extra-info-data:hover {
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

/* MEDIA QUERIES */

/* SM */
@media (max-width: 959px) {
  .movie-div {
    padding-left: 0;
  }
}
</style>