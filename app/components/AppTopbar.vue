<script setup lang="ts">
const route = useRoute()
const pageLabel = computed(() => {
  if (route.path.startsWith('/category/')) return String(route.params.category || 'category')
  if (route.path.startsWith('/projects/')) return 'project'
  return 'overview'
})

defineEmits<{
  menu: []
}>()
</script>

<template>
  <header class="topbar">
    <button class="mobile-menu-button" type="button" aria-label="Open navigation" @click="$emit('menu')">
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>
    </button>
    <div class="breadcrumbs">
      <span>gabriel</span><i>/</i><strong>{{ pageLabel }}</strong>
    </div>
    <div class="topbar-actions">
      <div class="availability"><span class="availability-dot" />Open to opportunities</div>
      <span class="topbar-divider" />
      <ThemeToggle />
    </div>
  </header>
</template>


