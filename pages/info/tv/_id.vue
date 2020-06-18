<template>
  <v-app v-if="loaded">
    
    <!-- Dynamic banner image -->
    <v-img :src="tvShowBackdrop" class="backdrop-image">
      
    <!-- Poster image -->
      <v-container fluid fill-height class="overlay-container">
        <v-container>
          <v-row align="center">
            <v-col cols="4" class="d-none d-md-block">
              <MediaPoster v-if="posterProps" :posterProps="posterProps" />
            </v-col>

            <!-- Genres and release date -->
            <v-col cols="12" md="8">
              <div class="tv-div">
                <div class="tv-title-div">
                  <span class="tv-title">{{tvShow.name}}</span><span v-if="tvShow.first_air_date" class="released-year">({{ tvShow.first_air_date | formatYear }})</span>
                </div>
                <div class="tv-info">
                  <div v-if="tvShow.genres.length" class="tv-info-subdiv">
                    <nuxt-link v-for="(genre, i) in genreList" :key="i" :to="{ path: `/list/tv/genres/${genre.id}` }" class="link">
                      <span>
                        {{genre.formattedName}}
                      </span>
                    </nuxt-link>
                  </div>
                  <span v-if="tvShow.episode_run_time.length && tvShow.genres.length" class="bullet-divider">&#8226;</span>
                  <div v-if="tvShow.episode_run_time.length" class="tv-info-subdiv">
                    <span class="runtime">{{ tvShow.episode_run_time[0] | formatRuntime }}</span>
                  </div>
                </div>

                <!-- Button row -->
                <v-row v-if="tvShow" align="center" class="pl-6 pb-7">
                  <PercentageWheel v-if="tvShow.vote_average" class="mt-3" :rating="this.tvShow.vote_average" />
                  <AddWatchlistButton v-if="tvShow.vote_average" :media="tvShow" :icon="true" class="pt-3 ml-8" />
                  <AddWatchlistButton v-else :media="tvShow" :icon="true" class="pt-5" />
                  <TrailerDialog v-if="trailer" :trailer="trailer" class="mt-3 ml-6" />
                </v-row>

                <!-- Overview -->
                <div v-if="tvShow.overview">
                  <Overview :overview="tvShow.overview" />
                </div>


                <v-row v-if="tvShow.created_by.length">
                  <v-col cols="6" md="4" v-for="(creator, i) in tvShow.created_by" :key="i">
                    <nuxt-link :to="{ path: `/info/people/${creator.id}` }" class="link crew">
                      <div class="crew-name">{{creator.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Creator</div>
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
      <!-- Seasons cards -->
      <div v-if="tvShow.seasons && tvShow.seasons.length" class="sub-div">
        <h3 class="sub-heading">Seasons ({{tvShow.seasons.length}})</h3>
        <h3 class="sub-heading-description">Explore every season</h3>
      </div>
      <v-row class="pl-4">
        <MediaCardSmall v-for="(season, i) in tvShow.seasons" :key="i" :media="season" />
      </v-row>

      <!-- Cast cards -->
      <div v-if="cast && cast.length" class="sub-div">
        <h3 class="sub-heading">Cast</h3>
        <h3 class="sub-heading-description">Meet the stars</h3>
      </div>
      <v-row>
        <v-col cols="6" sm="4" lg="2" v-for="(actor, i) in cast" :key="i" align-self="center">
          <PersonCard :person="actor" :subheading="true" />
        </v-col>
      </v-row>

      <!-- Crew cards -->
      <div v-if="crew && crew.length" class="sub-div">
        <h3 class="sub-heading">Crew</h3>
        <h3 class="sub-heading-description">Meet the production team</h3>
      </div>
      <v-row>
        <v-col cols="6" sm="4" lg="2" v-for="(crew, i) in crew" :key="i" align-self="center">
          <PersonCard :person="crew" :subheading="true" />
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
import MediaPoster from '@/components/MediaPoster.vue'
import AddWatchlistButton from '@/components/AddWatchlistButton.vue'
import PersonCard from '@/components/PersonCard.vue'
import MediaCard from '@/components/MediaCard.vue'
import MediaCardSmall from '@/components/MediaCardSmall.vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import PercentageWheel from '@/components/PercentageWheel.vue'
import TrailerDialog from '@/components/TrailerDialog.vue'
import Overview from '@/components/Overview.vue'

export default {
  components: {
    MediaPoster,
    AddWatchlistButton,
    PersonCard,
    MediaCard,
    MediaCardSmall,
    MediaCarousel,
    PercentageWheel,
    TrailerDialog,
    Overview
  },
  data() {
    return {
      loaded: false,
      tvId: this.$route.params.id,
      tvShow: {genres: [], episode_run_time: [], created_by: []},
      tvShowPoster: '',
      tvShowBackdrop: '',
      trailer: {},
      cast: [],
      crew: [],
      composer: {},
      novel: {},
      networksInfo: [],
      gotNetworkInfo: false,
      similarTvShows: [],
    }
  },
  computed: {
    posterProps() {
      if (this.tvShow && this.gotNetworkInfo) {
        return {
          media: this.tvShow,
          networksInfo: this.networksInfo
        }
      }
    },
    genreList() {
      if (this.tvShow && this.tvShow.genres.length) {
        const genres = this.tvShow.genres
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
    async getTvShow() {
      try {
        this.tvShow = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}?api_key=${process.env.apikey}&language=en-US`)
        this.getNetworkInfo()
        if (this.tvShow.backdrop_path) {
          this.tvShowBackdrop = `https://image.tmdb.org/t/p/original${this.tvShow.backdrop_path}`
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
        const trailers = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/videos?api_key=${process.env.apikey}&language=en-US`)
        const trailer = trailers.results.find(trailer => {
          return trailer.type === "Trailer"
        })
        this.trailer = trailer
      } catch(err) {
        // suppress trailer lookup error
        // console.log(err)
      } 
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/tv/${this.tvId}/credits?api_key=${process.env.apikey}`)
        this.composer = credits.crew.find(crew => crew.job === "Original Music Composer") || {}
        this.novel = credits.crew.find(crew => crew.job === "Novel") || {}
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
    async getNetworkInfo() {
      try {
        const request = []
        const logoRequest = []
        const requests = this.tvShow.networks.forEach(network => {
          request.push(this.$axios.$get(`https://api.themoviedb.org/3/network/${network.id}?api_key=${process.env.apikey}`))
        })
        const networks = await Promise.all(request)
        if (!networks.length) {
          this.gotNetworkInfo = true
        }
        const logoRequests = networks.forEach(network => {
          logoRequest.push(this.$axios.$get(`https://api.themoviedb.org/3/network/${network.id}/images?api_key=${process.env.apikey}`))
        })
        const logos = await Promise.all(logoRequest)
        logos.forEach(logo => {
          const matchingObject = networks.find(network => network.id === logo.id)
          matchingObject["logos"] = logo.logos
        })
        this.networksInfo = networks
        this.gotNetworkInfo = true
      } catch(err) {
        console.log(err)
      }  
    },
  },
  created() {
    Promise.all([
      this.getTvShow(),
      this.getTrailers(),
      this.getCredits(),
      this.getSimilarTvShows()
    ])
    this.loaded = true
  }
}
</script>

<style scoped>
.backdrop-image {
  height: 725px;
}
.overlay-container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, rgba(12, 10, 9, 0.985) 150px, rgba(32, 28, 20, 0.85) 100%);
  align-items: center;
}
.tv-div {
  padding-left: 20px;
}
.tv-title-div {
  font-weight: bold;
}
.tv-title {
  font-size: 2.1em;
  font-weight: 750;
  margin-right: 8px;
}
.released-year {
  color: lightgrey;
  font-size: 1.9em;
  font-weight: normal;
}
.tv-info {
  margin-top: -5px;
  margin-bottom: 5px;
  padding-left: 4px;
  display: flex;
  align-content: center;
  font-size: 0.96em;
}
.tv-info-subdiv {
  align-self: center;
}
.bullet-divider {
  margin: 0 12px 0 12px;
  font-size: 1.4em;
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