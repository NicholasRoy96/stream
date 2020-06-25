<template>
  <div>
    <!-- OVERVIEW SHORTENED IF 400+ CHARS -->
    <div class="overview-title">Overview</div>
      <div v-if="!expandOverview && overview && overview.length >= 400" class="overview">
        <span>{{formattedOverview}}</span>
        <span class="read-button" @click="expandOverview = true">read more</span>
      </div>
    
    <!-- OVERVIEW EXPANDED -->
      <div v-if="expandOverview || overview && overview.length < 400" class="overview">
        <span>{{overview}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data() {
    return {
      overview: '',
      expandOverview: false,
    }
  },
  computed: {
    formattedOverview() {
      if (this.overview && this.overview.length >= 400) {
        return this.overview.slice(0, 400).trim() + "..."
      }
    }
  },
  methods: {
    setOverviewVariable() {
      const media = this.$store.state.media.media
      if (media.info.overview) {
        this.overview = media.info.overview
      }
      if (media.info.biography) {
        this.overview = media.info.biography
      }
      return ''
    }
  },
  created() {
    this.setOverviewVariable()
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

/* MEDIA QUERIES */
/* MD */
@media(max-width: 1263px) {
  .overview-title {
    font-size: 1.15em;
  }
  .overview {
    font-size: 0.9em;
  }
  .read-button {
    font-size: 0.9em;
  }
}

/* SM */
@media(max-width: 959px) {
  .overview-title {
    font-size: 1.1em;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .overview {
    margin-bottom: 13px;
    font-size: 0.87em;
  }
  .read-button {
    font-size: 0.87em;
  }
}

/* XS */
@media(max-width: 599px) {
  .overview-title {
    font-size: 1.06em;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .overview {
    margin-bottom: 11px;
    font-size: 0.85em;
  }
  .read-button {
    font-size: 0.85em;
  }
}
</style>