<script>
export default {
  name: 'TodayDetails',
  data() {
    return {
      data: null,
      precipation: 'Heт',
      city: null,
      time: null,
      windDirs: {
        N: 'Север',
        NNE: 'Северо-северо-восток',
        NE: 'Северо-восток',
        ENE: 'Востоко-северо-восток',
        E: 'Восток',
        ESE: 'Востоко-юго-восток',
        SE: 'Юго-восток',
        SSE: 'Юго-юго-восток',
        S: 'Юг',
        SSW: 'Юго-юго-запад',
        SW: 'Юго-запад',
        WSW: 'Западо-юго-запад',
        W: 'Запад',
        WNW: 'Западо-северо-запад',
        NW: 'Северо-запад',
        NNW: 'Северо-северо-запад'
      },
      details: []
    }
  },
  computed: {
    selectedCity() {
      return this.$store.state.selectedCity
    },
    weatherData() {
      return this.$store.state.data
    }
  },
  watch: {
    selectedCity: {
      handler(newCity) {
        if (newCity) {
          this.fetchdata()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchdata()
  },
  methods: {
    async fetchdata() {
      await this.$store.dispatch('fetchData')
      // this.checkPrecipation()
      this.getWindDir()
      this.getCityAndTime()
      this.updateDetails()
    }
  },
  // checkPrecipation() {
  //   if (this.data.current.precip_mm) this.precipation = 'Осадки'
  //   else this.precipation = 'Без осадков'
  // },
  getWindDir() {
    return this.windDirs[this.data.current.wind_dir] || 'Neopredelyonnie'
  },
  updateDetails() {
    this.details = [
      { icon: 'temprature', title: 'Температура', info: `${this.data.current.temp_c}° - ощущается как ${this.data.current.feelslike_c}°` },
      { icon: 'pressure', title: 'Давление ', info: `${this.data.current.pressure_mb} мм ртутного столба - нормальное` },
      { icon: 'precipation', title: 'Осадки', info: this.precipation },
      { icon: 'wind', title: 'Ветер', info: `${this.data.current.wind_kph} ${this.getWindDir()} - легкий ветер` },
    ]
  },
  getCityAndTime() {
    this.city = this.data.location.name
    this.time = this.data.location.localtime.split(' ')[1]
  }
}
</script>
<template>
  <div class="container">
    <div class="flex flex-col xl:flex-row gap-12">
      <div class="w-full md:4/5 xl:w-[35%] p-5 box-shadow rounded-xl">
        <div class="flex justify-between">
          <div>
            <p class="text-8xl text-blue font-medium">{{ 20 }}°</p>
            <p class="text-[40px] text-black font-normal"> {{ 'Сегодня' }}</p>
          </div>
          <div class="w-[119px] flex items-start justify-end pt-3">
            <img class="w-full" src="/img/sun.svg" alt="sun icon">
          </div>
        </div>
        <div class="pt-8">
          <p class="text-2xl text-low-dark font-normal"> Время: {{ time }}</p>
          <p class="text-2xl text-low-dark font-normal"> Город: {{ city }} </p>
        </div>
      </div>
      <div
        class="w-full md:4/5 xl:w-[65%] p-4 md:py-10 md:px-8 box-shadow rounded-xl bg-[url('/img/cloud.png')] bg-right-top bg-no-repeat flex items-center">
        <div class="flex flex-col gap-6">
          <div v-for="(detail, index) in details" :key="index" class="flex items-center gap-5 md:gap-3">
            <div
              class="size-10 sm:size-14 md:w-[38px] md:h-[38px] rounded-full box-shadow flex items-center justify-center">
              <img :src="`/img/${detail.icon}.svg`" :alt="detail.title">
            </div>
            <div class="flex flex-col md:flex-row gap-3">
              <p class="w-auto sm:w-[200] md:w-[100px] text-lg md:text-sm text-low-dark font-normal">{{ detail.title }}
              </p>
              <p class="w-auto sm:w-[250px] md:w-[280px] text-lg md:text-sm text-black font-normal">{{ detail.info }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>