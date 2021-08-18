export default function ({ store }) {
    store.dispatch('closeSearchBar');
    if (process.client) {
        // hacky fix to reset search icon color (Vuetify won't let me ...)
        const searchIcon = document.getElementsByClassName('v-icon notranslate mdi mdi-magnify theme--dark')
        if (searchIcon) {
            searchIcon[0].style.color = ''
            searchIcon[0].style.caretColor = ''
        } 
    }
}