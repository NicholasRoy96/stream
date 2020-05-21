<template>
  <v-card class="movie-card">
    <nuxt-link :to="{ path: `/movies/${movie.id}` }" class="movie-card-link">
      <v-img v-if="movie.poster_path" class="movie-card-poster" :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div v-else class="placeholder-icon-div">
        <v-icon size="100" color="grey darken-2">mdi-video-image</v-icon>
        <h3 class="placeholder-movie-title">No movie poster</h3>
      </div>
    </nuxt-link>
    <nuxt-link :to="{ path: `/movies/${movie.id}` }" class="movie-card-link">
      <v-card-text class="movie-card-title">{{movie.title}}</v-card-text>
    </nuxt-link>
    <div class="movie-card-rating-div">
      <v-icon class="movie-card-rating-star" size="17">mdi-star</v-icon>
      <span v-if="movie.vote_average !== 0" class="movie-card-rating">{{movie.vote_average}}</span>
      <span v-else class="movie-card-rating">No reviews</span>
    </div>
    <v-card-actions class="card-actions d-none d-sm-block">
      <AddWatchlistButton :movie="movie" />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddWatchlistButton from '@/components/AddWatchlistButton'

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  components: {
    AddWatchlistButton
  }
}
</script>

<style scoped>
.movie-card {
  height: 385px;
  width: 195px;
}
.movie-card-poster {
  height: 70%;
  width: 100%;
}
.movie-card-poster:hover {
  opacity: 0.8;
}
.placeholder-icon-div {
  height: 70%;
  width: 100%;
  text-align: center;
  padding-top: 45px;
}
.placeholder-movie-title {
  color: lightgrey;
}
.movie-card-link {
  text-decoration: none;
}
.movie-card-title {
  color: white;
  font-size: 0.9em;
  font-weight: bold;
  line-height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 0;
}
.movie-card-title:hover {
  color: #f5c518;
}
.movie-card-rating-div{
  padding: 4px 16px 16px 16px;
  align-content: center;
}
.movie-card-rating-star {
  color: #f5c518;
  padding-right: 4px;
}
.movie-card-rating {
  font-size: 0.8em;
}
.card-actions {
  position: absolute;
  bottom: 5px;
  width: 100%;
}

/* XS */
@media (max-width: 599px) {
  .movie-card {
    height: 280px;
  }
  .movie-card-poster {
    height: 78%;
  }
  .placeholder-icon-div {
    height: 78%;
  }
  .movie-card-title {
    font-size: 0.8em;
  }
  .movie-card-rating-div{
    padding-top: 0;
  }
}
</style>