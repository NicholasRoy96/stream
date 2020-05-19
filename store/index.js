export const state = () => ({
  watchlist: []
})

export const mutations = {
  setWatchlist: (state, params) => {
    state.watchlist.push(params)
  },
  updateWatchlist: (state, params) => {
    state.watchlist = params
  }
}

export const actions = {
  addToWatchlist({ commit }, params) {
    commit('setWatchlist', params)
  },
  removeFromWatchlist({ commit, state }, id) {
    const updatedWatchlist = state.watchlist.filter(movie => movie.id !== id)
    commit('updateWatchlist', updatedWatchlist)
  },
  emptyWatchlist ({ commit }) {
    const emptiedWatchlist = []
    commit('setWatchlist', emptiedWatchlist)
  }
}