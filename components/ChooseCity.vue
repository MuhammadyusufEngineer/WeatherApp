<template>
  <div class="relative">
    <input v-model="input" class="relative w-full sm:w-auto text-black bg-low-blue px-5 py-2 rounded-lg box-shadow"
      placeholder="Выбрать город" type="text" @input="handleInput">
    <ul v-if="input && data && data[0]"
      class="absolute w-full bg-white rounded-md border border-blue border-solid box-shadow py-3 duration-200 translate-y-3 ease-out">
      <li v-for="(city, index) in data" :key="index"
        class="text-blue hover:bg-blue hover:text-white p-1 duration-200 ease-out cursor-pointer"
        @click="handleCitySelection(city.name)"> {{
          city.name ?
            `${city.name}, ${city.country}` : null }}
      </li>
    </ul>
    <div v-else></div>
  </div>
</template>
<script>
import { debounce } from 'lodash'
export default {
  name: 'ChooseCity',
  data() {
    return {
      data: null,
      input: '',
      error: '',
    }
  },
  methods: {
    async fetchCityname() {
      if (this.input) {
        try {
          const response = await this.$axios.$get('https://api.weatherapi.com/v1/search.json', {
            params: {
              key: this.$config.key,
              q: this.input
            }
          })
          this.data = response
        } catch (err) {
          this.error = `Fetch error: ${err}`
        }
      }
    },
    async handleCitySelection(city) {
      this.input = null
      await this.$store.commit('SET_SELECTED_CITY', city)
    },
    handleInput: debounce(function () {
      this.fetchCityname()
    }, 500)
  }
}
</script>