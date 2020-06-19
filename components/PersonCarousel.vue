<template>
  <client-only>
    <RecycleScroller class="scroller people" :minItemSize="minimumSize" direction="horizontal" :items="people">
      <template :style="{ width: `${totalWidth}px` }" v-slot="{ item }" class="person">
        <PersonCard :person="item" :subheading="false" />
      </template>
    </RecycleScroller>
  </client-only>
</template>

<script>
import PersonCard from '@/components/PersonCard.vue'

export default {
  name: 'PersonCarousel',
  components: {
    PersonCard
  },
  props: {
    people: {
      type: Array,
      required: true
    }
  },
  computed: {
    minimumSize() {
      if (this.people) {
        if (this.$vuetify.breakpoint.name === 'xs') return 183
        return 198
      }
    },
    totalWidth() {
      if (this.people) {
        return this.minimumSize * this.people.length
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