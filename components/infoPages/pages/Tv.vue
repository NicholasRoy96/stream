<template>
  <div>
    <!-- Dynamic banner image -->
    <v-img :src="`https://image.tmdb.org/t/p/original${storeTv.info.backdrop_path}`" class="backdrop-image">
      
      <!-- Poster image -->
      <v-container fluid fill-height class="overlay-container">
        <v-container>
          <v-row align="center" justify="space-between">
            
            <MediaPoster v-if="storeTv.info"/>

            <!-- Title, Release Date, Genres, Runtime -->
            <v-col cols="8" align-self="center">
              <div class="tv-div">
                <div class="tv-title-div">
                  <span class="tv-title">{{storeTv.info.name}}<span v-if="storeTv.info.first_air_date" class="released-year">({{ storeTv.info.first_air_date | formatYear }})</span></span>
                </div>
                <div class="tv-info">
                  <div v-if="storeTv.info.genres.length" class="tv-info-subdiv">
                    <nuxt-link v-for="(genre, i) in genreList" :key="i" :to="{ path: `/list/tv/genres/${genre.id}` }" class="link">
                      <span>
                        {{genre.formattedName}}
                      </span>
                    </nuxt-link>
                  </div>
                  <span v-if="storeTv.info.episode_run_time.length && storeTv.info.genres.length" class="bullet-divider">&#8226;</span>
                  <div v-if="storeTv.info.episode_run_time.length" class="tv-info-subdiv">
                    <span>{{ storeTv.info.episode_run_time[0] | formatRuntime }}</span>
                  </div>
                </div>

                <!-- Button row -->
                <v-row align="center" class="pl-6 pb-7">
                  <PercentageWheel v-if="storeTv.info.vote_average" class="mt-3" />
                  <AddWatchlistIcon v-if="storeTv.info.vote_average" class="pt-3 ml-8" />
                  <AddWatchlistIcon v-else class="pt-5" />
                  <TrailerDialog v-if="storeTv.trailer" class="mt-3 ml-6" />
                </v-row>

                <!-- Overview -->
                <div v-if="storeTv.info.overview">
                  <Overview />
                </div>

                <v-row v-if="storeTv.crew || storeTv.info.created_by.length">
                  <v-col cols="6" md="4" v-for="(creator, i) in storeTv.info.created_by" :key="i">
                    <nuxt-link :to="{ path: `/info/people/${creator.id}` }" class="link crew">
                      <div class="crew-name">{{creator.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Creator</div>
                  </v-col>
                  <v-col cols="6" md="4" v-if="storeTv.crew.novel.name">
                    <nuxt-link :to="{ path: `/info/people/${storeTv.crew.novel.id}` }" class="link crew">
                      <div class="crew-name">{{storeTv.crew.novel.name}}</div>
                    </nuxt-link>
                    <div class="crew-role">Novel</div>
                  </v-col>
                  <v-col cols="6" md="4" v-if="storeTv.crew.composer.name">
                    <nuxt-link :to="{ path: `/info/people/${storeTv.crew.composer.id}` }" class="link crew">
                      <div class="crew-name">{{storeTv.crew.composer.name}}</div>
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
      <div v-if="storeTv.info.seasons.length" class="subheading-div">
        <h3 class="subheading">Seasons ({{storeTv.info.seasons.length}})</h3>
        <h3 class="subheading-description">Explore every season</h3>
      </div>
      <v-row class="pl-4">
        <MediaCardSmall v-for="(season, i) in storeTv.info.seasons" :key="i" :media="season" />
      </v-row>

      <!-- Cast cards -->
      <div v-if="storeTv.cast.length" class="subheading-div">
        <h3 class="subheading">Cast</h3>
        <h3 class="subheading-description">Meet the stars</h3>
      </div>
      <PersonCarousel v-if="storeTv.cast.length" :useStateCast="true" />

      <!-- Similar TV show cards -->
      <div v-if="storeTv.similarMedia.length">
        <div class="subheading-div">
          <h3 class="subheading">More like this</h3>
          <h3 class="subheading-description">Similar TV shows you might like</h3>
        </div>
        <MediaCarousel v-if="storeTv.similarMedia.length" :useStateSimilarMedia="true" />
      </div>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaPoster from '@/components/infoPages/MediaPoster.vue'
import AddWatchlistIcon from '@/components/buttons/AddWatchlistIcon.vue'
import PersonCard from '@/components/cards/PersonCard.vue'
import MediaCard from '@/components/cards/MediaCard.vue'
import MediaCardSmall from '@/components/cards/MediaCardSmall.vue'
import MediaCarousel from '@/components/sliders||carousels/MediaCarousel.vue'
import PercentageWheel from '@/components/infoPages/PercentageWheel.vue'
import TrailerDialog from '@/components/infoPages/TrailerDialog.vue'
import Overview from '@/components/infoPages/Overview.vue'
import PersonCarousel from '@/components/sliders||carousels/PersonCarousel.vue'

export default {
  name: 'Tv',
  components: {
    MediaPoster,
    AddWatchlistIcon,
    PersonCard,
    MediaCard,
    MediaCardSmall,
    MediaCarousel,
    PercentageWheel,
    TrailerDialog,
    Overview,
    PersonCarousel
  },
  computed: {
    storeTv() {
      return this.$store.state.media.media
    },
    genreList() {
      if (this.storeTv.info && this.storeTv.info.genres.length) {
        const genres = this.storeTv.info.genres
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
  height: 725px;
}
.overlay-container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, rgba(12, 10, 9, 0.985) 150px, rgba(32, 28, 20, 0.85) 100%);
  align-items: center;
  display: flex;
}
.tv-title-div {
  font-weight: bold;
  display: flex;
  align-items: center;
}
.tv-title {
  font-size: 2.1em;
  font-weight: 750;
}
.released-year {
  color: lightgrey;
  font-size: 1.9rem;
  font-weight: normal;
  padding-left: 8px;
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

/* MEDIA QUERIES */
/* MD */
@media (max-width: 1263px) {
  .tv-div {
    padding-left: 25px;
  }
  .tv-title {
    font-size: 2em;
    font-weight: 700;
  }
  .released-year {
    font-size: 1.8rem;
  }
}
</style>