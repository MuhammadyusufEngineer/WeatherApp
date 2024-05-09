<script>
export default {
  name: 'WeeklyWeather',
  data() {
    return {
      response: null,
      weeklyData: [],
      dayNamesShortcut: {
        'понедельник': 'Пн',
        'вторник': 'Вт',
        'среда': 'Ср',
        'четверг': 'Чт',
        'пятница': 'Пт',
        'суббота': 'Сб',
        'воскресенье': 'Вс'
      },
      monthNameShortcut: {
        '1': 'янв',
        '2': 'фев',
        '3': 'мар',
        '4': 'апр',
        '5': 'май',
        '6': 'июн',
        '7': 'июл',
        '8': 'авг',
        '9': 'сен',
        '10': 'окт',
        '11': 'ноя',
        '12': 'дек'
      },
      convertCondition: {
        'Sunny': 'ясно',
        'Clear': 'ясно',
        'Overcast': 'пасмурно',
        'Cloudy': 'пасмурно',
        'Partly Cloudy': 'переменная облачность',
        'Rain': 'дождь',
        'Moderate rain': 'умеренный дождь',
        'Light rain shower': 'небольшой дождь',
        'Patchy rain nearby': 'частичный дождь поблизости'
      }
    }
  },
  computed: {
    setData() {
      return this.$store.state.data
    }
  },
  watch: {
    setData: {
      handler(data) {
        if (data) {
          this.$set(this, 'response', data)
          this.loopResponse(data)
        }
      },
      immediate: true
    }
  },
  methods: {
    loopResponse(data) {
      this.weeklyData = []
      for (const day of data.forecast.forecastday) {
        const date = new Date(day.date)
        const weekday = date.toLocaleString('ru', { weekday: 'long' })
        this.pushToRenderObj(day, weekday)
      }
    },
    parseWeekdayNames() {
      if (this.weeklyData.length > 5) {
        this.weeklyData[0].short = 'Сегодня'
        this.weeklyData[1].short = 'Завтра'
      }
    },
    parseMonthNames(data) {
      const newdate = new Date(data.date)
      return `${newdate.getDate()} ${this.monthNameShortcut[newdate.getMonth() + 1]}`
    },
    getTempratures(data) {
      return { max: data.day.maxtemp_c, min: data.day.mintemp_c }
    },
    getIcon(data) {
      return data.day.condition.icon
    },
    getCondition(data) {
      return this.convertCondition[data.day.condition.text.trim()]
    },
    pushToRenderObj(day, weekday) {
      this.weeklyData.push({
        short: this.dayNamesShortcut[weekday],
        date: this.parseMonthNames(day),
        temperature: this.getTempratures(day),
        condition: this.getCondition(day),
        icon: this.getIcon(day)
      })
      this.parseWeekdayNames()
    }
  },
};
</script>

<template>
  <div class="container">
    <div class="flex flex-wrap justify-between mt-12 mb-2">
      <button class="w-full sm:w-auto bg-blue text-white px-5 py-2 rounded-lg box-shadow">На неделю</button>
      <button class="w-full sm:w-auto text-black px-5 py-2 rounded-lg box-shadow">Отменить</button>
    </div>
    <div
      class="w-full h-full grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 rounded-xl box-shadow p-5">
      <div v-for="(day, index) in weeklyData" :key="index" class="col-span-1 row-span-1 p-4 rounded-lg bg-low-blue">
        <p class="text-2xl md:text-lg text-black leading-none mb-1"> {{ day.short }} </p>
        <p class="text-lg md:text-sm text-low-dark"> {{ day.date }}</p>
        <div class="my-3">
          <img :src="`https://${day.icon}`" alt="cloud image">
        </div>
        <p class="text-2xl md:text-lg text-black">{{ day.temperature.max }} °</p>
        <p class="text-lg md:text-xs text-low-dark mb-1">{{ day.temperature.min }} °</p>
        <p class="text-lg md:text-xs text-low-dark">{{ day.condition }}</p>
      </div>
    </div>
  </div>
</template>
