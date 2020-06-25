<template>
  <div>
    <v-container>

      <v-row justify="center">
        <v-col cols="8" sm="4" md="3">
          <v-img v-if="storePerson.info.profile_path" :src="`https://image.tmdb.org/t/p/original${storePerson.info.profile_path}`" class="person-image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-icon v-else :size="placeholderIconSize" color="grey darken-2">mdi-account</v-icon>
        </v-col>

        <v-col cols="12" sm="8" md="9">
          <div>
            <span v-if="storePerson.info.name" class="person-name">{{storePerson.info.name}}</span>
            <v-icon v-if="storePerson.info.known_for_department" color="yellow darken-4" class="pb-2">mdi-circle-medium</v-icon>
            <span v-if="storePerson.info.known_for_department" class="person-role">{{formatRole}}</span>
            <div class="person-info">
              <div class="person-info-item">
                <span v-if="storePerson.info.birthday && !storePerson.info.deathday">Age:<span class="person-info-item-data">{{calculateAge}}</span></span>
              </div>
              <div class="person-info-item">
                <span v-if="storePerson.info.birthday">
                  Born:<span class="person-info-item-data">{{formatBirthday}}</span>
                  <span v-if="storePerson.info.place_of_birth" class="person-info-item-data birthplace">in {{storePerson.info.place_of_birth}}</span>
                </span>
              </div>
              <div v-if="storePerson.info.deathday" class="person-info-item">
                <span>Died:<span class="person-info-item-data">{{formatDeathday}}</span></span>
              </div>
            </div>

            <!-- BIO -->
            <div v-if="storePerson.info.biography">
              <Overview class="pt-4" />
            </div>

            <div v-if="alsoKnownAs" class="aka-info">
              <span class="aka">Also known as: </span>
              <span class="aka-name" v-for="(name, i) in storePerson.info.also_known_as" :key="i">{{name}}</span>
            </div>
          </div>
        </v-col>

      </v-row>

      <div v-if="storePerson.castCredits.length">
        <div class="subheading-div">
          <h3 class="subheading">Appears in</h3>
          <h3 class="subheading-description">Most notable acting credits</h3>
        </div>
        <MediaCarousel :useStateCastCredits="true" />
      </div>
      
      <div v-if="storePerson.crewCredits.length">
        <div class="subheading-div">
          <h3 class="subheading">Worked on</h3>
          <h3 class="subheading-description">Most notable crew credits</h3>
        </div>
        <MediaCarousel :useStateCrewCredits="true" />
      </div>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaCarousel from '@/components/sliders||carousels/MediaCarousel.vue'
import Overview from '@/components/infoPages/Overview.vue'

export default {
  name: 'Person',
  components: {
    MediaCarousel,
    Overview
  },
  computed: {
    storePerson() {
      return this.$store.state.media.media
    },
    placeholderIconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '150'
        case 'sm': return '180'
        case 'md': return '200'
        case 'lg': return '230'
        case 'xl': return '230'
      }
    },
    formatBirthday() {
      if (this.storePerson.info && this.storePerson.info.birthday) {
        const dateArray = this.storePerson.info.birthday.split('-')
        return dateArray.reverse().join('-')
      }
    },
    formatDeathday() {
      if (this.storePerson.info && this.storePerson.info.deathday) {
        const dateArray = this.storePerson.info.deathday.split('-')
        return dateArray.reverse().join('-')
      }
    },
    formatRole() {
      if (this.storePerson.info.known_for_department === 'Acting') return 'Actor'
      if (this.storePerson.info.known_for_department === 'Directing') return 'Director'
      if (this.storePerson.info.known_for_department === 'Sound') return 'Composer'
      if (this.storePerson.info.known_for_department === 'Writing') return 'Writer'
      if (this.storePerson.info.known_for_department === 'Production') return 'Producer'
      if (this.storePerson.info.known_for_department === 'Editing') return 'Editor'
      return this.storePerson.info.known_for_department
    },
    calculateAge() {
      if (this.storePerson.info && this.storePerson.info.birthday) {
        const dateArray = this.storePerson.info.birthday.split('-')
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
    alsoKnownAs() {
      if (this.storePerson.info && this.storePerson.info.also_known_as)
        return this.storePerson.info.also_known_as.length !== 0
    }
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