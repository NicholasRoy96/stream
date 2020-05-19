<template>
  <v-app-bar class="app-bar">
    <v-container>
      
      <!-- MD + -->
      <v-row align="center" justify="space-between" class="d-none d-md-flex">
        
        <v-col cols="2">
          <nuxt-link to="/" class="site-name">
            <div class="logo-frame">
              <span class="logo-helper"></span><img src="~/assets/logo.png" height="43" class="logo"><img>
            </div>
          </nuxt-link>
        </v-col>

        <v-col cols="6">
          <Search />
        </v-col>

        <v-col cols="2">
          <Watchlist />
        </v-col>

      </v-row>

      <!-- SM - -->
      <v-row class="d-md-none">
        <nuxt-link to="/" class="site-name">
          <div class="logo-frame">
            <span class="logo-helper"></span><img src="~/assets/logo.png" height="38" class="logo"><img>
          </div>
        </nuxt-link>

        <v-spacer></v-spacer>

        <Search />
        <Watchlist />

      </v-row>

    </v-container>
  </v-app-bar>
</template>

<script>
import Watchlist from '@/components/Watchlist.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Navbar',
  components: {
    Watchlist,
    Search
  }
}
</script>

<style scoped>
.app-bar {
  background-color: #121212 !important;
  color: white;
}
.site-name {
  color: #f5c518 !important;
  text-decoration: none !important;
}
.logo-frame {
  height: 45px;
  width: 160px;
  white-space: nowrap;
}
.logo-helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.logo {
  vertical-align: middle;
}
</style>