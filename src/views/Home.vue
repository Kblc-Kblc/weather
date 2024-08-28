<template>
  <common-layout>
    <template #header> <base-header /> </template>

    <div class="main">
      <div class="toolbar">
        <div class="radio-wrapper">
          <el-radio-group v-model="units">
            <el-radio-button value="metric">Celsius</el-radio-button>
            <el-radio-button value="imperial">Fahrenheit</el-radio-button>
          </el-radio-group>
        </div>
        <div class="search-wrapper">
          <base-search v-model="search" />
        </div>
      </div>
      <div class="card-wrapper">
        <base-weather-card />
      </div>

      <div class="card-wrapper">
        <base-list-country />
      </div>

      <!--      <router-link to="/details"> <el-link>Go to history page</el-link></router-link>-->
    </div>
  </common-layout>
</template>

<script setup>
import CommonLayout from '@/layouts/CommonLayout.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseWeatherCard from '@/components/BaseWeatherCard.vue'
import BaseListCountry from '@/components/BaseListCountry.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { ref, watch } from 'vue'
import { useWeatherStore } from '../stores/weather.js'
import { ElNotification } from 'element-plus'
import api from '@/services/api.js'

const weatherStore = useWeatherStore()
const search = ref('')
const units = ref('metric')

const fetchWeather = (city) => {
  weatherStore.setLoading(true)
  api
    .fetchWeather(city, units.value)
    .then((response) => {
      weatherStore.setWeatherData(response.data)
      weatherStore.addRecentSearch(response.data.name)
      weatherStore.setLoading(false)
    })
    .catch((error) => {
      console.error('Ошибка при получении данных о погоде:', error)
      weatherStore.clearWeatherData()
      ElNotification({
        title: 'Error',
        message: error.response.data.message,
        type: 'error',
      })
      weatherStore.setLoading(false)
    })
}

watch(search, (newSearch) => {
  if (newSearch) {
    fetchWeather(newSearch)
  } else {
    weatherStore.clearWeatherData()
  }
})

watch(units, (newUnits) => {
  weatherStore.setUnits(newUnits)
  if (weatherStore.weatherData) {
    fetchWeather(weatherStore.weatherData.name)
  }
})
</script>

<style scoped>
.main {
  padding: 0 45px;
}

@media (max-width: 767px) {
  .main {
    padding: 0 25px;
  }
}

.card-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 24px;
}

.search-wrapper {
  display: flex;
  justify-content: flex-end;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
