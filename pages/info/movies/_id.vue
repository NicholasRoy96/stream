<template>
  <v-app v-if="loaded">
      
    <!-- Dynamic banner image -->
    <v-img :src="movieBackdrop" class="backdrop-image">

      <!-- Poster image and movie info -->
      <v-container fluid fill-height class="overlay-container">
        <v-container>
          <v-row align="center">
            <v-col cols="4" class="d-none d-md-block">
              <MediaPoster v-if="movie" :posterProps="{ media: movie }" />
            </v-col>

            <v-col cols="12" md="8">
              <!-- GENRES AND RELEASE DATE -->
              <div class="movie-div">
                <div class="movie-title-div">
                  <span class="movie-title">{{movie.title}}</span><span v-if="movie.release_date" class="released-year">({{ movie.release_date | formatYear }})</span>
                </div>
                <div class="movie-info">
                  <div v-if="movie.genres.length" class="movie-info-subdiv">
                    <nuxt-link v-for="(genre, i) in genreList" :key="i" :to="{ path: `/list/movies/genres/${genre.id}` }" class="link">
                      <span>
                        {{genre.formattedName}}
                      </span>
                    </nuxt-link>
                  </div>
                  <span v-if="movie.runtime && movie.genres.length" class="bullet-divider">&#8226;</span>
                  <div v-if="movie.runtime" class="movie-info-subdiv">
                    <span>{{ movie.runtime | formatRuntime }}</span>
                  </div>
                </div>

                <!-- BUTTON ROW -->
                <v-row v-if="movie" align="center" class="pl-6 pb-7">
                  <PercentageWheel v-if="movie.vote_average" class="mt-3" :rating="this.movie.vote_average" />
                  <AddWatchlistButton v-if="movie.vote_average" :media="movie" :icon="true" class="pt-3 ml-8" />
                  <AddWatchlistButton v-else :media="movie" :icon="true" class="pt-5" />
                  <TrailerDialog v-if="trailer" :trailer="trailer" class="mt-3 ml-6" />
                </v-row>
                

                <div v-if="movie.tagline" class="movie-tagline">"{{movie.tagline}}"</div>

                <!-- OVERVIEW -->
                <div v-if="movie.overview">
                  <Overview :overview="movie.overview" />
                </div>

                <!-- CREW LINKS -->
                <v-row>
                  <v-col cols="6" md="4" v-if="director.name">
                    <nuxt-link :to="{ path: `/info/people/${director.id}` }" class="link crew">
                      <div class="crew-name">{{director.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Director</div>
                  </v-col>
                  <v-col cols="6" md="4" v-if="novel.name">
                    <nuxt-link :to="{ path: `/info/people/${novel.id}` }" class="link crew">
                      <div class="crew-name">{{novel.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Novel</div>
                  </v-col>
                  <v-col cols="6" md="4" v-if="composer.name">
                    <nuxt-link :to="{ path: `/info/people/${composer.id}` }" class="link crew">
                      <div class="crew-name">{{composer.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Original Music</div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-img>
      
    <v-container>
      <!-- Cast cards -->
      <div v-if="cast && cast.length" class="subheading-div">
        <h3 class="subheading">Cast</h3>
        <h3 class="subheading-description">Meet the stars</h3>
      </div>
      <PersonCarousel :people="cast" subheading="true" />

      <!-- Collection cards -->
      <div v-if="collectionExists">
        <div class="subheading-div">
          <h3 class="subheading">{{collection.name}}</h3>
          <h3 class="subheading-description">Explore the entire collection</h3>
        </div>
        <MediaCarousel :media="collection.parts" />
      </div>

      <!-- Similar movies cards -->
      <div v-if="similarMovies.length">
        <div class="subheading-div">
          <h3 class="subheading">Similar movies</h3>
          <h3 class="subheading-description">We found more movies you might like</h3>
        </div>
        <MediaCarousel :media="similarMovies" />
      </div>

    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import MediaPoster from '@/components/MediaPoster.vue'
import MediaCard from '@/components/MediaCard.vue'
import AddWatchlistButton from '@/components/AddWatchlistButton.vue'
import PersonCard from '@/components/PersonCard.vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import PercentageWheel from '@/components/PercentageWheel.vue'
import TrailerDialog from '@/components/TrailerDialog.vue'
import Overview from '@/components/Overview.vue'
import PersonCarousel from '@/components/PersonCarousel.vue'
import FastAverageColor from 'fast-average-color'

export default {
  components: {
    MediaPoster,
    MediaCard,
    AddWatchlistButton,
    PersonCard,
    MediaCarousel,
    PercentageWheel,
    TrailerDialog,
    Overview,
    PersonCarousel
  },
  data () {
    return {
      loaded: false,
      movieId: this.$route.params.id,
      movie: {genres: []},
      moviePoster: '',
      movieBackdrop: '',
      trailer: {},
      cast: [],
      crew: [],
      director: {},
      novel: {},
      composer: {},
      collection: {},
      collectionExists: false,
      similarMovies: [],
    }
  },
  computed: {
    genreList() {
      if (this.movie && this.movie.genres.length) {
        let genres = this.movie.genres
        if (genres.length > 5) genres = genres.slice(0, 5)
        const formattedGenres = genres.map((genre, index) => {
          if (index === genres.length -1) {
            genre["formattedName"] = genre.name
            return genre
          }
          genre["formattedName"] = `${genre.name},`
          return genre
        })
        return formattedGenres
      }
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getMovie() {
      try {
        this.movie = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.apikey}&language=en-US`)
        if (this.movie.poster_path) {
          this.moviePoster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        }
        if (this.movie.backdrop_path) {
          this.movieBackdrop = `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
          // this.getAverageColor()
        }
        if (this.movie.belongs_to_collection) {
          this.getCollection()
        }
        this.addMediaToRecentlyViewed()
      } catch (err) {
        if (err.response.status === 404) {
          return this.$nuxt.error({ statusCode: 404, message: err.message })
        }
        return this.$nuxt.error({ statusCode: 500, message: err.message })
      }
    },
    async getTrailers() {
      try {
        const trailers = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=${process.env.apikey}&language=en-US`)
        const trailer = trailers.results.find(trailer => {
          return trailer.type === "Trailer"
        })
        this.trailer = trailer
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
        this.director = credits.crew.find(crew => crew.job === "Director") || {}
        this.composer = credits.crew.find(crew => crew.job === "Original Music Composer") || {}
        this.novel = credits.crew.find(crew => crew.job === "Novel") || {}
        this.cast = credits.cast.slice(0, 24)
        this.crew = credits.crew.slice(0, 6)
        
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
    },
    // async getAverageColor() {
    //   function startDownload() {
    //   let imageURL = this.movieBackdrop;
    
    //   downloadedImg = new Image;
    //   downloadedImg.crossOrigin = "Anonymous";
    //   downloadedImg.addEventListener("load", imageReceived, false);
    //   downloadedImg.src = imageURL;
    // }
    //   function imageReceived() {
    //     let canvas = document.createElement("canvas");
    //     let context = canvas.getContext("2d");

    //     canvas.width = downloadedImg.width;
    //     canvas.height = downloadedImg.height;
      
    //     context.drawImage(downloadedImg, 0, 0);
    //     imageBox.appendChild(canvas);
    //     try {
    //       localStorage.setItem("poster-image", canvas.toDataURL("image/png"));
    //     }
    //     catch(err) {
    //       console.log("Error: " + err);
    //     }  
    //   }
    //   const fac = new FastAverageColor()
    //   fac.getColorAsync(localStorage.poster-image)
    //     .then(function(color) {

    //         console.log('Average color', color);
    //     })
    //     .catch(function(e) {
    //         console.log(e);
    //     });
    //   startDownload()
    // }
  },
  created() {
    Promise.all([
      this.getMovie(),
      this.getCredits(),
      this.getTrailers(),
      this.getSimilarMovies(),
    ])
    this.loaded = true
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
.placeholder-poster {
  width: 100%;
  height: 520px;
  background-color: #171716;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay-container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, rgba(12, 10, 9, 0.985) 150px, rgba(32, 28, 20, 0.85) 100%);
  align-items: center;
}
.movie-div {
  padding-left: 20px;
}
.movie-title-div {
  font-weight: bold;
}
.movie-title {
  font-size: 2.1em;
  font-weight: 750;
  margin-right: 8px;
}
.released-year {
  color: lightgrey;
  font-size: 1.9em;
  font-weight: normal;
}
.movie-info {
  margin-top: -5px;
  margin-bottom: 5px;
  padding-left: 4px;
  display: flex;
  align-content: center;
  font-size: 0.96em;
}
.movie-info-subdiv {
  align-self: center;
}
.bullet-divider {
  margin: 0 12px 0 12px;
  font-size: 1.4em;
}
.movie-tagline {
  font-size: 1em;
  color: lightgrey;
  font-style: italic;
}
.movie-overview-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}
.movie-overview {
  color: lightgrey;
  margin-bottom: 15px;
  font-size: 0.95em;
}
.link {
  text-decoration: none;
  color: white;
}
.link:hover {
  text-decoration: underline;
}
.link.crew:hover {
  text-decoration: none;
}
.crew-name {
  font-weight: 715;
  font-size: 0.97em;
}
.crew-role {
  font-weight: 400;
  font-size: 0.9em;
  color: lightgrey;
}
/* MEDIA QUERIES */

/* SM */
@media (max-width: 959px) {
  .movie-div {
    padding-left: 0;
  }
}
</style>