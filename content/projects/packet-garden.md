---
title: Packet Garden
description: A threat-intel workbench for turning noisy public feeds into signals worth a closer look.
category: Security
year: "2025"
status: Research lab
featured: false
sort: 2
cover: /assets/packet.svg
coverAlt: Abstract network map with glowing nodes
tags:
  - Threat intelligence
  - OSINT
  - Python
stack:
  - Python
  - FastAPI
  - SQLite
---

## Growing useful signals

Packet Garden collects small, public indicators and gives them enough context to be useful. The project is a learning lab for feed normalization, provenance, and careful triage.

![Network map visualization](/assets/packet.svg)

## The workflow

Each observation keeps a source and a timestamp close by. That makes it easier to trace why an item appeared and to discard it when the context no longer supports it.

- Normalize a handful of public feed formats
- Group related indicators before review
- Keep analyst notes separate from source data

## Guardrails

This is a defensive research project. It focuses on understanding public data, preserving provenance, and making review less error-prone.
