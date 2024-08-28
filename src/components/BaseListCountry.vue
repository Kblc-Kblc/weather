<template>
  <el-card class="recent-searches-card">
    <template #header>
      <div class="clearfix">
        <span>City search history</span>
      </div>
    </template>
    <div v-for="city in recentSearches" :key="city" @click="fetchWeather(city)">
      <span class="recent-city">{{ city }}</span>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weather.js'
import api from '@/services/api.js'
const weatherStore = useWeatherStore()

const recentSearches = computed(() => weatherStore.recentSearches)

function fetchWeather(city) {
  weatherStore.setLoading(true)
  const units = weatherStore.units
  api
    .fetchWeather(city, units)
    .then((response) => {
      weatherStore.setWeatherData(response.data)
      weatherStore.setLoading(false)
      weatherStore.setSearch(city)
    })
    .catch((error) => {
      console.error('Ошибка при получении данных о погоде:', error)
      weatherStore.clearWeatherData()
      weatherStore.setLoading(false)
    })
}
</script>

<style scoped>
.recent-searches-card {
  width: 100%;
}

.recent-city {
  cursor: pointer;
  transition: background-color 0.3s;
}

.recent-city:hover {
  color: var(--el-color-primary);
}
</style>
