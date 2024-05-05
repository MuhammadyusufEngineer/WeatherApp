export const state = () => ({
  selectedCity: 'Tashkent',
  data: null
})

export const mutations = {
  SET_SELECTED_CITY(state, city) {
    state.selectedCity = city
  },
  SET_DATA(state, data) {
    state.data = data
  }
}

export const actions = {
  async fetchData({ commit, state }) {
    try {
      const data = await this.$axios.$get('/api/weather', {
        params: {
          key: this.$config.key,
          q: state.selectedCity,
          aqi: 'no',
          alerts: 'no'
        }
      })
      commit('SET_DATA', data)
      return data
    } catch (err) {
      throw err
    }
  }
}
