export const state = () => ({
  selectedCity: 'Tashkent',
  data: null
});

export const mutations = {
  SET_SELECTED_CITY(state, city) {
    state.selectedCity = city;
  },
  SET_DATA(state, data) {
    state.data = data;
  }
};

export const actions = {
  setData({ commit }, data) {
    commit('SET_DATA', data);
  }
};
