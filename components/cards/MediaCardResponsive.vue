<template>
  <v-card class="media-card">
    <Bookmark :media="media" />
    <nuxt-link :to="{ path: `/info/${mediaType}/${media.id}` }" class="media-card-link">
      <v-img v-if="media.poster_path" class="media-card-poster" :src="`https://image.tmdb.org/t/p/w185${media.poster_path}`">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div v-else class="placeholder-icon-div">
        <v-icon class="placeholder-media-icon" size="110" color="grey darken-2">mdi-video-image</v-icon>
      </div>
    </nuxt-link>
    <nuxt-link :to="{ path: `/info/${mediaType}/${media.id}` }" class="media-card-link">
      <v-card-text class="media-card-title">{{media.title || media.name}}</v-card-text>
    </nuxt-link>
    <div class="media-card-rating-div">
      <v-icon class="media-card-rating-star" :size="iconSize">mdi-star</v-icon>
      <span v-if="media.vote_average" class="media-card-rating">{{media.vote_average}}</span>
      <span v-else class="media-card-rating">N/A</span>
    </div>
    <v-card-actions class="card-actions d-none d-sm-block">
      <AddWatchlistButton :media="media" />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddWatchlistButton from '@/components/buttons/AddWatchlistButton'
import Bookmark from '@/components/cards/Bookmark'

export default {
  name: 'MediaCardResponsive',
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  components: {
    AddWatchlistButton,
    Bookmark
  },
  computed: {
    mediaType() {
      if (this.media) {
        return this.media.name ? "tv" : "movies"
      }
    },
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '13'
        case 'sm': return '14'
        case 'md': return '15'
        case 'lg': return '17'
        case 'xl': return '17'
      }
    }
  }
}
</script>

<style scoped>
.media-card {
  height: 373.13px;
  width: 175px;
  margin: 10px;
}
.media-card-poster {
  height: 261.19px;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.media-card-poster:hover {
  opacity: 0.8;
}
.placeholder-icon-div {
  height: 261.19px;
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
  display: flex;
  align-items: center;
}
.media-card-rating-star {
  color: #f5c518;
  padding-right: 2px;
}
.media-card-rating {
  font-size: 0.8em;
  color: darkgrey;
}
.card-actions {
  position: absolute;
  bottom: 5px;
  width: 100%;
}

/* TO WORK OUT IMAGE SIZE IN FUTURE, DIVIDE ANY WIDTH BY .67 TO GET POSTER HEIGHT, THEN / .7 TO GET CARD HEIGHT */

/* MEDIA QUERIES */
/* MD */
@media(max-width: 1263px) {
  .media-card {
    height: 345.28px;
    width: 155px;
    margin: 8px;
  }
  .media-card-poster {
    height: 231.34px;
    width: 100%;
  }
  .placeholder-icon-div {
    height: 231.134px;
  }
}

/* SM */
@media(max-width: 959px) {
  .media-card {
    height: 310px;
    width: 135px;
    margin: 6px;
  }
  .media-card-poster {
    height: 201.49px;
    width: 100%;
  }
  .media-card-rating-div {
    padding-top: 0;
  }
  .placeholder-icon-div {
    height: 201.49px;
  }
}

/* XS */
@media(max-width: 599px) {
  .media-card {
    height: 234px;
    width: 115px;
    margin: 4px;
  }
  .media-card-poster {
    height: 171.64px;
    width: 100%;
  }
  .placeholder-icon-div {
    height: 171.64px;
  }
  .media-card-title {
    font-size: 0.7em;
  }
  .media-card-rating {
    font-size: 0.72em;
  }
}
</style>