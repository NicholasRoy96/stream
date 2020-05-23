<template>
  <v-footer padless class="footer">
      <v-card flat class="footer-card">
        <v-btn icon large class="footer-icon" v-for="icon in icons" :key="icon">
          <v-icon>{{icon}}</v-icon>
        </v-btn>
        <div class="link-div">
          <a class="footer-link" v-for="link in links" :key="link" href="#">{{link}}</a>
        </div>
      </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
        'mdi-youtube'
      ],
      links: [
        'Stream App',
        'Help',
        'Privacy Policy'
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: black;
  justify-content: center;
  height: 200px;
}
.footer-card {
  background-color: black !important;
  width: 100%;
  text-align: center;
}
.footer-icon {
  color: white !important;
  margin: 10px 15px;
}
.footer-icon:hover {
  color: #f5c518 !important;
}
.link-div {
  margin-top: 40px;
}
.footer-link {
  margin: 10px 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  word-break: keep-all;

}
.footer-link:hover {
  text-decoration: underline;
}
</style>