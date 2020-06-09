<template>
  <div>
    <v-btn depressed class="menu-button text-capitalize d-none d-lg-flex" @click="dialog = true">
      <v-icon left class="menu-button-icon" size="23">mdi-menu</v-icon>
      <span class="menu-button-name d-none d-lg-flex">Menu</span>
    </v-btn>
    <v-btn icon depressed class="menu-button d-lg-none" @click="dialog = true">
      <v-icon class="menu-button-icon-small" size="23">mdi-menu</v-icon>
    </v-btn>

    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <v-container>
          <v-row class="pa-5 pa-md-12">
            <nuxt-link to="/">
              <img src="~/assets/logo.png" width="150" class="logo"><img>
            </nuxt-link>
            <v-spacer></v-spacer>
            <v-btn icon class="close-button" @click="dialog = false">
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-row class="ml-7">
            <v-col cols="12" md="4" v-for="(catergory, i) in categories" :key="i">
              <div class="menu-heading-div">
                <v-icon size="35" color="#f5c518">{{catergory.icon}}</v-icon>
                <h2 class="catergory-heading">{{catergory.name}}</h2>
              </div>
              <v-list>
                <v-list-item v-for="(item, i) in catergory.items" :key="i" class="list-item ml-9">
                  <nuxt-link :to="item.link" class="item-link">
                    <v-list-item-title @click="dialog = false">
                      {{item.heading}}
                    </v-list-item-title>
                  </nuxt-link>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      dialog: false,
      categories: [
        {
          name: "Movies",
          icon: "mdi-filmstrip",
          items: [
            {
              heading: "In Cinemas Now",
              link: "/list/movies/keywords/now_playing"
            },
            {
              heading: "Top Rated Movies",
              link: "/list/movies/keywords/top_rated"
            },
            {
              heading: "Most Popular Movies",
              link: "/list/movies/keywords/popular"
            },
            {
              heading: "Browse Movies by Genre",
              link: "/list/movies/genres/GenreList"
            },
            {
              heading: "Coming Soon to Cinemas",
              link: "/list/movies/keywords/upcoming"
            }
          ]
        },
        {
          name: "TV",
          icon: "mdi-television",
          items: [
            {
              heading: "What's On TV",
              link: "/list/tv/keywords/airing_today"
            },
            {
              heading: "What's Airing Today",
              link: "/list/tv/keywords/on_the_air"
            },
            {
              heading: "Top Rated TV",
              link: "/list/tv/keywords/top_rated"
            },
            {
              heading: "Most Popular TV",
              link: "/list/tv/keywords/popular"
            },
            {
              heading: "Browse TV by Genre",
              link: "/list/tv/genres/GenreList"
            }
          ]
        },
        {
          name: "People",
          icon: "mdi-account-multiple",
          items: [
            {
              heading: "Most Popular People",
              link: "/list/people/keywords/popular"
            }
            // {
            //   heading: "Browse People by Role",
            //   link: "/#"
            // }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.menu-button {
  background-color: transparent !important;
  color: white;
}
.menu-button-icon {
  color: grey !important;
}
.menu-button-icon-small {
  color: white !important;
}
.menu-button-name {
  font-weight: 450;
  font-size: 1.1em;
  letter-spacing: 0.48px;
}
.close-button {
  background-color: #f5c518;
  width: 45px;
  height: 45px;
}
.menu-heading-div {
  display: flex;
  justify-content: left;
}
.catergory-heading {
  padding-left: 16px;
}
.list-item {
  justify-content: left;
}
.item-link {
  text-decoration: none;
  color: white;
  font-weight: 550;
}
.item-link:hover {
  text-decoration: underline;
}
</style>