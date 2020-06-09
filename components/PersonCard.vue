<template>
  <nuxt-link :to="{ path: `/info/people/${person.id}` }" class="person-card-link">
    <div class="person-div">
      <v-avatar :size="avatarSize" color="grey darken-4">
        <v-img v-if="person.profile_path" :src="`https://image.tmdb.org/t/p/w185${person.profile_path}`">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-icon v-else size="92" color="grey darken-2">mdi-account</v-icon>
      </v-avatar>
      <div class="person-name">{{person.name}}</div>
      <div v-if="person.character" class="person-character">as {{person.character}}</div>
      <div v-if="person.job" class="person-character">{{person.job}}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PersonCard',
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatarSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '135'
        case 'sm': return '170'
        case 'md': return '180'
        case 'lg': return '160'
        case 'xl': return '160'
      }
    },
  }
}
</script>

<style scoped>
.person-card-link {
  color: white;
  text-decoration: none;
}
.person-div {
  min-height: 240px;
  text-align: center;
}
.person-name {
  font-size: 1em;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
}
.person-character {
  font-size: 0.8em;
  color: darkgrey;
}
</style>