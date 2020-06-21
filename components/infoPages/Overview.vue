<template>
  <div>
    <!-- OVERVIEW SHORTENED IF 400+ CHARS -->
    <div class="overview-title">Overview</div>
      <div v-if="!expandOverview && storeMedia.info.overview.length >= 400" class="overview">
        <span>{{formattedOverview}}</span>
        <span class="read-button" @click="expandOverview = true">read more</span>
      </div>
    
    <!-- OVERVIEW EXPANDED -->
      <div v-if="expandOverview || storeMedia.info.overview.length < 400" class="overview">
        <span>{{storeMedia.info.overview}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data() {
    return {
      expandOverview: false,
    }
  },
  computed: {
    storeMedia() {
      return this.$store.state.media.media
    },
    formattedOverview() {
      if (this.storeMedia.info.overview && this.storeMedia.info.overview.length >= 400) {
        return this.storeMedia.info.overview.slice(0, 400).trim() + "..."
      }
    }
  }
}
</script>

<style scoped>
.overview-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}
.overview {
  color: lightgrey;
  margin-bottom: 15px;
  font-size: 0.95em;
}
.read-button {
  color: lightgray;
  font-size: 0.95em;
  text-decoration: underline;
}
.read-button:hover {
  color: grey;
  cursor: pointer;
}
</style>