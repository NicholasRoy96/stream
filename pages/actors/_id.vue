<template>
  <v-app>
    <v-container>

      <v-row>
        <v-col cols="12" sm="5" md="4">
          <v-img v-if="actorImage" :src="actorImage" class="actor-image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-icon v-else size="300" color="grey darken-2">mdi-account</v-icon>
        </v-col>

        <v-col cols="12" sm="7" md="8">
          <div>
            <span class="actor-name">{{actorInfo.name}}</span>
            <div class="actor-info">
              <div class="actor-info-item">
                <span v-if="actorInfo.birthday && !actorInfo.deathday">Age:<span class="actor-info-item-data">{{calculateAge}}</span></span>
              </div>
              <div class="actor-info-item">
                <span v-if="actorInfo.birthday">Born:<span class="actor-info-item-data">{{formatBirthday}} in {{actorInfo.place_of_birth}}</span></span>
              </div>
              <div v-if="actorInfo.deathday" class="actor-info-item">
                <span>Died: {{formatDeathday}}</span>
              </div>
            </div>

            <!-- BIO SHORTENED IF 400+ CHARS -->
            <div v-if="trimmedBio && !expandBio" class="actor-overview">{{trimmedBio}}
              <v-icon @click="expandBio = true" icon>mdi-chevron-down</v-icon>
            </div>
            
            <!-- BIO EXPANDED -->
            <div v-if="!trimmedBio || expandBio" class="actor-overview">{{actorInfo.biography}}
              <v-icon v-if="expandBio" @click="expandBio = false">mdi-chevron-up</v-icon>
            </div>

            <div v-if="alsoKnownAs" class="aka-info">
              <span class="aka">Also known as: </span>
              <span class="aka-name" v-for="(name, i) in actorInfo.also_known_as" :key="i">{{name}}</span>
            </div>
          </div>
        </v-col>

      </v-row>

      <div v-if="credits.length" class="sub-div">
        <h3 class="sub-heading">Best known for</h3>
        <h3 class="sub-heading-description">Some of the most notable credits</h3>
      </div>
      <v-row>
        <v-col cols="4" sm="3" lg="2" v-for="(movie, i) in credits" :key="i">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  components: {
    MovieCard
  },
  data() {
    return {
      actorId: this.$route.params.id,
      actorInfo: {},
      actorImage: "",
      expandBio: false,
      credits: []
    }
  },
  computed: {
    formatBirthday() {
      if (this.actorInfo && this.actorInfo.birthday) {
        const dateArray = this.actorInfo.birthday.split('-')
        return dateArray.reverse().join('-')
      }
    },
    formatDeathday() {
      if (this.actorInfo && this.actorInfo.deathday) {
        const dateArray = this.actorInfo.deathday.split('-')
        return dateArray.reverse().join('-')
      }
    },
    calculateAge() {
      if (this.actorInfo && this.actorInfo.birthday) {
        const dateArray = this.actorInfo.birthday.split('-')
        const formattedBirthday = dateArray.join('/')
        var today = new Date()
        var birthDate = new Date(formattedBirthday)
        var actorAge = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          actorAge--
        }
        return actorAge
      }
    },
    trimmedBio() {
      if (this.actorInfo && this.actorInfo.biography) {
        if (this.actorInfo.biography.length > 400) {
          return this.actorInfo.biography.slice(0, 400).trim() + "..."
        }
      }
    },
    alsoKnownAs() {
      if (this.actorInfo && this.actorInfo.also_known_as)
        return this.actorInfo.also_known_as.length !== 0
    }
  },
  methods: {
    async getActor() {
      try {
        const info = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.actorId}?api_key=${process.env.apikey}&language=en-US`)
        this.actorInfo = info
        if (this.actorInfo.profile_path) {
          this.actorImage = `https://image.tmdb.org/t/p/original${this.actorInfo.profile_path}`
        }
      } catch(err) {
        // suppress actor lookup error
        // console.log(err)
      }
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.actorId}/movie_credits?api_key=${process.env.apikey}&language=en-US`)
        this.credits = credits.cast.slice(0, 24)
      } catch(err) {
        // suppress credits lookup error
        // console.log(err)
      }
    }
  },
  created() {
    this.getActor()
    this.getCredits()
  }
}
</script>

<style scoped>
.actor-image {
  border-radius: 8px;
  max-height: 600px;
}
.actor-name {
  color: #f5c518;
  font-weight: bold;
  font-size: 2.5em;
  margin-right: 8px;
}
.actor-info {
  margin-top: 20px;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.actor-info-item {
  margin-bottom: 10px;
  font-weight: bold;
}
.actor-info-item-data {
  color: lightgrey;
  padding-left: 4px;
  font-weight: normal;
}
.actor-overview {
  margin-top: 30px;
  margin-bottom: 15px;
  color: lightgrey;
}
.aka-info {
  padding-top: 10px;
  margin-bottom: 40px;
  max-width: 100%;
  display: block;
  word-wrap: break-word;
}
.aka {
  margin-right: 10px;
  font-weight: bold;
}
.aka-name {
  margin-right: 12px;
  color: lightgrey;
}
.sub-div {
  margin: 40px 0 20px 0
}
.sub-heading {
  font-size: 1.5em;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.sub-heading-description {
  color: darkgrey;
  padding-left: 10px;
}

/* MEDIA QUERIES */
/* MD */
@media (max-width: 960px) {
  .actor-image {
    margin-bottom: 30px;
  }
}
</style>