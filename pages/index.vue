<template>
    <div>
      <BannerCarousel :movies="popularMovies"/>
      <v-container>
        <h3 class="heading">Bingeworthy series</h3>
        <nuxt-link :to="{ path: '/list/tv/keywords/popular' }" class="subheading-link">
          <div class="subheading-div">
            <div class="d-flex">
              <h3 class="subheading">Classic TV</h3>
              <v-icon size="38" class="subheading-arrow-icon">mdi-chevron-right</v-icon>
            </div>
            <h3 class="subheading-description">The most popular series</h3>
          </div>
        </nuxt-link>
        <MediaCarousel :media="popularTV" />

        <nuxt-link :to="{ path: '/list/tv/keywords/top_rated' }" class="subheading-link">
          <div class="subheading-div">
            <div class="d-flex">
              <h3 class="subheading">Top rated</h3>
              <v-icon size="38" class="subheading-arrow-icon">mdi-chevron-right</v-icon>
            </div>
            <h3 class="subheading-description">Explore the best-rated series</h3>
          </div>
        </nuxt-link>
        <MediaCarousel :media="topTV" />

        <h3 class="heading">Must-watch movies</h3>
        <nuxt-link :to="{ path: '/list/movies/keywords/popular' }" class="subheading-link">
          <div class="subheading-div">
            <div class="d-flex">
              <h3 class="subheading">Most Popular</h3>
              <v-icon size="38" class="subheading-arrow-icon">mdi-chevron-right</v-icon>
            </div>
            <h3 class="subheading-description">The current fan favourites</h3>
          </div>
        </nuxt-link>
        <MediaCarousel :media="popularMovies" />

        <nuxt-link :to="{ path: '/list/movies/keywords/top_rated' }" class="subheading-link">
          <div class="subheading-div">
            <div class="d-flex">
              <h3 class="subheading">Top rated</h3>
              <v-icon size="38" class="subheading-arrow-icon">mdi-chevron-right</v-icon>
            </div>
            <h3 class="subheading-description">The most critically acclaimed</h3>
          </div>
        </nuxt-link>
        <MediaCarousel :media="topMovies" />

        <h3 class="heading">Explore more</h3>
        <nuxt-link :to="{ path: '/list/people/keywords/popular' }" class="subheading-link">
          <div class="subheading-div">
            <div class="d-flex">
              <h3 class="subheading">Trending today</h3>
              <v-icon size="38" class="subheading-arrow-icon">mdi-chevron-right</v-icon>
            </div>
            <h3 class="subheading-description">Most popular actors</h3>
          </div>
        </nuxt-link>
        <PersonCarousel :people="trendingActors" />

        <v-row class="subheading-div" align="center">
          <h3 class="subheading">Recently Viewed</h3>
          <v-spacer></v-spacer>
          <v-btn text class="text-capitalize empty-recent-button" @click="emptyRecentlyViewed">Clear All</v-btn>
        </v-row>
        <MediaCarousel v-if="recentlyViewed.length" :media="recentlyViewed" :useRecentCard="true" />
        <h3 v-else class="no-recent-pages">You have no recently viewed pages.</h3>
        
      </v-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BannerCarousel from "@/components/sliders||carousels/BannerCarousel.vue"
import MediaCarousel from "@/components/sliders||carousels/MediaCarousel.vue"
import MediaCard from "@/components/cards/MediaCard.vue"
import GenreCard from "@/components/cards/GenreCard.vue"
import PersonCarousel from "@/components/sliders||carousels/PersonCarousel.vue"

export default {
  components: {
    BannerCarousel,
    MediaCarousel,
    MediaCard,
    GenreCard,
    PersonCarousel
  },
  data() {
    return {
      popularTV: [],
      topTV: [],
      popularMovies: [],
      topMovies: [],
      trendingActors: []
    }
  },
  computed: {
    ...mapState(["recentlyViewed"])
  },
  methods: {
    ...mapActions(["emptyRecentlyViewed"]),
    async getPopularTV() {
      const tv = await this.$axios.$get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.popularTV = tv.results
    },
    async getTopTV() {
      const tv = await this.$axios.$get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.topTV = tv.results
    },
    async getPopularMovies() {
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.popularMovies = movies.results
    },
    async getTopMovies() {
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.topMovies = movies.results
    },
    async getTrendingActors() {
      const actors = await this.$axios.$get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.trendingActors = actors.results.slice(0, 12)
    }
  },
  created() {
    Promise.all([
      this.getPopularTV(),
      this.getTopTV(),
      this.getPopularMovies(),
      this.getTopMovies(),
      this.getTrendingActors()
    ])
  }
}
</script>

<style scoped>
.no-recent-pages {
  color: darkgrey;
  font-size: 1em;
}
.empty-recent-button {
  color: #5799ef;
}
.empty-recent-button:hover {
  text-decoration: underline;
}

/* MEDIA QUERIES */
/* MD */
@media(max-width: 1263px) {
  .no-recent-pages {
    font-size: 0.97em;
  }
}

/* XS */
@media(max-width: 599px) {
  .no-recent-pages {
    font-size: 0.85em;
  }
}
</style>