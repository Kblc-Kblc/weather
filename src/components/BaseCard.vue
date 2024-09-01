<template>
  <el-card class="weather-card">
    <el-skeleton v-if="!weatherData && loading" :rows="3" animated />
    <div v-else-if="weatherData" class="weather-content">
      <h2>{{ weatherData.name }}</h2>
      <p class="temperature">{{ weatherData.main.temp }}{{ unitSymbol }}</p>
      <p class="description">{{ weatherData.weather[0].description }}</p>
      <p class="description">Скорость ветра: {{ weatherData.wind.speed }} м/с</p>
    </div>
    <div v-else>
      <p class="default">Enter the name of the city to get weather data.</p>
    </div>
  </el-card>
</template>

<script setup>
import { useWeatherStore } from '../stores/weather.js'
import { computed } from 'vue'

const weatherStore = useWeatherStore()
const unitSymbol = computed(() => (weatherStore.units === 'metric' ? '°C' : '°F'))
const weatherData = computed(() => weatherStore.weatherData)
const loading = computed(() => weatherStore.loading)
</script>

<style lang="scss" scoped>
.weather-card {
  width: 100%;
  height: 303px;
  :deep(.el-card__body) {
    padding: 48px;
  }
}
.weather-content h2 {
  font-size: 26px;
  text-align: center;
  margin: 0;
}

.description {
  text-align: center;
  font-size: 20px;
  margin: 0;
}

.temperature {
  font-size: 72px;
  font-weight: 200;
  text-align: center;
  margin: 0;
}

@media (max-width: 767px) {
  .temperature {
    font-size: 48px;
  }
}

.default {
  font-size: 20px;
}
</style>
