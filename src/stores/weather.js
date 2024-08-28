import { defineStore } from 'pinia'

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromLocalStorage(key) {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : null
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    units: 'metric',
    recentSearches: loadFromLocalStorage('recentSearches') || [],
    loading: false,
    search: '',
  }),
  actions: {
    setWeatherData(data) {
      this.weatherData = data
    },
    setLoading(loading) {
      this.loading = loading
    },
    clearWeatherData() {
      this.weatherData = null
    },
    setUnits(units) {
      this.units = units
    },
    setSearch(city) {
      this.search = city
    },
    addRecentSearch(city) {
      if (this.recentSearches.includes(city)) {
        this.recentSearches = this.recentSearches.filter((item) => item !== city)
      }
      this.recentSearches.unshift(city)
      if (this.recentSearches.length > 5) {
        this.recentSearches.pop()
      }
      saveToLocalStorage('recentSearches', this.recentSearches)
    },
  },
})
