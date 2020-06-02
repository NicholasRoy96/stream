export const state = () => ({
  watchlist: [],
  searchOpen: false
})

export const mutations = {
  setWatchlist: (state, params) => {
    state.watchlist.push(params)
  },
  updateWatchlist: (state, params) => {
    state.watchlist = params
  },
  toggleSearch: (state) => {
    state.searchOpen = !state.searchOpen
  }
}

export const actions = {
  addToWatchlist({ commit }, params) {
    commit('setWatchlist', params)
  },
  removeFromWatchlist({ commit, state }, id) {
    const updatedWatchlist = state.watchlist.filter(media => media.id !== id)
    commit('updateWatchlist', updatedWatchlist)
  },
  emptyWatchlist ({ commit }) {
    const emptiedWatchlist = []
    commit('setWatchlist', emptiedWatchlist)
  },
  toggleSearchBar({ commit }) {
    commit('toggleSearch')
  }
}