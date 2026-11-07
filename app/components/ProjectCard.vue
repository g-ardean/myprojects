<script setup lang="ts">
defineProps<{
  project: {
    path: string
    title: string
    description?: string
    category: string
    year?: string
    status?: string
    cover?: string
    coverAlt?: string
    tags?: string[]
    featured?: boolean
  }
}>()
</script>

<template>
  <NuxtLink class="project-card" :to="project.path">
    <div class="project-cover">
      <img v-if="project.cover" :src="project.cover" :alt="project.coverAlt || ''" loading="lazy">
      <div class="cover-sheen" />
      <span class="cover-category">{{ project.category }}</span>
      <span class="cover-arrow" aria-hidden="true">↗</span>
      <span v-if="project.featured" class="featured-flag">✳ FEATURED</span>
    </div>
    <div class="project-card-body">
      <div class="project-meta">
        <span>{{ project.year || 'IN PROGRESS' }}</span>
        <span class="project-status"><i />{{ project.status || 'In progress' }}</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="project-tags">
        <span v-for="tag in project.tags?.slice(0, 3)" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
