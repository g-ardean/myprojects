<script setup lang="ts">
const { theme, toggleTheme } = usePortfolioTheme()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'"
    :title="'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'"
    @click="toggleTheme"
  >
    <svg v-if="theme === 'light'" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 2.2v1.6M10 16.2v1.6M17.8 10h-1.6M3.8 10H2.2m13.3-5.5-1.1 1.1m-8.8 8.8-1.1 1.1m11 0-1.1-1.1M5.5 5.5 4.4 4.4" />
    </svg>
    <svg v-else viewBox="0 0 20 20" aria-hidden="true">
      <path d="M16.7 12.4A7.2 7.2 0 0 1 7.6 3.3a7.2 7.2 0 1 0 9.1 9.1Z" />
      <path d="M13.9 3.1v2.2m1.1-1.1h-2.2" />
    </svg>
  </button>
</template>

