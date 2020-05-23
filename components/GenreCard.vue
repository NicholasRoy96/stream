<template>
  <v-hover v-slot:default="{ hover }">
    <nuxt-link :to="{ path: `/genres/${genre.genreId}` }">
      <v-card>
        <v-img :src="genre.backdropImage">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
            </v-row>
          </template>
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal display-3"
              style="height: 100%;"
            >
              <span class="v-card--reveal-name">{{genre.name}}</span>
            </div>
          </v-expand-transition>
        </v-img>
      </v-card>
    </nuxt-link>
  </v-hover>
</template>

<script>
export default {
  name: 'GenreCard',
  props: {
    genre: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
span.v-card--reveal-name {
  color: #f5c518;
  font-weight: bold;
  font-size: 2rem;
}
</style>