<template>
  <div>
    <!-- Dynamic banner image -->
    <v-img :src="`https://image.tmdb.org/t/p/original${storeMovie.info.backdrop_path}`" class="backdrop-image">

      <!-- Poster image and movie info -->
      <v-container fluid fill-height class="overlay-container">
        <v-container>
          <v-row align="center" justify="space-between">
            
            <MediaPoster v-if="storeMovie.info" />

            <!-- Title, Release Date, Genres, Runtime -->
            <v-col cols="8" align-self="center">
              <div class="movie-div">
                <div class="movie-title-div">
                  <span class="movie-title">{{storeMovie.info.title}}<span v-if="storeMovie.info.release_date" class="released-year">({{ storeMovie.info.release_date | formatYear }})</span></span>
                </div>
                <div class="movie-info">
                  <div v-if="storeMovie.info.genres.length" class="movie-info-subdiv">
                    <nuxt-link v-for="(genre, i) in genreList" :key="i" :to="{ path: `/list/movies/genres/${genre.id}` }" class="link">
                      <span>
                        {{genre.formattedName}}
                      </span>
                    </nuxt-link>
                  </div>
                  <span v-if="storeMovie.info.runtime && storeMovie.info.genres.length" class="bullet-divider">&#8226;</span>
                  <div v-if="storeMovie.info.runtime" class="movie-info-subdiv">
                    <span>{{ storeMovie.info.runtime | formatRuntime }}</span>
                  </div>
                </div>

                <!-- Button Row -->
                <v-row v-if="storeMovie.info" align="center" class="pl-6 pb-7">
                  <PercentageWheel v-if="storeMovie.info.vote_average" class="mt-3" :rating="storeMovie.info.vote_average" />
                  <AddWatchlistIcon v-if="storeMovie.info.vote_average" class="pt-3 ml-8" />
                  <AddWatchlistIcon v-else class="pt-5" />
                  <TrailerDialog v-if="storeMovie.trailer" :trailerId="storeMovie.trailer.key" class="mt-3 ml-6" />
                </v-row>
                

                <div v-if="storeMovie.info.tagline" class="movie-tagline">"{{storeMovie.info.tagline}}"</div>

                <!-- Overview -->
                <div v-if="storeMovie.info.overview">
                  <Overview :overview="storeMovie.info.overview" />
                </div>

                <!-- Crew Links -->
                <v-row>
                  <v-col cols="6" md="4" v-if="storeMovie.crew.director.name">
                    <nuxt-link :to="{ path: `/info/people/${storeMovie.crew.director.id}` }" class="link crew">
                      <div class="crew-name">{{storeMovie.crew.director.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Director</div>
                  </v-col>
                  <v-col cols="6" md="4" v-if="storeMovie.crew.novel.name">
                    <nuxt-link :to="{ path: `/info/people/${storeMovie.crew.novel.id}` }" class="link crew">
                      <div class="crew-name">{{storeMovie.crew.novel.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Novel</div>
                  </v-col>
                  <v-col cols="6" md="4" v-if="storeMovie.crew.composer.name">
                    <nuxt-link :to="{ path: `/info/people/${storeMovie.crew.composer.id}` }" class="link crew">
                      <div class="crew-name">{{storeMovie.crew.composer.name}}</div>
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
      <div v-if="storeMovie.cast.length" class="subheading-div">
        <h3 class="subheading">Cast</h3>
        <h3 class="subheading-description">Meet the stars</h3>
      </div>
      <PersonCarousel v-if="storeMovie.cast.length" :useStateCast="true" subheading="true" />

      <!-- Collection cards -->
      <div v-if="storeMovie.collection && storeMovie.collection.parts">
        <div class="subheading-div">
          <h3 class="subheading">{{storeMovie.collection.name}}</h3>
          <h3 class="subheading-description">Explore the entire collection</h3>
        </div>
        <MediaCarousel :useStateCollection="true" />
      </div>

      <!-- Similar movies cards -->
      <div v-if="storeMovie.similarMedia.length">
        <div class="subheading-div">
          <h3 class="subheading">More like this</h3>
          <h3 class="subheading-description">Movies similar to {{storeMovie.info.title}}</h3>
        </div>
        <MediaCarousel :useStateSimilarMedia="true" />
      </div>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaPoster from '@/components/infoPages/MediaPoster.vue'
import AddWatchlistIcon from '@/components/buttons/AddWatchlistIcon.vue'
import MediaCarousel from '@/components/sliders||carousels/MediaCarousel.vue'
import PercentageWheel from '@/components/infoPages/PercentageWheel.vue'
import TrailerDialog from '@/components/infoPages/TrailerDialog.vue'
import Overview from '@/components/infoPages/Overview.vue'
import PersonCarousel from '@/components/sliders||carousels/PersonCarousel.vue'
import FastAverageColor from 'fast-average-color'

export default {
  name: 'Movie',
  components: {
    MediaPoster,
    AddWatchlistIcon,
    MediaCarousel,
    PercentageWheel,
    TrailerDialog,
    Overview,
    PersonCarousel
  },
  computed: {
    storeMovie() {
      return this.$store.state.media.media
    },
    genreList() {
      if (this.storeMovie.info && this.storeMovie.info.genres.length) {
        let genres = this.storeMovie.info.genres
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
  }
}
</script>

<style scoped>
.backdrop-image {
  height: 700px;
}
.overlay-container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, rgba(12, 10, 9, 0.985) 150px, rgba(32, 28, 20, 0.85) 100%);
  align-items: center;
  display: flex;
}
.movie-title-div {
  font-weight: bold;
  display:flex;
  align-items: center;
}
.movie-title {
  font-size: 2.1em;
  font-weight: 750;
}
.released-year {
  color: lightgrey;
  font-size: 1.9rem !important;
  font-weight: normal;
  padding-left: 8px;
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

/* MD */
@media (max-width: 1263px) {
  .movie-div {
    padding-left: 25px;
  }
  .movie-title {
    font-size: 2em;
    font-weight: 700;
  }
  .released-year {
    font-size: 1.8rem;
  }
}
</style>