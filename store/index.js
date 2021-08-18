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
  closeSearch: state => {
    state.searchOpen = false;
  },
  // Recently Viewed
  setRecentlyViewed: (state, params) => {
    state.recentlyViewed.unshift(params);
  },
  updateRecentlyViewed: (state, params) => {
    state.recentlyViewed = params;
  },
  popRecentlyViewed: (state) => {
    state.recentlyViewed.pop()
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
  closeSearchBar({ commit }) {
    commit("closeSearch");
  },
  // Recently Viewed
  addToRecentlyViewed({ commit, state }, params) {
    if (!state.recentlyViewed.some(media => media.id === params.id)) {
      commit("setRecentlyViewed", params);
    }
    if (state.recentlyViewed.length > 18) {
      commit("popRecentlyViewed")
    }
  },
  emptyRecentlyViewed({ commit }) {
    const emptiedRecentlyViewed = [];
    commit("updateRecentlyViewed", emptiedRecentlyViewed);
  }
};