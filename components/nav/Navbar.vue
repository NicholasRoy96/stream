<template>
  <v-app-bar class="app-bar">
    <v-container fluid>
      
      <!-- MD + -->
      <v-row align="center" class="d-none d-md-flex pl-4" justify="center">
          <nuxt-link to="/" class="site-name">
            <div class="logo-frame">
              <span class="logo-helper"></span><img src="~/assets/logo.png" width="100" class="logo"><img>
            </div>
          </nuxt-link>
        <v-col cols="6">
          <Search class="search-bar" />
        </v-col>
        <NavMenu class="menu-button" />
        <v-divider vertical inset></v-divider>
          <Watchlist class="watchlist-button" />
      </v-row>

      <!-- SM - -->
      <v-row v-if="!searchOpen" class="d-md-none pl-2 pr-2">
        <NavMenu class="menu-button"/>
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
import Watchlist from '@/components/nav/Watchlist.vue'
import Search from '@/components/nav/search/Search.vue'
import SearchSmall from '@/components/nav/search/SearchSmall.vue'
import NavMenu from '@/components/nav/NavMenu.vue'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Watchlist,
    Search,
    SearchSmall,
    NavMenu
  },
  computed: {
    ...mapState(["searchOpen"])
  }
}
</script>

<style>
.v-divider--vertical.v-divider--inset {
  margin-bottom: 8px;
}
#app > div > header > div > div > div.row.d-none.d-md-flex.align-center > button.watchlist-button.d-none.d-md-block.v-btn.v-btn--depressed.theme--dark.v-size--default {
  margin-left: 10px;
}
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
  height: 33.91px;
  width: 100px;
  white-space: nowrap;
  margin-right: 20px;
}
.logo-helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.logo {
  vertical-align: middle;
}
.menu-button {
  margin-right: 10px;
}

/* MEDIA QUERIES */

/* SM */
@media(max-width: 959px) {
  .site-name {
    padding-top: 7px;
    padding-left: 6px;
  }
  .menu-button {
    margin-left: 6px;
  }
}
</style>