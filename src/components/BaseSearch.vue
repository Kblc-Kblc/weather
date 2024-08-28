<template>
  <div class="search-container">
    <el-input
      v-model="input"
      :prefix-icon="Search"
      style="width: 240px"
      placeholder="Weather in your city"
      clearable
      @input="handleInput"
      @focus="showDropdown = true"
      @blur="hideDropdown"
    />
    <ul v-if="showDropdown && recentSearches.length" class="dropdown-list">
      <li v-for="(city, index) in recentSearches" :key="index" @mousedown="selectCity(city)">
        {{ city }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useWeatherStore } from '../stores/weather.js'

const weatherStore = useWeatherStore()
const input = ref('')
const recentSearches = computed(() => weatherStore.recentSearches)
const showDropdown = ref(false)

const props = defineProps({
  modelValue: String,
  debounceDelay: {
    type: Number,
    default: 900,
  },
  hasError: Boolean,
})

const emit = defineEmits(['update:modelValue'])

function debounce(func, delay) {
  let timerId
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const debouncedInput = debounce((value) => {
  emit('update:modelValue', value)
}, props.debounceDelay)

const handleInput = (value) => {
  input.value = value
  debouncedInput(value)
}

const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const selectCity = (city) => {
  input.value = city
  emit('update:modelValue', city)
  showDropdown.value = false
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== input.value) {
      input.value = newValue
    }
  }
)
</script>

<style scoped>
.search-container {
  position: relative;
  width: 240px;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--el-color-info-light-8);

  border-radius: 4px;
  margin-top: 5px;
  z-index: 1000;
  list-style: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-list li {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-list li:hover {
  background: var(--el-border-color-hover);
}
</style>
