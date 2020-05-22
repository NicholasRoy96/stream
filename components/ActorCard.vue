<template>
  <nuxt-link :to="{ path: `/actors/${actor.id}` }" class="actor-card-link">
    <div class="actor-div">
      <v-avatar class="actor-avatar" size="155" color="grey darken-4">
        <v-img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey darken-2"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-icon v-else size="92" color="grey darken-2">mdi-account</v-icon>
      </v-avatar>
      <div class="actor-name">{{actor.name}}</div>
      <div v-if="actor.character" class="actor-character">as {{actor.character}}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ActorCard',
  props: {
    actor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.actor-card-link {
  color: white;
  text-decoration: none;
}
.actor-div {
  min-height: 240px;
  text-align: center;
}
.actor-avatar {
  width: 50%;
}
.actor-name {
  font-size: 1em;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
}
.actor-character {
  font-size: 0.8em;
  color: darkgrey;
}
</style>