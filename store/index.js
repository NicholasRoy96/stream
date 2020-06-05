export const state = () => ({
  watchlist: [],
  searchOpen: false,
  recentlyViewed: []
})

export const mutations = {
  // Watchlist
  setWatchlist: (state, params) => {
    state.watchlist.push(params);
  },
  updateWatchlist: (state, params) => {
    state.watchlist = params;
  },
  // Search
  toggleSearch: state => {
    state.searchOpen = !state.searchOpen;
  },
  // Recently Viewed
  setRecentlyViewed: (state, params) => {
    state.recentlyViewed.push(params);
  },
  updateRecentlyViewed: (state, params) => {
    state.recentlyViewed = params;
  }
};

export const actions = {
  // Watchlist
  addToWatchlist({ commit }, params) {
    commit("setWatchlist", params);
  },
  removeFromWatchlist({ commit, state }, id) {
    const updatedWatchlist = state.watchlist.filter(
      media => media.id !== id
    );
    commit("updateWatchlist", updatedWatchlist);
  },
  emptyWatchlist({ commit }) {
    const emptiedWatchlist = [];
    commit("updateWatchlist", emptiedWatchlist);
  },
  // Search
  toggleSearchBar({ commit }) {
    commit("toggleSearch");
  },
  // Recently Viewed
  addToRecentlyViewed({ commit, state }, params) {
    if (!state.recentlyViewed.some(media => media.id === params.id)) {
      commit("setRecentlyViewed", params);
    }
  },
  emptyRecentlyViewed({ commit }) {
    const emptiedRecentlyViewed = [];
    commit("updateRecentlyViewed", emptiedRecentlyViewed);
  }
};