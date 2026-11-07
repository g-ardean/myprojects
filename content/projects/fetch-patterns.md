---
title: Fetch Patterns
description: A field guide and tiny test bench for the small decisions hiding inside data fetching.
category: Engineering
year: "2026"
status: In progress
featured: false
sort: 3
cover: /assets/fetch.svg
coverAlt: Layered abstract panels representing a data flow
tags:
  - APIs
  - TypeScript
  - Patterns
stack:
  - Nuxt
  - TypeScript
  - Vitest
---

## The small details matter

Fetch Patterns is a collection of practical examples for loading data in a frontend: retries, cancellation, caching, pagination, and useful error states.

![Data flow illustration](/assets/fetch.svg)

## A tiny example

~~~ts
async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error('Request failed: ' + response.status)
  }

  return response.json() as Promise<T>
}
~~~

The examples stay close to the browser APIs, so each one is easy to lift into a real project and adapt.
