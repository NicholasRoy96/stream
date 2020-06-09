<template>
  <v-app>
    
    <!-- Dynamic banner image -->
    <v-img :src="tvShowBackdrop" class="backdrop-image">
      
    <!-- Poster image and TV show info -->
      <v-container fluid fill-height class="overlay-container">
        <v-container>
          <v-row align="center">
            <v-col cols="4" class="d-none d-md-block">
              <v-img v-if="tvShowPoster" :src="tvShowPoster" class="poster-image">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-icon v-else size="300" color="grey darken-2">mdi-video-image</v-icon>
            </v-col>

            <v-col cols="12" md="8">
              <div class="tv-div">
                <div class="tv-title-div">
                  <span class="tv-title">{{tvShow.name}}</span><span v-if="tvShow.first_air_date" class="released-year">({{ tvShow.first_air_date | formatYear }})</span>
                </div>
                <div v-if="tvShow.tagline" class="tv-tagline">"{{tvShow.tagline}}"</div>

                <PercentageWheel v-if="tvShow.vote_average" class="mt-3" :rating="this.tvShow.vote_average" />

                <!-- OVERVIEW SHORTENED IF 400+ CHARS -->
                <div v-if="tvShow.overview">
                  <div class="tv-overview-title">Overview</div>
                  <div v-if="trimmedOverview && !expandOverview">
                      <span class="tv-overview">{{trimmedOverview}}</span>
                      <v-icon @click="expandOverview = true" icon>mdi-chevron-down</v-icon>
                  </div>
                  
                  <!-- OVERVIEW EXPANDED -->
                  <div v-if="!trimmedOverview || expandOverview" class="tv-overview">
                      <span class="tv-overview">{{tvShow.overview}}</span>
                      <v-icon v-if="expandOverview" @click="expandOverview = false">mdi-chevron-up</v-icon>
                  </div>
                </div>

                <div class="extra-info">
                  <div v-if="tvShow.created_by && tvShow.created_by.length" class="extra-info-item">
                    <span class="extra-info-title">Created by: </span>
                    <a class="extra-info-data" v-for="(creator, i) in tvShow.created_by" :key="i" :href="`/info/people/${creator.id}`">{{creator.name}}</a>
                  </div>
                  <!-- <div v-if="tvShow.genres.length" class="extra-info-item">
                    <span class="extra-info-title">Genres: </span>
                    <a class="extra-info-data" v-for="(genre, i) in tvShow.genres" :key="i" :href="`/genres/${genre.id}`">{{genre.name}}</a>
                  </div> -->
                </div>
                <div>
                  <AddWatchlistButton :media="tvShow" />
                </div>
              </div>
            </v-col>

          </v-row>
        </v-container>
      </v-container>
    </v-img>

    <v-container>
      <!-- Seasons cards -->
      <div v-if="tvShow.seasons && tvShow.seasons.length" class="sub-div">
        <h3 class="sub-heading">Seasons ({{tvShow.seasons.length}})</h3>
        <h3 class="sub-heading-description">Explore every season</h3>
      </div>
      <v-row>
        <MediaCardSmall v-for="(season, i) in tvShow.seasons" :key="i" :media="season" />
      </v-row>

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

      <!-- Similar TV show cards -->
      <div v-if="similarTvShows.length">
        <div class="sub-div">
          <h3 class="sub-heading">Similar Shows</h3>
          <h3 class="sub-heading-description">We found more TV shows you might like</h3>
        </div>
        <MediaCarousel :media="similarTvShows" />
      </div>

    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AddWatchlistButton from '@/components/AddWatchlistButton.vue'
import PersonCard from '@/components/PersonCard.vue'
import MediaCard from '@/components/MediaCard.vue'
import MediaCardSmall from '@/components/MediaCardSmall.vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import PercentageWheel from '@/components/PercentageWheel.vue'

export default {
  components: {
    AddWatchlistButton,
    PersonCard,
    MediaCard,
    MediaCardSmall,
    MediaCarousel,
    PercentageWheel
  },
  data() {
    return {
      tvId: this.$route.params.id,
      tvShow: {},
      tvShowPoster: '',
      tvShowBackdrop: '',
      expandOverview: false,
      cast: [],
      crew: [],
      similarTvShows: []
    }
  },
  computed: {
    trimmedOverview() {
      if (this.tvShow && this.tvShow.overview) {
        if (this.tvShow.overview.length < 400) {
          return ''
        }
        return this.tvShow.overview.slice(0, 400).trim() + "..."
      }
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getTvShow() {
      try {
        this.tvShow = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}?api_key=${process.env.apikey}&language=en-US`)
        console.log(this.tvShow)
        if (this.tvShow.poster_path) {
          this.tvShowPoster = `https://image.tmdb.org/t/p/w500${this.tvShow.poster_path}`
        }
        if (this.tvShow.backdrop_path) {
          this.tvShowBackdrop = `https://image.tmdb.org/t/p/original${this.tvShow.backdrop_path}`
        }
        this.addMediaToRecentlyViewed()
      } catch (err) {
        // suppress tv lookup error
        // console.log(err)
      }
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/credits?api_key=${process.env.apikey}`)
        console.log(credits)
        this.cast = credits.cast.slice(0, 6)
        this.crew = credits.crew.slice(0, 6)
      } catch(err) {
        // suppress cast lookup error
        // console.log(err)
      }
    },
    async getSimilarTvShows () {
      try {
        const tvShows = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/similar?api_key=${process.env.apikey}&language=en-US&page=1`)
        console.log(tvShows)
        this.similarTvShows = tvShows.results.slice(0, 18)
      } catch(err) {
        // suppress tv lookup error
        // console.log(err)
      }
    },
    async addMediaToRecentlyViewed () {
      try {
        await this.addToRecentlyViewed(this.tvShow)
      } catch(err) {
        console.log(err)
      }
    },
  },
  created() {
    this.getTvShow()
    this.getCredits()
    this.getSimilarTvShows()
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
.tv-div {
  padding-left: 16px;
}
.tv-title-div {
  font-weight: bold;
}
.tv-title {
  font-size: 2.3em;
  margin-right: 8px;
}
.released-year {
  color: lightgrey;
  font-size: 1.8em;
  font-weight: normal;
}
.tv-tagline {
  font-size: 1em;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.tv-info {
  margin-top: 20px;
}
.tv-info-item {
  margin-bottom: 10px;
  vertical-align: center;
}
.tv-info-item-data {
  vertical-align: middle;
}
.vote-count {
  font-size: 0.8em;
}
.tv-overview-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
}
.tv-overview {
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
  .tv-div {
    padding-left: 0;
  }
}
</style>