---
sidebar_position: 1
title: Feature-Sliced Design Implementation
description: How the source tree maps to Feature-Sliced Design layers.
---

# Feature-Sliced Design Implementation

Puzzle Slider follows Feature-Sliced Design (FSD) strictly. The goal is to keep business logic, reusable UI, and route-level composition separated so the application can evolve without turning into a tightly coupled monolith.

## Layer Map

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

## Shared

`shared` contains the most reusable building blocks and utility code. In this project that includes abstract UI components such as `Button`, `Flex`, `Input`, `Modal`, and `Toggle`, plus isolated utility hooks and storage helpers.

Typical responsibilities:

- Stateless visual primitives.
- Reusable hooks such as `useTimer` and `useImageLoader`.
- Low-level helpers for local storage, formatting, and DOM-safe utilities.

## Entities

`entities` holds the core domain models and their local state. The project uses this layer for slices such as `gameSettings`, `gameStats`, `levelCard`, and `tile`.

Typical responsibilities:

- Domain types and view models.
- Focused Zustand stores.
- Small UI pieces that directly represent a business entity.
- API facades for entity-specific data access.

## Features

`features` contains user-triggered business capabilities. Examples include `configureGame`, `puzzleBoard`, and `selectLevelSize`.

Typical responsibilities:

- Game actions and workflows.
- Form logic and validation.
- Puzzle generation and win handling.
- Progress, results, and other feature-level orchestration.

## Widgets

`widgets` compose entities and features into reusable screen blocks. In this codebase that includes `cookieConsent`, `gameSession`, `levelList`, and `resultsOverview`.

Widgets are intentionally larger than features, but they should still remain focused on composition rather than implementing domain rules directly.

## Pages

`pages` define route-level layouts such as `MainPage`, `GamePage`, and `ResultsPage`. Each page pulls in widgets and features, then arranges them for a specific route.

:::note
Cross-layer imports should go through each slice’s public API, usually exposed by `index.ts` or `index.tsx`. Avoid reaching into another slice’s internal `hooks`, `model`, or `ui` folders from outside.
:::

## Why This Structure Works

- It keeps refactors local to one slice.
- It minimizes accidental coupling between gameplay, storage, and presentation.
- It makes consent-aware persistence and state hydration easier to reason about.
- It supports replacing a slice with a new implementation without rewriting the whole app.
