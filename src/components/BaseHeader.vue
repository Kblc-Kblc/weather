<template>
  <div class="header">
    <div class="header-tools">
      <router-link to="/">
        <logo />
      </router-link>
    </div>
    <base-switch />
  </div>
</template>

<script setup>
import BaseSwitch from './BaseSwitch.vue'
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

@media (max-width: 767px) {
  .header {
    padding: 0 25px;
  }
}

.header-tools {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
