<template>
    <div>
      <BannerCarousel :movies="popularMovies"/>
      <v-container>
        <h3 class="heading">Bingeworthy series</h3>
        <div class="subheading-div">
          <h3 class="subheading">Classic TV</h3>
          <h3 class="subheading-description">Most popular series</h3>
        </div>
        <MediaCarousel :media="popularTV" />

        <div class="subheading-div">
          <h3 class="subheading">Top rated</h3>
          <h3 class="subheading-description">Explore the best-rated series</h3>
        </div>
        <MediaCarousel :media="topTV" />

        <h3 class="heading">Movies to watch</h3>
        <div class="subheading-div">
          <h3 class="subheading">Most popular</h3>
          <h3 class="subheading-description">The current fan favourites</h3>
        </div>
        <MediaCarousel :media="popularMovies" />

        <div class="subheading-div">
          <h3 class="subheading">Top rated</h3>
          <h3 class="subheading-description">The most critically acclaimed</h3>
        </div>
        <MediaCarousel :media="topMovies" />

        <h3 class="heading">Explore genres</h3>
          <v-row>
            <v-col cols="4" md="3" v-for="(genre, i) in genres" :key="i">
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
              <PersonCard :person="actor" />
            </v-col>
          </v-row>

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
import BannerCarousel from "@/components/BannerCarousel.vue"
import MediaCarousel from "@/components/MediaCarousel.vue"
import MediaCard from "@/components/MediaCard.vue"
import GenreCard from "@/components/GenreCard.vue"
import PersonCard from '@/components/PersonCard.vue'

export default {
  components: {
    BannerCarousel,
    MediaCarousel,
    MediaCard,
    GenreCard,
    PersonCard,
  },
  data() {
    return {
      popularTV: [],
      topTV: [],
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
    ...mapState(["recentlyViewed"])
  },
  methods: {
    ...mapActions(["emptyRecentlyViewed"]),
    async getPopularTV() {
      const tv = await this.$axios.$get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.popularTV = tv.results
      console.log(this.recentlyViewed)
    },
    async getTopTV() {
      const tv = await this.$axios.$get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.topTV = tv.results
    },
    async getPopularMovies() {
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apikey}&language=en-US&page=1`)
      this.popularMovies = movies.results
      console.log(this.topTV)
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
    this.getPopularTV()
    this.getTopTV()
    this.getPopularMovies()
    this.getTopMovies()
    this.getTrendingActors()
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
</style>