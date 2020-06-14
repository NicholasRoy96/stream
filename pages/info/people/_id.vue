<template>
  <v-app>
    <v-container>

      <v-row>
        <v-col cols="8" sm="4" md="3" offset="2" offset-sm="0">
          <v-img v-if="personImage" :src="personImage" class="person-image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-icon v-else size="300" color="grey darken-2">mdi-account</v-icon>
        </v-col>

        <v-col cols="12" sm="8" md="9">
          <div>
            <span v-if="personInfo.name" class="person-name">{{personInfo.name}}</span>
            <v-icon v-if="personInfo.known_for_department" color="yellow darken-4" class="pb-2">mdi-circle-medium</v-icon>
            <span v-if="personInfo.known_for_department" class="person-role">{{formatRole(personInfo.known_for_department)}}</span>
            <div class="person-info">
              <div class="person-info-item">
                <span v-if="personInfo.birthday && !personInfo.deathday">Age:<span class="person-info-item-data">{{calculateAge}}</span></span>
              </div>
              <div class="person-info-item">
                <span v-if="personInfo.birthday">
                  Born:<span class="person-info-item-data">{{formatBirthday}}</span>
                  <span v-if="personInfo.place_of_birth" class="person-info-item-data birthplace">in {{personInfo.place_of_birth}}</span>
                </span>
              </div>
              <div v-if="personInfo.deathday" class="person-info-item">
                <span>Died:<span class="person-info-item-data">{{formatDeathday}}</span></span>
              </div>
            </div>

            <!-- BIO SHORTENED IF 400+ CHARS -->
            <div v-if="trimmedBio && !expandBio" class="person-overview">{{trimmedBio}}
              <v-icon @click="expandBio = true" icon>mdi-chevron-down</v-icon>
            </div>
            
            <!-- BIO EXPANDED -->
            <div v-if="!trimmedBio || expandBio" class="person-overview">{{personInfo.biography}}
              <v-icon v-if="expandBio" @click="expandBio = false">mdi-chevron-up</v-icon>
            </div>

            <div v-if="alsoKnownAs" class="aka-info">
              <span class="aka">Also known as: </span>
              <span class="aka-name" v-for="(name, i) in personInfo.also_known_as" :key="i">{{name}}</span>
            </div>
          </div>
        </v-col>

      </v-row>

      <div v-if="castCredits.length">
        <div class="sub-div">
          <h3 class="sub-heading">Appears in</h3>
          <h3 class="sub-heading-description">Most notable acting credits</h3>
        </div>
        <MediaCarousel :media="castCredits" />
      </div>
      
      <div v-if="crewCredits.length">
        <div class="sub-div">
          <h3 class="sub-heading">Worked on</h3>
          <h3 class="sub-heading-description">Most notable crew credits</h3>
        </div>
        <MediaCarousel :media="crewCredits" />
      </div>

    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import MediaCarousel from '@/components/MediaCarousel.vue'

export default {
  components: {
    MediaCarousel
  },
  data() {
    return {
      personId: this.$route.params.id,
      personInfo: {},
      personImage: "",
      expandBio: false,
      castCredits: [],
      crewCredits: [],
    }
  },
  computed: {
    formatBirthday() {
      if (this.personInfo && this.personInfo.birthday) {
        const dateArray = this.personInfo.birthday.split('-')
        return dateArray.reverse().join('-')
      }
    },
    formatDeathday() {
      if (this.personInfo && this.personInfo.deathday) {
        const dateArray = this.personInfo.deathday.split('-')
        return dateArray.reverse().join('-')
      }
    },
    calculateAge() {
      if (this.personInfo && this.personInfo.birthday) {
        const dateArray = this.personInfo.birthday.split('-')
        const formattedBirthday = dateArray.join('/')
        var today = new Date()
        var birthDate = new Date(formattedBirthday)
        var personAge = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          personAge--
        }
        return personAge
      }
    },
    trimmedBio() {
      if (this.personInfo && this.personInfo.biography) {
        if (this.personInfo.biography.length > 400) {
          return this.personInfo.biography.slice(0, 400).trim() + "..."
        }
      }
    },
    alsoKnownAs() {
      if (this.personInfo && this.personInfo.also_known_as)
        return this.personInfo.also_known_as.length !== 0
    }
  },
  methods: {
    ...mapActions(["addToRecentlyViewed"]),
    async getPerson() {
      try {
        this.personInfo = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.personId}?api_key=${process.env.apikey}&language=en-US`)
        console.log(this.personInfo)
        if (this.personInfo.profile_path) {
          this.personImage = `https://image.tmdb.org/t/p/original${this.personInfo.profile_path}`
        }
        this.addMediaToRecentlyViewed()
      } catch(err) {
        // suppress person lookup error
        // console.log(err)
      }
    },
    async getCredits() {
      try {
        const credits = await this.$axios.$get(`https://api.themoviedb.org/3/person/${this.personId}/combined_credits?api_key=${process.env.apikey}&language=en-US`)
        if (credits.cast.length) {
          const sortedArray = credits.cast.sort((a, b) => b.popularity - a.popularity)
          const modSortedArray = sortedArray.map(media => {
            return {
              ...media,
              title: media.title || media.name
            }
          })
          const uniqueCredits = [...new Map(modSortedArray.map(media => {
            return [media['title'], media]
          })).values()]
          this.castCredits = uniqueCredits.slice(0, 18)
        }
        if (credits.crew.length) {
          const sortedArray = credits.crew.sort((a, b) => b.popularity - a.popularity)
          const modSortedArray = sortedArray.map(media => {
            return {
              ...media,
              title: media.title || media.name
            }
          })
          const uniqueCredits = [...new Map(modSortedArray.map(media => {
            return [media['title'], media]
          })).values()]
          this.crewCredits = uniqueCredits.slice(0, 18)
        } 
      } catch(err) {
        // suppress credits lookup error
        // console.log(err)
      }
    },
    async addMediaToRecentlyViewed () {
      try {
        await this.addToRecentlyViewed(this.personInfo)
      } catch(err) {
        console.log(err)
      }
    },
    formatRole(role) {
      if (role === 'Acting') return 'Actor'
      if (role === 'Directing') return 'Director'
      if (role === 'Sound') return 'Composer'
      if (role === 'Writing') return 'Writer'
      if (role === 'Production') return 'Producer'
      return role
    }
  },
  created() {
    Promise.all([
      this.getPerson(),
      this.getCredits()
    ])
    
  }
}
</script>

<style scoped>
.person-image {
  border-radius: 8px;
  max-height: 600px;
}
.person-name {
  color: #f5c518;
  font-weight: bold;
  font-size: 2.2em;
}
.person-role {
  font-weight: bold;
  font-size: 1.7em;
}
.person-info {
  margin-top: 20px;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
}
.person-info-item {
  margin-bottom: 10px;
  font-weight: bold;
}
.person-info-item-data {
  color: lightgrey;
  padding-left: 6px;
  font-weight: normal;
}
.birthplace {
  padding-left: 1px;
}
.person-overview {
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
  .person-image {
    margin-bottom: 30px;
  }
}
</style>