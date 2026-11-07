# Gabriel’s Projects

A Nuxt 4 portfolio dashboard for projects of every kind: apps, APIs, security research, creative work, and music. The interface opens in dark mode, remembers the theme choice, and is designed to work on small screens as well as desktop.

## Run it

~~~bash
npm install
npm run dev
~~~

## Add a project

Create a Markdown file in **content/projects/**, for example **content/projects/quiet-map.md**:

~~~md
---
title: Quiet Map
description: A short sentence that works on the dashboard card.
category: Creative
year: "2026"
status: In progress
featured: false
sort: 7
cover: /assets/quiet-map.jpg
coverAlt: A quiet map at dusk
tags:
  - Maps
  - Notes
stack:
  - Nuxt
  - TypeScript
---

## The idea

Write the project story here with regular Markdown. Headings, lists, links, and fenced code blocks are supported.

![A project image](/assets/quiet-map.jpg)
~~~

Put image files in **public/assets/** and reference them from Markdown with their site path, such as **/assets/quiet-map.jpg**. Nuxt Content reads files from **content/projects/*.md**; each filename becomes its project URL, so the example above appears at **/projects/quiet-map**.

The **category** field is shown in the category filters and gets a clean route such as **/category/engineering**. The starter categories are **Engineering**, **Security**, **Creative**, and **Music**; add or rename options in **app/pages/index.vue** and **app/components/PortfolioSidebar.vue** to match your work. Set **featured: true** on one entry to show it in the dashboard spotlight.

The **repo** and **demo** fields are optional frontmatter fields for the project page:

~~~yaml
repo: https://github.com/your-name/quiet-map
demo: https://quiet-map.example.com
~~~

## Personalize it

- Update the name and initials in **app/components/PortfolioSidebar.vue** if you want to personalize the branding.
- Update the footer credit in **app/pages/index.vue**.
- Change the page title and description in **nuxt.config.ts**.
- Edit the GitHub-inspired charcoal, slate, and green palette tokens in **app/assets/css/main.css**. Dark mode stays the default; light mode uses GitHub-style light surfaces and green accents.
- The UI uses DM Sans and JetBrains Mono. JetBrains Mono is used for technical labels and enables contextual programming ligatures; system fallbacks keep the layout readable if the web fonts cannot load.




