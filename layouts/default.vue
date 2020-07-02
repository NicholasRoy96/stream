<template>
  <v-app id="app">
    <Navbar />
    <Nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/nav/Navbar.vue"
import Footer from "@/components/nav/Footer.vue"

export default {
  components: {
    Navbar,
    Footer
  },
}
</script>

<style>
#app {
  font-family: Roboto,Helvetica,Arial,sans-serif;
  background-color: black;
  color: white;
}
.heading {
  font-size: 2.3em;
  color: #f5c518;
  font-weight: 850;
  margin: 25px 0 20px 0;
}
.subheading-link {
  text-decoration: none;
  color: white !important;
}
.subheading-div {
  margin: 20px 0 20px 0
}
.subheading-div:hover .subheading-arrow-icon {
  color: #f5c518;
}
.subheading {
  font-size: 1.5em;
  font-weight: 800;
  padding-left: 10px;
  border-left: 3px solid #f5c518;
  align-self: center;
}
.subheading-arrow-icon {
  color: white;
  margin-left: 4px;
}
.subheading-description {
  color: darkgrey;
  padding-left: 10px;
  font-size: 1.1em;
}
.info-subheading-description {
  color: lightgray;
  padding-left: 10px;
  font-size: 1.35em;
  padding-bottom: 4px;
}
/* MEDIA QUERIES */
/* XL */

@media(min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
  .container--fluid {
    max-width: 100%;
  }
}

/* MD */
@media(max-width: 1263px) {
  .heading {
    font-size: 2.1em;
    margin: 20px 0 20px 0;
  }
  .subheading {
    font-size: 1.4em;
  }
  .subheading-description {
    font-size: 1.05em;
  }
  .info-subheading-description {
    font-size: 1.3em;
    padding-bottom: 3px;
  }
}

/* SM */
@media(max-width: 959px) {
  .heading {
    font-size: 1.9em;
  }
  .subheading-div {
    margin: 17px 0 17px 0
  }
  .subheading {
    font-size: 1.3em;
  }
  .subheading-description {
    font-size: 1em;
  }
  .info-subheading-description {
    font-size: 1.25em;
  }
}

/* XS */
@media(max-width: 599px) {
  .heading {
    font-size: 1.5em;
    font-weight: 750;
    margin: 15px 0 0 0;
  }
  .subheading-div {
    margin: 10px 0 10px 0
  }
  .subheading {
    font-size: 1.05em;
    font-weight: 680;
  }
  .subheading-description {
    font-size: 0.9em;
  }
  .info-subheading-description {
    font-size: 1.2em;
    padding-bottom: 2px;
  }
}
</style>
