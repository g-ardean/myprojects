<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="workspace-shell">
    <div
      class="sidebar-scrim"
      :class="{ 'is-visible': mobileMenuOpen }"
      aria-hidden="true"
      @click="mobileMenuOpen = false"
    />
    <PortfolioSidebar
      :open="mobileMenuOpen"
      @navigate="mobileMenuOpen = false"
    />
    <main class="workspace-main">
      <AppTopbar @menu="mobileMenuOpen = !mobileMenuOpen" />
      <div class="page-content">
        <slot />
      </div>
    </main>
  </div>
</template>
