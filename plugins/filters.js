import Vue from "vue"

Vue.filter('formatYear', function(date) {
  if (!date) return ''
  return date.slice(0, 4)
})