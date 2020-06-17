import Vue from "vue"

Vue.filter('formatYear', function(date) {
  if (!date) return ''
  return date.slice(0, 4)
})

Vue.filter('formatRuntime', function(runtime) {
  if (!runtime) return ''
  if (runtime < 60) return `${runtime}m`;
  if (runtime === 60) return "1h";
  const hours = runtime / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
})