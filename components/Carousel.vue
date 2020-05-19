<template>
  <v-carousel height="700" continuous show-arrows-on-hover hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.image"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      items: [
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

</style>