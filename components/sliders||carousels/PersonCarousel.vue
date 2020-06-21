<template>
  <client-only>
    <RecycleScroller class="scroller people" :minItemSize="minimumSize" direction="horizontal" :items="scrollerItems">
      <template :style="{ width: `${totalWidth}px` }" v-slot="{ item }" class="person">
        <PersonCard :person="item" :subheading="false" />
      </template>
    </RecycleScroller>
  </client-only>
</template>

<script>
import PersonCard from '@/components/cards/PersonCard.vue'

export default {
  name: 'PersonCarousel',
  components: {
    PersonCard
  },
  props: {
    people: {
      type: Array,
      required: false
    },
    useStateCast: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    storeMedia() {
      return this.$store.state.media.media
    },
    scrollerItems() {
      if (this.people) return this.people
      if (!this.storeMedia) return []
      if (this.useStateCast) {
        console.log(this.storeMedia.cast)
        return this.storeMedia.cast
      }
      return []
    },
    minimumSize() {
      if (this.$vuetify.breakpoint.name === 'xs') return 183
      return 198
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
#app > div > div.container > div.vue-recycle-scroller.scroller.people.ready.direction-horizontal {
  height: 245px !important;
}
div.vue-recycle-scroller.scroller.people.ready.direction-horizontal > div.vue-recycle-scroller__item-wrapper {
  height: 245px !important;
}
#app > div > div > div > div.vue-recycle-scroller.scroller.people.ready.direction-horizontal {
  max-height: 245px !important;
}
/* MEDIA QUERIES */
/* XS */
@media(max-width: 599px) {
  #app > div > div.container > div.vue-recycle-scroller.scroller.people.ready.direction-horizontal {
    height: 225px !important;
  }
  div.vue-recycle-scroller.scroller.people.ready.direction-horizontal > div.vue-recycle-scroller__item-wrapper {
    height: 225px !important;
  }
  #app > div > div > div > div.vue-recycle-scroller.scroller.people.ready.direction-horizontal {
    max-height: 225px !important;
  }
}
</style>