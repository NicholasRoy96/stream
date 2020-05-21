<template>
  <v-container>
    <v-carousel height="700" continuous show-arrows-on-hover hide-delimiters>
      <v-carousel-item
        v-for="(slide,i) in slides"
        :key="i"
        :src="slide.image"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <!-- <div class="image-text">Stream Movies Now</div> -->
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      slides: [
          {
            image: "https://image.tmdb.org/t/p/original/2lBOQK06tltt8SQaswgb8d657Mv.jpg",
          },
          {
            image: "https://image.tmdb.org/t/p/original/sQkRiQo3nLrQYMXZodDjNUJKHZV.jpg",
          },
          {
            image: "https://image.tmdb.org/t/p/original/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg",
          },
          {
            image: "https://image.tmdb.org/t/p/original/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg",
          },
      ]
    }
  }
}
</script>

<style>
/* .image-text {
  background-image: linear-gradient(#1c1c1c, black);
  width: 100%;
  height: 100px;
  padding-top: 15px;
  text-align: center;
  background-color: black;
  font-size: 3em;
  font-weight: bold;
  position: absolute;
  bottom: 0;
} */
</style>