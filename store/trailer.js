export const state = () => ({
  trailerDialog: false
});

export const mutations = {
  setTrailerDialog: (state) => {
    state.trailerDialog = !state.trailerDialog;
  }
};

export const actions = {
  toggleTrailerDialog({ commit }) {
    commit("setTrailerDialog");
  }
};
