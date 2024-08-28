import axios from 'axios'

function api() {
  return axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
      appid: import.meta.env.VITE_API_TOKEN,
      lang: 'ru',
    },
  })
}

export default {
  fetchWeather: (city, units) => api().get('/weather', { params: { q: city, units } }),
}
