<template>
  <v-app :theme="theme">
    <v-main>
      <v-fab
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        location="top end"
        size="small"
        absolute
        app
        @click="toggleTheme"
      ></v-fab>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
