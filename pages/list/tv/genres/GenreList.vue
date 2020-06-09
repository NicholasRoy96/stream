<template>
  <v-app>
    <v-container>

      <!-- Dynamic banner image -->
      <!-- <v-img :src="featuredBackdrop">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img> -->
      <h3 class="genre-heading">Genres</h3>
      <h3 class="genre-subheading">Explore all TV genres</h3>

      <!-- Cards start -->
      <v-row>
        <v-col cols="6" md="4" v-for="(genre, i) in genres" :key="i"> 
          <GenreCard :genre="genre" :mediaType="mediaType" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import GenreCard from '@/components/GenreCard.vue'

export default {
  components: {
    GenreCard
  },
  data() {
    return {
      mediaType: "tv",
      genres: [
      {
        genreId: 10759,
        name: "Action",
        backdropImage: "https://image.tmdb.org/t/p/w780/fFT7T9y9NVRdcdVh81roVrJBcDh.jpg"
      },
      {
        genreId: 16,
        name: "Animation",
        backdropImage: "https://image.tmdb.org/t/p/w780/81BCTObfPk0EvarJpUgnGXHvM9x.jpg"
      },
      {
        genreId: 35,
        name: "Comedy",
        backdropImage: "https://image.tmdb.org/t/p/w780/4oE4vT4q0AD2cX3wcMBVzCsME8G.jpg"
      },
      {
        genreId: 80,
        name: "Crime",
        backdropImage: "https://image.tmdb.org/t/p/w780/A2qdFRq9oJDC5E7fbgSS4POUMDF.jpg"
      },
      {
        genreId: 99,
        name: "Documentary",
        backdropImage: "https://image.tmdb.org/t/p/w780/kY0h95L73t7a6ev6Rv0aHSCtN7y.jpg"
      },
      {
        genreId: 18,
        name: "Drama",
        backdropImage: "https://image.tmdb.org/t/p/w780/QbtctI8EzlhsyFDMUMyG3fli8B.jpg"
      },
      {
        genreId: 10751,
        name: "Family",
        backdropImage: "https://image.tmdb.org/t/p/w780/QbtctI8EzlhsyFDMUMyG3fli8B.jpg"
      },
      {
        genreId: 10762,
        name: "Kids",
        backdropImage: "https://image.tmdb.org/t/p/w780/bZGs5YIWTnscuaxuFeMmeKCnrw8.jpg"
      },
      {
        genreId: 9648,
        name: "Mystery",
        backdropImage: "https://image.tmdb.org/t/p/w780/2e7UapYNf4DNaem6kHAuyQcF1e0.jpg"
      },
      {
        genreId: 10763,
        name: "News",
        backdropImage: "https://image.tmdb.org/t/p/w780/uyilhJ7MBLjiaQXboaEwe44Z0jA.jpg"
      },
      {
        genreId: 10764,
        name: "Reality",
        backdropImage: "https://image.tmdb.org/t/p/w780/qnTBxxv7q4xVwgZBLb0vtILLelh.jpg"
      },
      {
        genreId: 10765,
        name: "Sci-Fi & Fantasy",
        backdropImage: "https://image.tmdb.org/t/p/w780/p39K75uoZLwnhGlEAJxRG5xAD9y.jpg"
      },
      {
        genreId: 10766,
        name: "Soap",
        backdropImage: "https://image.tmdb.org/t/p/w780/r8CGqB8IJNbA1IruHWquS7YttNB.jpg"
      },
      {
        genreId: 10767,
        name: "Talk",
        backdropImage: "https://image.tmdb.org/t/p/w780//2pJYis3LUEgFC3UErTQVgmUV1hN.jpg"
      },
      {
        genreId: 10768,
        name: "War & Politics",
        backdropImage: "https://image.tmdb.org/t/p/w780/391ixi0wVbFtFLQnOy8ZncWv2io.jpg"
      },
      {
        genreId: 37,
        name: "Western",
        backdropImage: "https://image.tmdb.org/t/p/w780/efmDi0xizy0ywF9iYu6A0AKAUxR.jpg"
      }
    ]
    }
  },
}
</script>

<style scoped>
.genre-heading {
  font-size: 2.5em;
  color: #f5c518;
  font-weight: bold;
  margin: 35px 0 2px 0;
  
}
.genre-subheading {
  font-size: 1.5em;
  margin-bottom: 30px;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
</style>