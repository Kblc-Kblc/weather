<template>
  <div class="common-layout dark">
    <el-container class="container">
      <el-header><slot name="header"></slot></el-header>
      <el-main><slot></slot></el-main>
      <el-footer><slot name="footer"></slot></el-footer>
    </el-container>
  </div>
</template>

<script setup></script>

<style scoped>
.common-layout {
  height: 100%;
}

.container {
  height: 100%;
}
</style>
