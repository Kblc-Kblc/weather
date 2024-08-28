<template>
  <el-switch
    v-model="isDark"
    :active-value="true"
    :inactive-value="false"
    active-color="#409EFF"
    inactive-color="#D3DCE6"
  ></el-switch>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

function updateHtmlClass(isDark) {
  const html = document.documentElement
  if (isDark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

function saveThemePreference(isDark) {
  localStorage.setItem('darkThemeEnabled', isDark ? 'true' : 'false')
}

function loadThemePreference() {
  const storedTheme = localStorage.getItem('darkThemeEnabled')
  return storedTheme === 'true'
}

watch(isDark, (newTheme) => {
  updateHtmlClass(newTheme)
  saveThemePreference(newTheme)
})

onMounted(() => {
  isDark.value = loadThemePreference()
})
</script>
