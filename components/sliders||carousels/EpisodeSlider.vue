<template>
  <client-only>
    <RecycleScroller class="scroller episodes" :minItemSize="minimumSize" direction="horizontal" :items="episodes">
      <template :style="{ width: `${totalWidth}px` }" v-slot="{ item }" class="person">
        <component :is="cardComponent" :episode="item"></component>
      </template>
    </RecycleScroller>
  </client-only>
</template>

<script>
import EpisodeCard from '@/components/cards/EpisodeCard.vue'
import EpisodeCardSmall from '@/components/cards/EpisodeCardSmall.vue'

export default {
  name: 'EpisodeSlider',
  components: {
    EpisodeCard,
    EpisodeCardSmall
  },
  props: {
    episodes: {
      type: Array,
      required: true
    }
  },
  computed: {
    cardComponent() {
      if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') return EpisodeCardSmall
      return EpisodeCard
    },
    minimumSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 330
      return 330
    },
    totalWidth() {
      return this.minimumSize * this.episodes.length
    }
  }
}
</script>

<style>
#app > div > div.container > div.vue-recycle-scroller.scroller.episodes.ready.direction-horizontal {
  height: 290px !important;
}
div.vue-recycle-scroller.scroller.episodes.ready.direction-horizontal > div.vue-recycle-scroller__item-wrapper {
  height: 290px !important;
}
#app > div > div > div > div.vue-recycle-scroller.scroller.episodes.ready.direction-horizontal {
  max-height: 290px !important;
}
/* MEDIA QUERIES */
/* XS */
/* @media(max-width: 599px) {
  #app > div > div.container > div.vue-recycle-scroller.scroller.episodes.ready.direction-horizontal {
    height: 225px !important;
  }
  div.vue-recycle-scroller.scroller.episodes.ready.direction-horizontal > div.vue-recycle-scroller__item-wrapper {
    height: 225px !important;
  }
  #app > div > div > div > div.vue-recycle-scroller.scroller.episodes.ready.direction-horizontal {
    max-height: 225px !important;
  }
} */
</style>