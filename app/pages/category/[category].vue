<script setup lang="ts">
import { projectCategories } from '~/utils/projectCategories'

const route = useRoute()
const slug = Array.isArray(route.params.category)
  ? route.params.category[0]?.toLowerCase()
  : String(route.params.category || '').toLowerCase()
const category = projectCategories.find((item) => item.slug === slug)

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Project category not found' })
}

const { data } = await useAsyncData('project-catalog', () =>
  queryCollection('projects').order('sort', 'ASC').all()
)

const search = ref('')
const projects = computed(() => {
  const term = search.value.trim().toLowerCase()

  return (data.value ?? []).filter((project) => {
    const inCategory = project.category === category.label
    const searchable = [
      project.title,
      project.description,
      project.category,
      ...(project.tags ?? []),
      ...(project.stack ?? [])
    ].join(' ').toLowerCase()

    return inCategory && (!term || searchable.includes(term))
  })
})

const categoryOptions = [
  { label: 'All work', path: '/' },
  ...projectCategories.map((item) => ({
    label: item.label,
    path: '/category/' + item.slug
  }))
]

useSeoMeta({
  title: () => category.label + ' — Gabriel’s Projects',
  description: () => category.description
})
</script>

<template>
  <section class="category-page">
    <NuxtLink class="back-link" to="/#projects"><span>←</span> All projects</NuxtLink>

    <header class="category-page-heading">
      <div class="eyebrow"><span class="eyebrow-dot" /> PROJECT CATEGORY <i>·</i> {{ category.label.toUpperCase() }}</div>
      <div class="category-title-row">
        <div>
          <h1>{{ category.label }}<em>.</em></h1>
          <p>{{ category.description }}</p>
        </div>
        <div class="category-total">
          <span class="mono-label">IN THIS COLLECTION</span>
          <strong>{{ String(projects.length).padStart(2, '0') }}</strong>
        </div>
      </div>
    </header>

    <nav class="category-route-tabs" aria-label="Browse project categories">
      <NuxtLink
        v-for="option in categoryOptions"
        :key="option.label"
        class="filter-chip"
        :class="{ 'is-selected': option.label === category.label }"
        :to="option.path"
      >
        {{ option.label }}
      </NuxtLink>
      <label class="search-box">
        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.1 13.1 4 4" /></svg>
        <input v-model="search" type="search" placeholder="Find a project..." aria-label="Find a project">
        <kbd>/</kbd>
      </label>
    </nav>

    <div v-if="projects.length" class="project-grid category-project-grid">
      <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
    </div>
    <div v-else class="empty-state">
      <span>⌕</span>
      <h3>No projects in this corner yet.</h3>
      <p>Try another search, or browse a different category.</p>
      <NuxtLink to="/">Browse all work <b>↗</b></NuxtLink>
    </div>

    <div class="collection-end">
      <span>{{ category.label.toUpperCase() }}</span><i /><span>MORE WHEN IT’S READY</span>
    </div>
  </section>
</template>

