<template>
  <div>
    <NavbarComponent />
    <TodayDetails />
    <WeeklyWeather />
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import TodayDetails from '../components/TodayDetails.vue';
import WeeklyWeather from '../components/WeeklyWeather.vue';

export default {
  name: 'IndexPage',
}
</script>
