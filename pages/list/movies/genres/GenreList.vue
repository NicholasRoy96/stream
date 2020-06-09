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
      <h3 class="genre-subheading">Explore all movie genres</h3>

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
      mediaType: "movies",
      genres: [
        { name: "Action", genreId: 28, backdropImage: "https://image.tmdb.org/t/p/w780/zuW6fOiusv4X9nnW3paHGfXcSll.jpg"},
        { name: "Adventure", genreId: 12, backdropImage: "https://image.tmdb.org/t/p/w780/zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg"},
        { name: "Animation", genreId: 16, backdropImage: "https://image.tmdb.org/t/p/w780/xFxk4vnirOtUxpOEWgA1MCRfy6J.jpg"},
        { name: "Comedy", genreId: 35, backdropImage: "https://image.tmdb.org/t/p/w780/165GzcOatgvHMeDu8FdKJcO23KI.jpg"},
        { name: "Crime", genreId: 80, backdropImage: "https://image.tmdb.org/t/p/w780/7VrRna8S3x6xbijooeBmxqvHXiu.jpg"},
        { name: "Documentary", genreId: 99, backdropImage: "https://image.tmdb.org/t/p/w780/dPBoyjIj8Hl8HnEVOVDk8hyl1OZ.jpg"},
        { name: "Drama", genreId: 18, backdropImage: "https://image.tmdb.org/t/p/w780/sixfWYfNegaGGHKdXrNNUHaMiAC.jpg"},
        { name: "Family", genreId: 10751, backdropImage: "https://image.tmdb.org/t/p/w780/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg"},
        { name: "Fantasy", genreId: 14, backdropImage: "https://image.tmdb.org/t/p/w780/bVmSXNgH1gpHYTDyF9Q826YwJT5.jpg"},
        { name: "History", genreId: 36, backdropImage: "https://image.tmdb.org/t/p/w780/w2ezhZUk7ZJH9Mdk1Y6CTmaDRg5.jpg"},
        { name: "Horror", genreId: 27, backdropImage: "https://image.tmdb.org/t/p/w780/vZ7EVk7FaNEWYqlVWbFLHP8Z0LU.jpg"},
        { name: "Music", genreId: 10402, backdropImage: "https://image.tmdb.org/t/p/w780/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg"},
        { name: "Mystery", genreId: 9648, backdropImage: "https://image.tmdb.org/t/p/w780/AbRYlvwAKHs0YuyNO6NX9ofq4l6.jpg"},
        { name: "Romance", genreId: 10749, backdropImage: "https://image.tmdb.org/t/p/w780/6VmFqApQRyZZzmiGOQq2C92jyvH.jpg"},
        { name: "Sci-Fi", genreId: 878, backdropImage: "https://image.tmdb.org/t/p/w780/3dPhs7hUnQLphDFzdkD407VZDYo.jpg"},
        { name: "TV Movie", genreId: 10770, backdropImage: "https://image.tmdb.org/t/p/w780/rBnUusNA6FmypqjGmRo5dvgycqL.jpg"},
        { name: "Thriller", genreId: 53, backdropImage: "https://image.tmdb.org/t/p/w780/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg"},
        { name: "War", genreId: 10752, backdropImage: "https://image.tmdb.org/t/p/w780/cqa3sa4c4jevgnEJwq3CMF8UfTG.jpg"},
        { name: "Western", genreId: 37, backdropImage: "https://image.tmdb.org/t/p/w780/s4cJQaj40SwMifUrrdtdOJsjnRO.jpg"}
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