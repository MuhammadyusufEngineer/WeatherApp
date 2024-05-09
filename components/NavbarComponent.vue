<template>
  <div class="container">
    <div class="flex flex-col md:flex-row items-center justify-between gap-5 mt-5 mb-7">
      <div class="logo flex items-center gap-5">
        <div class="size-16">
          <img src="/img/logo.svg" alt="logo with sun and cloud">
        </div>
        <p class="text-blue text-2xl font-bold uppercase">vue weather</p>
      </div>
      <div class="flex items-center gap-2 md:gap-5">
        <ColorMode />
        <ChooseCity />
      </div>
    </div>
  </div>
</template>
<script>
import ChooseCity from '@/components/ChooseCity.vue';
import ColorMode from '@/components/ColorMode.vue';
export default {
  name: 'WeeklyWeather',
  components: {
    ChooseCity,
    ColorMode
  }
}
</script>