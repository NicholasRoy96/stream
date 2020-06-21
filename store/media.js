export const state = () => ({
  media: {}
});

export const mutations = {
  setMedia: (state, params) => {
    state.media = params;
  }
};

export const actions = {
  updateMedia({ commit }, params) {
    commit("setMedia", params);
  }
};
