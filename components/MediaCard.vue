<template>
  <v-card class="media-card">
    <nuxt-link :to="{ path: `/${mediaType}/${media.id}` }" class="media-card-link">
      <v-img v-if="media.poster_path" class="media-card-poster" :src="`https://image.tmdb.org/t/p/w185${media.poster_path}`">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div v-else class="placeholder-icon-div">
        <v-icon class="placeholder-media-icon" :size="placeholderIconSize" color="grey darken-2">mdi-video-image</v-icon>
      </div>
    </nuxt-link>
    <nuxt-link :to="{ path: `/medias/${media.id}` }" class="media-card-link">
      <v-card-text class="media-card-title">{{media.title || media.name}}</v-card-text>
    </nuxt-link>
    <div class="media-card-rating-div">
      <v-icon class="media-card-rating-star" size="17">mdi-star</v-icon>
      <span v-if="media.vote_average" class="media-card-rating">{{media.vote_average}}</span>
      <span v-else class="media-card-rating">N/A</span>
    </div>
    <v-card-actions class="card-actions d-none d-md-block">
      <AddWatchlistButton :media="media" />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddWatchlistButton from '@/components/AddWatchlistButton'

export default {
  name: 'mediaCard',
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  components: {
    AddWatchlistButton
  },
  computed: {
    mediaType() {
      if (this.media) {
        return this.media.first_air_date ? "tv" : "movies"
      }
    },
    placeholderIconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '65'
        case 'sm': return '80'
        case 'md': return '95'
        case 'lg': return '110'
        case 'xl': return '110'
      }
    }
  }
}
</script>

<style scoped>
.media-card {
  height: 415.77px;
  width: 195px;
  margin: 10px;
}
.media-card-poster {
  height: 291.04px;
  width: 100%;
}
.media-card-poster:hover {
  opacity: 0.8;
}
.placeholder-icon-div {
  height: 291.04px;
  width: 100%;
  text-align: center;
  padding-top: 30px;
  /* NEED TO CENTER THE ICON IN DIV */
}
.media-card-link {
  text-decoration: none;
}
.media-card-title {
  color: white;
  font-size: 0.9em;
  font-weight: bold;
  line-height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 0;
}
.media-card-title:hover {
  color: #f5c518;
}
.media-card-rating-div{
  padding: 4px 16px 16px 16px;
  align-content: center;
}
.media-card-rating-star {
  color: #f5c518;
  padding-right: 4px;
}
.media-card-rating {
  font-size: 0.8em;
}
.card-actions {
  position: absolute;
  bottom: 5px;
  width: 100%;
}

/* MEDIA QUERIES */
/* POSTER ASPECT RATIO IS 0.67:1 */
/* DIVIDE ANY CARD WIDTH BY .67 TO GET MATCHING POSTER HEIGHT, THEN DIVIDE BY .7 (IF 70% OF CARD HEIGHT) TO GET HEIGHT OF CARD */

/* MD - CAN UNCOMMENT IF CHANGE MIND */
/* @media (max-width: 1263px) {
  .media-card {
    width: 170px;
    height: 362.47px;
    margin: 6px;
  }
  .media-card-poster {
    height: 253.73px;
  }
} */

/* SM */ @media (max-width: 959px) {
  .media-card {
    width: 145px;
    height: 309.17px;
    margin: 4px;
  }
  .media-card-poster {
    height: 241.15px;
  }
  .placeholder-icon-div {
    height: 241.15px;
  }
  .placeholder-media-title {
    font-size: 1em;
  }
}

/* XS */
@media (max-width: 599px) {
  .media-card {
    height: 213.22px;
    width: 100px;
    margin: 2px;
  }
  .media-card-poster {
    height: 149.25px;
  }
  .placeholder-icon-div {
    height: 149.25px;
  }
  .placeholder-media-title {
    font-size: 0.9em;
  }
  .media-card-title {
    font-size: 0.8em;
  }
  .media-card-rating-div{
    padding-top: 0;
  }
}
</style>