---
sidebar_position: 1
title: Introduction
description: Overview of Puzzle Slider, its stack, and architectural model.
---

# Puzzle Slider

Puzzle Slider is a single-page sliding puzzle game built for modular growth, predictable state handling, and privacy-aware client-side persistence. The codebase is organized to keep the game logic, UI primitives, and route-level composition separated from one another.

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Zustand
- CSS Modules

## Architecture

The project uses Feature-Sliced Design (FSD) to keep the application scalable as new levels, features, and game modes are added. Each slice exposes a public API and avoids deep cross-slice imports.

:::note
The app uses the `@/` alias and public slice entry points, so most imports should come from a folder root such as `@/entities/gameSettings` or `@/features/puzzleBoard`.
:::

## What This Means in Practice

- Shared UI stays reusable and framework-agnostic.
- Domain state is split into focused stores instead of one global monolith.
- Privacy-sensitive persistence is centralized behind consent-aware helpers.
- Route pages remain thin and compose widgets rather than owning business logic.
