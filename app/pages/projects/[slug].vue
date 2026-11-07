<script setup lang="ts">
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: project } = await useAsyncData('project-' + slug, () =>
  queryCollection('projects').path('/projects/' + slug).first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => (project.value ? project.value.title + ' — Gabriel’s Projects' : 'Project — Gabriel’s Projects'),
  description: () => project.value?.description || 'A project in Gabriel’s collection.'
})
</script>

<template>
  <article v-if="project" class="project-detail">
    <NuxtLink class="back-link" to="/#projects"><span>←</span> Back to the collection</NuxtLink>

    <header class="detail-heading">
      <div class="detail-eyebrow">
        <span class="category-pill">{{ project.category }}</span>
        <span class="mono-label">{{ project.year || 'A PERSONAL PROJECT' }}</span>
        <span class="project-status"><i />{{ project.status || 'In progress' }}</span>
      </div>
      <h1>{{ project.title }}<span class="title-period">.</span></h1>
      <p class="detail-deck">{{ project.description }}</p>
      <div class="detail-tags">
        <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
      </div>
    </header>

    <div class="detail-cover">
      <img v-if="project.cover" :src="project.cover" :alt="project.coverAlt || ''">
      <div v-else class="cover-placeholder"><span>✳</span></div>
      <span class="detail-cover-note">PROJECT SNAPSHOT <i>·</i> {{ project.year || 'ONGOING' }}</span>
    </div>

    <div class="detail-body-grid">
      <aside class="detail-aside">
        <div class="aside-block">
          <span class="aside-label">BUILT WITH</span>
          <div class="stack-list">
            <span v-for="item in project.stack" :key="item">{{ item }}</span>
            <span v-if="!project.stack?.length" class="aside-muted">Add your tools in the Markdown frontmatter.</span>
          </div>
        </div>
        <div class="aside-block aside-links">
          <span class="aside-label">OUT IN THE WORLD</span>
          <a v-if="project.demo" :href="project.demo" target="_blank" rel="noreferrer">Live project <span>↗</span></a>
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noreferrer">Source code <span>↗</span></a>
          <span v-if="!project.demo && !project.repo" class="aside-muted">Links can be added to the frontmatter.</span>
        </div>
      </aside>
      <div class="markdown-content">
        <ContentRenderer :value="project" />
      </div>
    </div>

    <NuxtLink class="next-project-link" to="/#projects">
      <span class="mono-label">THAT’S THE STORY</span>
      <span>Back to all projects <b>↗</b></span>
    </NuxtLink>
  </article>
</template>


