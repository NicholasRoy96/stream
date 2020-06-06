<template>
  <v-app-bar class="app-bar">
    <v-container class="nav-container">
      
      <!-- MD + -->
      <v-row align="center" justify="space-between" class="d-none d-md-flex">
        <v-col cols="2">
          <nuxt-link to="/" class="site-name">
            <div class="logo-frame">
              <span class="logo-helper"></span><img src="~/assets/logo.png" width="120" class="logo"><img>
            </div>
          </nuxt-link>
        </v-col>
        <v-col cols="8">
          <Search />
        </v-col>
        <v-col cols="2">
          <Watchlist />
        </v-col>
      </v-row>

      <!-- SM - -->
      <v-row v-if="!searchOpen" class="d-md-none">
        <nuxt-link to="/" class="site-name">
          <div class="logo-frame">
            <span class="logo-helper"></span><img src="~/assets/logo.png" width="100" class="logo"><img>
          </div>
        </nuxt-link>
        <v-spacer></v-spacer>
        <SearchSmall />
        <Watchlist />
      </v-row>

      <v-row v-else class="d-md-none">
        <v-col cols="12">
          <SearchSmall />
        </v-col>
      </v-row>

    </v-container>
  </v-app-bar>
</template>

<script>
import Watchlist from '@/components/Watchlist.vue'
import Search from '@/components/search/Search.vue'
import SearchSmall from '@/components/search/SearchSmall.vue'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Watchlist,
    Search,
    SearchSmall
  },
  computed: {
    ...mapState(["searchOpen"])
  }
}
</script>

<style>
/* MEDIA QUERIES */

/* SM */
@media (max-width: 959px) {
  .v-toolbar__content, .v-toolbar__extension {
    padding: 0;
  }
}

</style>

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

/* MEDIA QUERIES */

/* SM */
@media(max-width: 959px) {
  .logo {
    padding-left: 11px;
  }
}
</style>