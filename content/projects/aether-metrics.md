---
title: Aether Metrics
description: A calm little observability dashboard that makes the shape of a system easier to read at a glance.
category: Engineering
year: "2026"
status: In progress
featured: true
sort: 1
cover: /assets/aether.svg
coverAlt: Abstract green and ink data visualization for Aether Metrics
tags:
  - Observability
  - Dashboards
  - Systems
stack:
  - Nuxt
  - TypeScript
  - SVG
---

## The idea

Aether Metrics is a small observability workspace for seeing the rhythm of a service without turning every glance into an incident review. It brings request volume, latency, and recent events into one quiet, readable place.

![Aether Metrics interface concept](/assets/aether.svg)

## What I’m exploring

The interesting part is not making another wall of charts. It is helping someone spot what changed, then giving them enough context to decide what to do next.

- A compact event stream with useful grouping
- Service health that reads clearly in dark and light themes
- Fast filters for the time window and service name

## Notes from the build

The interface is being shaped around real operational questions: what changed, when did it change, and what else moved with it. The sample data stays deliberately small so the visual hierarchy does more work than the volume of numbers.
