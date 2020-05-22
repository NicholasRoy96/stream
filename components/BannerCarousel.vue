<template>
  <v-container>
    <v-carousel height="700" continuous show-arrows-on-hover hide-delimiters>
      <div v-for="(movie,i) in movies" :key="i">
        <nuxt-link :to="{ path: `/movies/${movie.id}` }" class="slide-link">
          <v-carousel-item
            :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
            reverse-transition="fade-transition"
            transition="fade-transition"
            class="slide"
          >
            
            <div class="background-div"></div>
            <v-row class="overlay-row">
                <v-col cols="5" sm="4" md="3" align-self="end">
                <v-img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="image-poster" >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                </v-col>
                <v-col cols="7" sm="8" md="9" align-self="end">
                  <div class="title-div">
                    <div class="movie-title">{{movie.title}}</div>
                    <div class="movie-subtitle">Trending now</div>
                  </div>
                </v-col>
            </v-row>
        
          </v-carousel-item>
        </nuxt-link>
      </div>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.slide-link {
  text-decoration: none;
}
.slide:hover {
  opacity: 0.9;
}
.background-div {
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(8,7,7,0.8981967787114846) 55%, rgba(14,12,12,0.7525385154061625) 70%, rgba(24,21,21,0.5116421568627452) 85%, rgba(0,0,0,0) 100%);
}
.overlay-row {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.image-poster {
  margin-left: 25px;
  margin-bottom: 10px;
  max-width: 300px;
  transition: transform .2s;
}
.image-poster:hover {
  transform: scale(1.1);
}
.title-div {
  padding-bottom: 20px;
  padding-left: 5px;
}
.movie-title {
  font-size: 2.5em;
  font-weight: bold;
  color: white;
}
.movie-title:hover {
  color: #f5c518;
}
.movie-subtitle {
  font-size: 2em;
  color: grey;
}

/* MEDIA QUERIES */

/* SM */
@media (max-width: 959px) {
  .movie-title {
    font-size: 1.8em;
  }
  .movie-subtitle {
    font-size: 1.3em;
  }
}

/* XS */
@media (max-width: 599px) {
  .movie-title {
    font-size: 1.5em;
  }
  .movie-subtitle {
    font-size: 1em;
  }
}
</style>