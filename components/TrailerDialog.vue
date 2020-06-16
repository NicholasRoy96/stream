<template>
  <div>
    <v-btn text class="text-capitalize play-button" :ripple="false" @click="dialog = true">
      <v-icon left>mdi-play</v-icon>
      Play Trailer
    </v-btn>
    
    <v-dialog hide-overlay v-model="dialog" :width="videoWidth" @click:outside="stop">
      <client-only>
        <youtube :video-id="trailer.key" :player-vars="{ autoplay: 1 }" @ready="ready" :player-height="videoHeight" :player-width="videoWidth"></youtube>
      </client-only>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrailerDialog',
  props: {
    trailer: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
    }
  },
  computed: {
    videoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '350'
        case 'sm': return '600'
        case 'md': return '1000'
        case 'lg': return '1250'
        case 'xl': return '1250'
      }
    },
    videoHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '196'
        case 'sm': return '336'
        case 'md': return '560'
        case 'lg': return '700'
        case 'xl': return '700'
      }
    }
  },
  methods: {
    ready (event) {
      this.player = event.target
    },
    stop() {
      this.player.stopVideo()
    }
  }
}
</script>

<style>
#app > div > div.v-responsive.v-image.backdrop-image > div.v-responsive__content > div > div > div > div.col-md-8.col-12 > div > div.row.pl-6.pb-7.align-center > div.mt-3.ml-6 > button > span {
  letter-spacing: 0.7px;
  font-weight: 600;
  font-size: 1.1em;
}
</style>

<style scoped>
.play-button::before {
  background-color: transparent !important;
}
.play-button:hover {
  color: lightgrey !important;
}
</style>