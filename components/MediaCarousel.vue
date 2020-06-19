<template>
  <client-only>
    <RecycleScroller class="scroller media" :minItemSize="minimumSize" direction="horizontal" :items="media">
      <template :style="{ width: `${totalWidth}px` }" v-slot="{ item }">
          <MediaCard v-if="!useRecentCard" :media="item" />
          <MediaCardRecent v-else :media="item" />
      </template>
    </RecycleScroller>
  </client-only>
</template>

<script>
import MediaCard from '@/components/MediaCard.vue'
import MediaCardRecent from '@/components/MediaCardRecent.vue'

export default {
  name: 'MediaCarousel',
  components: {
    MediaCard,
    MediaCardRecent
  },
  props: {
    media: {
      type: Array,
      required: true
    },
    useRecentCard: {
      type: Boolean
    }
  },
  computed: {
    minimumSize() {
      if (this.media) {
        if (this.$vuetify.breakpoint.name === 'xs') return 155
        return 190
      }
    },
    totalWidth() {
      if (this.media) {
        return this.minimumSize * this.media.length
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