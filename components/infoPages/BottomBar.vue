<template>
  <v-row no-gutters justify="space-around" align="center" class="background-row">
    <v-btn icon depressed @click="goBack">
      <v-icon size="28">mdi-arrow-left</v-icon>
    </v-btn>
    <TrailerDialog :bottomBar="true" />
    <AddWatchlistIcon :bottomBar="true"/>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import AddWatchlistIcon from '@/components/buttons/AddWatchlistIcon.vue'
import TrailerDialog from '@/components/infoPages/TrailerDialog.vue'

export default {
  name: 'BottomBar',
  components: {
    AddWatchlistIcon,
    TrailerDialog
  },
  computed: {
    storeMovie() {
      return this.$store.state.media.media
    }
  },
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style scoped>
.background-row {
  background-color: black;
  color: white;
  position: fixed;
  height: 40px;
  bottom: 0;
  width: 100%;
}
</style>