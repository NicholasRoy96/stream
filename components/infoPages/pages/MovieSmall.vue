<template>
  <div class="background">
    <!-- Dynamic banner image -->
    <v-img :src="`https://image.tmdb.org/t/p/original${storeMovie.info.backdrop_path}`" class="backdrop-image">

      <!-- Poster image-->
      <v-container fluid class="overlay-container">
        <v-row align="center">
          <MediaPoster v-if="storeMovie.info" class="pl-6"/>
        </v-row>
      </v-container>
    </v-img>
            

    <!-- GENRES AND RELEASE DATE -->
    <v-container>
      <div class="movie-title-div">
        <span class="movie-title">{{storeMovie.info.title}}</span><span v-if="storeMovie.info.release_date" class="released-year">({{ storeMovie.info.release_date | formatYear }})</span>
      </div>
      

      <!-- BUTTON ROW -->
      <v-row v-if="storeMovie.info" align="center" justify="space-around" class="pl-4 pr-4">
        <div class="rating-div">
          <PercentageWheel v-if="storeMovie.info.vote_average" class="mt-3" :rating="storeMovie.info.vote_average" />
          <h3 class="user-score">User Score</h3>
        </div>
        <TrailerDialog v-if="storeMovie.trailer" class="mt-3 ml-6" />
      </v-row>
    </v-container>
        
    <div class="movie-info black-background">
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
        
    <v-container>
      <div class="pl-4 pr-4">
        <div v-if="storeMovie.info.tagline" class="movie-tagline">"{{storeMovie.info.tagline}}"</div>

        <!-- OVERVIEW -->
        <div v-if="storeMovie.info.overview">
          <Overview :overview="storeMovie.info.overview" />
        </div>

        <!-- CREW LINKS -->
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
    </v-container>
        
    
    <div class="black-background">
      <v-container>
        <!-- Cast cards -->
        <div v-if="storeMovie.cast && storeMovie.cast.length" class="subheading-div">
          <h3 class="subheading">Cast</h3>
          <h3 class="subheading-description">Meet the stars</h3>
        </div>
        <PersonCarousel :useStateCast="true" subheading="true" />

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
            <h3 class="subheading">Similar movies</h3>
            <h3 class="subheading-description">We found more movies you might like</h3>
          </div>
          <MediaCarousel :useStateSimilarMedia="true" />
        </div>

      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaPoster from '@/components/infoPages/MediaPoster.vue'
import MediaCard from '@/components/cards/MediaCard.vue'
import AddWatchlistIcon from '@/components/buttons/AddWatchlistIcon.vue'
import PersonCard from '@/components/cards/PersonCard.vue'
import MediaCarousel from '@/components/sliders||carousels/MediaCarousel.vue'
import PercentageWheel from '@/components/infoPages/PercentageWheel.vue'
import TrailerDialog from '@/components/infoPages/TrailerDialog.vue'
import Overview from '@/components/infoPages/Overview.vue'
import PersonCarousel from '@/components/sliders||carousels/PersonCarousel.vue'
import FastAverageColor from 'fast-average-color'

export default {
  name: 'MovieSmall',
  components: {
    MediaPoster,
    MediaCard,
    AddWatchlistIcon,
    PersonCard,
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
        if (genres.length > 3) genres = genres.slice(0, 3)
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
.black-background {
  background-color: #0f0f0f
}
.backdrop-image {
  height: 350px;
}
.overlay-container {
  height: 100%;
  width: 100%;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(8,7,7,0.9) 20%, rgba(8,7,7,0.85) 23%, rgba(8,7,7,0.8) 26%, rgba(0,0,0,0.05) 45%);
  align-items: center;
  display: flex;
}
.movie-title-div {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px 10px 16px;
}
.movie-title {
  font-size: 1.4em;
  font-weight: 750;
  margin-right: 8px;
}
.released-year {
  color: lightgrey;
  font-size: 1.1em;
  font-weight: normal;
}
.rating-div {
  display:flex;
  align-items: center;
}
.user-score {
  padding-top: 9px;
  padding-left: 14px;
  font-size: 1em;
}
.movie-info {
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 0.96em;
  font-weight: 500;
  color: white;
}
.movie-info-subdiv {
  align-self: center;
}
.bullet-divider {
  margin: 2px 12px 0 12px;
  font-size: 1.5em;
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
/* XS */
@media(max-width: 599px) {
  .backdrop-image {
    height: 230px;
  }
  .movie-title {
    font-size: 1.3em;
  }
  .released-year {
    font-size: 1em;
  }
  .movie-info {
    font-size: 0.93em;
    font-weight: 450;
  }
}
</style>