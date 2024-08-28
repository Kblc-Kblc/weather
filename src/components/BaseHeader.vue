<template>
  <div class="header">
    <div class="header-tools">
      <router-link to="/">
        <logo />
      </router-link>
    </div>
    <base-theme-switch />
  </div>
</template>

<script setup>
import BaseThemeSwitch from './BaseThemeSwitch.vue'
import Logo from './icons/Logo.vue'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid var(--border-color);
  padding: 0 45px;
}

.header-tools {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
