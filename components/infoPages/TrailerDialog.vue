<template>
  <div>
    <v-btn v-if="!bottomBar" text class="text-capitalize play-button" :ripple="false" @click="toggleDialog">
      <v-icon left>mdi-play</v-icon>
      Play Trailer
    </v-btn>

    <v-btn v-if="bottomBar && !trailerDialog" icon @click="toggleDialog">
      <v-icon size="28">mdi-play</v-icon>
    </v-btn>

    <v-btn v-if="bottomBar && trailerDialog" icon disabled>
      <v-icon size="28">mdi-play</v-icon>
    </v-btn>
    
    <v-dialog hide-overlay v-model="trailerDialog" :width="videoWidth" @click:outside="stop">
      <client-only>
        <div v-if="trailerId">
          <youtube :video-id="trailerId" :player-vars="{ autoplay: 1 }" @ready="ready" :player-height="videoHeight" :player-width="videoWidth"></youtube>
        </div>
      </client-only>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TrailerDialog',
  props: {
    trailerId: {
      type: String,
      required: true
    },
    bottomBar: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    trailerDialog() {
      return this.$store.state.trailer.trailerDialog
    },
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
    toggleDialog() {
      this.$store.dispatch('trailer/toggleTrailerDialog')
    },
    ready (event) {
      this.player = event.target
    },
    stop() {
      this.player.stopVideo()
      this.toggleDialog()
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