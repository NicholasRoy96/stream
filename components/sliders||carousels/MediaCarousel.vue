<template>
  <client-only>
    <RecycleScroller class="scroller media" :minItemSize="minimumSize" direction="horizontal" :items="scrollerItems">
      <template :style="{ width: `${totalWidth}px` }" v-slot="{ item }">
          <MediaCard v-if="!useRecentCard" :media="item" />
          <MediaCardRecent v-else :media="item" />
      </template>
    </RecycleScroller>
  </client-only>
</template>

<script>
import MediaCard from '@/components/cards/MediaCard.vue'
import MediaCardRecent from '@/components/cards/MediaCardRecent.vue'

export default {
  name: 'MediaCarousel',
  components: {
    MediaCard,
    MediaCardRecent
  },
  props: {
    media: {
      type: Array,
      required: false
    },
    useRecentCard: {
      type: Boolean,
      required: false
    },
    useStateCollection: {
      type: Boolean,
      required: false
    },
    useStateSimilarMedia: {
      type: Boolean,
      required: false
    },
    useStateCastCredits: {
      type: Boolean,
      required: false
    },
    useStateCrewCredits: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    storeMedia() {
      return this.$store.state.media.media
    },
    scrollerItems() {
      if (this.media) return this.media
      if (!this.storeMedia) return []
      if (this.useStateCollection ) {
        return this.storeMedia.collection.parts
      }
      if (this.useStateSimilarMedia) {
        return this.storeMedia.similarMedia
      }
      if (this.useStateCastCredits) {
        return this.storeMedia.castCredits
      }
      if (this.useStateCrewCredits) {
        return this.storeMedia.crewCredits
      }
      return []
    },
    minimumSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 155
      return 190
    },
    totalWidth() {
      if (this.scrollerItems) {
        return this.minimumSize * this.scrollerItems.length
      }
    }
  }
}
</script>

<style>
.vue-recycle-scroller__item-wrapper {
  height: 393px !important;
}
.scroller {
  height: 100%;
}
#app > div > div.container > div.vue-recycle-scroller.scroller.ready.direction-horizontal {
  max-height: 393px;
}
/* MEDIA QUERIES */
/* XS */
@media(max-width: 599px) {
  .vue-recycle-scroller__item-wrapper {
    height: 345px !important;
  }
}
</style>