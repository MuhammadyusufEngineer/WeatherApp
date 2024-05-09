<script>
export default {
  methods: {
    toggleColorMode() {
      const body = document.body
      body.classList.toggle('dark-mode')

      const isDarkMode = body.classList.contains('dark-mode')
      localStorage.setItem('color-mode', isDarkMode ? 'dark' : 'light')
    }
  },
  mounted() {
    const savedColorMode = localStorage.getItem('color-mode')
    if (savedColorMode === 'dark') document.body.classList.add('dark-mode')
  }
}
</script>

<template>
  <div @click="toggleColorMode" class="cursor-pointer">
    <img src="/img/themeSwitch.svg" alt="">
  </div>
</template>