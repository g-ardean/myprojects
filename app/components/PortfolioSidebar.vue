<script setup lang="ts">
import { projectCategories } from '~/utils/projectCategories'

defineProps<{
  open?: boolean
}>()

defineEmits<{
  navigate: []
}>()

const route = useRoute()
</script>

<template>
  <aside class="sidebar" :class="{ 'is-open': open }">
    <NuxtLink class="brand" to="/" aria-label="Gabriel’s Projects home" @click="$emit('navigate')">
      <span class="brand-mark"><span>G</span><i /></span>
      <span class="brand-word">Gabriel’s Projects</span>
    </NuxtLink>

    <div class="sidebar-label">WORKSPACE</div>
    <nav class="primary-nav" aria-label="Main navigation">
      <NuxtLink class="nav-link" :class="{ active: route.path === '/' }" to="/" @click="$emit('navigate')">
        <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="5.5" height="5.5" rx="1.4" /><rect x="11.5" y="3" width="5.5" height="5.5" rx="1.4" /><rect x="3" y="11.5" width="5.5" height="5.5" rx="1.4" /><rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.4" /></svg>
        <span>Overview</span>
        <span class="nav-count">⌘ 1</span>
      </NuxtLink>
      <NuxtLink class="nav-link" :class="{ active: route.path === '/' }" to="/#projects" @click="$emit('navigate')">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h8" /><circle cx="15.5" cy="14.5" r="1.1" /></svg>
        <span>All projects</span>
      </NuxtLink>
    </nav>

    <div class="sidebar-label category-label">CATEGORIES</div>
    <nav class="category-nav" aria-label="Project categories">
      <NuxtLink
        v-for="section in projectCategories"
        :key="section.slug"
        class="category-link"
        :class="{ 'is-active': route.path === '/category/' + section.slug }"
        :to="'/category/' + section.slug"
        @click="$emit('navigate')"
      >
        <span class="category-dot" :class="'dot-' + section.slug">{{ section.icon }}</span>
        <span>{{ section.label }}</span>
      </NuxtLink>
    </nav>

    <div class="sidebar-spacer" />

    <div class="sidebar-note">
      <span class="note-spark">✳</span>
      <p>Curiosity is a<br>pretty good roadmap.</p>
      <span class="note-caption">A PERSONAL ARCHIVE</span>
    </div>

    <div class="profile-chip">
      <div class="profile-avatar">G</div>
      <div class="profile-copy">
        <strong>Gabriel</strong>
        <span>Independent maker</span>
      </div>
      <span class="profile-menu" aria-hidden="true">···</span>
    </div>
  </aside>
</template>


