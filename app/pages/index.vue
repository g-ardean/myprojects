<script setup lang="ts">
import { projectCategories } from '~/utils/projectCategories'

const filterOptions = ['All work', ...projectCategories.map((category) => category.label)]
const { data } = await useAsyncData('project-catalog', () =>
  queryCollection('projects').order('sort', 'ASC').all()
)

const catalog = computed(() => data.value ?? [])
const selectedCategory = ref('All work')
const search = ref('')

const filteredProjects = computed(() => {
  const term = search.value.trim().toLowerCase()

  return catalog.value.filter((project) => {
    const searchable = [
      project.title,
      project.description,
      project.category,
      ...(project.tags ?? []),
      ...(project.stack ?? [])
    ].join(' ').toLowerCase()

    return !term || searchable.includes(term)
  })
})

const featuredProject = computed(() => catalog.value.find((project) => project.featured))
const cardProjects = computed(() => {
  if (search.value.trim() || !featuredProject.value) {
    return filteredProjects.value
  }

  return filteredProjects.value.filter((project) => project.path !== featuredProject.value?.path)
})

const categoryCount = (category: string) =>
  category === 'All work'
    ? catalog.value.length
    : catalog.value.filter((project) => project.category === category).length

function selectCategory(label: string) {
  if (label === 'All work') {
    selectedCategory.value = 'All work'
    return
  }

  const category = projectCategories.find((item) => item.label === label)
  if (category) {
    void navigateTo('/category/' + category.slug)
  }
}

useSeoMeta({
  title: 'Gabriel’s Projects — code, creativity & more',
  description: 'A living collection of projects, experiments, and things made with curiosity.'
})
</script>

<template>
  <div class="dashboard">
    <section class="welcome-row">
      <div>
        <div class="eyebrow"><span class="eyebrow-dot" /> PERSONAL WORKSPACE <i>·</i> A LITTLE BIT OF EVERYTHING</div>
        <h1>Curiosity,<br><em>made visible.</em></h1>
        <p class="welcome-copy">Digital experiments, useful tools, and a few notes from outside the terminal.</p>
      </div>
      <div class="hello-card">
        <div class="hello-orbit"><span>✳</span></div>
        <div>
          <span class="hello-label">THE SHORT VERSION</span>
          <p>Different mediums.<br><strong>Same curiosity.</strong></p>
        </div>
        <span class="hello-stamp">✦</span>
      </div>
    </section>

    <section v-if="featuredProject" class="spotlight-section" aria-label="Featured project">
      <div class="section-kicker"><span>01</span> CURRENT OBSESSION</div>
      <NuxtLink class="spotlight-card" :to="featuredProject.path">
        <div class="spotlight-art">
          <img :src="featuredProject.cover || '/assets/aether.svg'" :alt="featuredProject.coverAlt || ''">
          <div class="spotlight-art-shade" />
          <span class="spotlight-sticker">✳ IN THE SPOTLIGHT</span>
          <span class="spotlight-art-caption">A THING MADE WITH INTENTION</span>
        </div>
        <div class="spotlight-copy">
          <div class="spotlight-meta">
            <span class="category-pill">{{ featuredProject.category }}</span>
            <span class="mono-label">{{ featuredProject.year || 'NOW' }}</span>
          </div>
          <h2>{{ featuredProject.title }}</h2>
          <p>{{ featuredProject.description }}</p>
          <div class="spotlight-footer">
            <span class="project-status"><i />{{ featuredProject.status || 'In progress' }}</span>
            <span class="spotlight-link">Explore project <b>↗</b></span>
          </div>
        </div>
      </NuxtLink>
    </section>

    <section class="stats-row" aria-label="Portfolio at a glance">
      <div class="stat-cell">
        <span class="stat-number">{{ String(catalog.length).padStart(2, '0') }}</span>
        <span class="stat-label">PROJECTS<br><i>AND COUNTING</i></span>
      </div>
      <div class="stat-cell">
        <span class="stat-number">{{ String(new Set(catalog.map((project) => project.category)).size).padStart(2, '0') }}</span>
        <span class="stat-label">DIFFERENT<br><i>PLAYGROUNDS</i></span>
      </div>
      <div class="stat-cell stat-note">
        <span class="stat-star">✳</span>
        <span>Built in public,<br>kept a little personal.</span>
      </div>
      <div class="stat-cell stat-tail">
        <span class="mono-label">FIELD NOTE NO.</span>
        <span class="stat-number">001—∞</span>
      </div>
    </section>

    <section id="projects" class="projects-section">
      <div class="projects-heading">
        <div>
          <div class="section-kicker"><span>02</span> THE COLLECTION</div>
          <h2>A few things I’ve made<span>.</span></h2>
        </div>
        <label class="search-box">
          <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.1 13.1 4 4" /></svg>
          <input v-model="search" type="search" placeholder="Find a project..." aria-label="Find a project">
          <kbd>/</kbd>
        </label>
      </div>

      <div class="filter-row" role="tablist" aria-label="Filter projects by category">
        <button
          v-for="category in filterOptions"
          :key="category"
          class="filter-chip"
          :class="{ 'is-selected': selectedCategory === category }"
          type="button"
          role="tab"
          :aria-selected="selectedCategory === category"
          @click="selectCategory(category)"
        >
          {{ category }} <span>{{ categoryCount(category) }}</span>
        </button>
        <div class="results-count"><span class="results-dot" />{{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'project' : 'projects' }}</div>
      </div>

      <div v-if="cardProjects.length" class="project-grid">
        <ProjectCard v-for="project in cardProjects" :key="project.path" :project="project" />
      </div>
      <div v-else class="empty-state">
        <span>⌕</span>
        <h3>No projects in this corner yet.</h3>
        <p>Try another filter or search term.</p>
        <button type="button" @click="selectedCategory = 'All work'; search = ''">Show everything <b>↗</b></button>
      </div>
      <div class="collection-end">
        <span>YOU’RE ALL CAUGHT UP</span><i /><span>MORE WHEN IT’S READY</span>
      </div>
    </section>

    <footer class="dashboard-footer">
      <span>Made with curiosity <b>✳</b></span>
      <span class="mono-label">© 2026 · GABRIEL</span>
    </footer>
  </div>
</template>


