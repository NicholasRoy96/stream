<template>
  <client-only>
    <RecycleScroller  class="scroller" :minItemSize="190" direction="horizontal" :items="media">
      <template :style="{ width: `${totalWidth}px` }" v-slot="{ item }">
          <MediaCard :media="item" />
      </template>
    </RecycleScroller>
  </client-only>
</template>

<script>
import MediaCard from '@/components/MediaCard.vue'

export default {
  name: 'MediaCarousel',
  components: {
    MediaCard
  },
  props: {
    media: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalWidth() {
      if (this.media) {
        return this.media.length * 190
      }
    }
  }
}
</script>

<style>
.VueCarousel-navigation-button {
  color: white !important;
}
.vue-recycle-scroller__item-wrapper {
  height: 400px !important;
}

.scroller {
  height: 100%;
}
#app > div > div.container > div.vue-recycle-scroller.scroller.ready.direction-horizontal {
  max-height: 400px;
}
</style>

<style scoped>

</style>