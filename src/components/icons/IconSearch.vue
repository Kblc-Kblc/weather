<template>
  <div>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.25 10.25L14.75 14.75M6.5 11.75C3.60051 11.75 1.25 9.39946 1.25 6.49997C1.25 3.60047 3.60051 1.24997 6.5 1.24997C9.3995 1.24997 11.75 3.60047 11.75 6.49997C11.75 9.39946 9.3995 11.75 6.5 11.75Z"
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'IconSearch',
  props: {
    color: {
      type: String,
      default: 'var(--primary-color)',
    },
  },
}
</script>

<style scoped>
svg {
  display: block;
  cursor: pointer;
}
</style>
