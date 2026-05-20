---
sidebar_position: 2
title: Modular Zustand Stores
description: How the application splits state into focused domain stores.
---

# Modular Zustand Stores

Puzzle Slider splits state into small domain stores instead of using one global store. That choice keeps selectors narrow, reduces unnecessary rerenders, and makes consent-aware persistence easier to control.

## Store Map

| Store | Responsibility |
| --- | --- |
| `useSettingsStore` | Player settings, loading state, errors, and the in-memory `cachedProgressByPlayer` fallback |
| `usePuzzleBoardStore` | Tile positions, move count, win state, shuffle, and reset behavior |
| `useProgressStore` | Unlocked sizes, best records, progress loading, and progress persistence |
| `useGameSessionStore` | Session identifier, win statistics, and win modal visibility |

## Why the State Is Split

- Different domains change at different rates.
- Board interactions should not rerender settings consumers.
- Consent logic affects persistence, not puzzle movement.
- Session state is transient and should not be mixed with long-lived progress data.
- Smaller stores are easier to test and reason about independently.

The hooks in this project often use shallow selectors so components subscribe only to the fields they actually need.

## Root Initialization

The application mounts `StoreInitializer` at the root inside `AppProvider`.

```tsx
<AppProvider>
  <StoreInitializer />
  <CookieConsentPopup />
  {children}
</AppProvider>
```

`StoreInitializer` is intentionally side-effect only. On mount it calls `initSettings()`, which hydrates the current player settings before route-level widgets start reading them.

:::note
Progress hydration is intentionally lazy. Hooks such as `useGameProgress` and `useLoadResultsData` call `initProgress(playerName)` only after the player name is available, which keeps the startup path small and predictable.
:::

## Store Responsibilities in Practice

`useSettingsStore` is the best example of domain-focused state. It persists player settings when consent allows it, but it also keeps `cachedProgressByPlayer` in memory so non-consenting sessions can continue to play without writing to disk.

`useProgressStore` owns the unlock and record logic. It loads progress through the consent-aware progress API, calculates the next unlocked board size, and records best times and moves per level.

`usePuzzleBoardStore` is entirely board-centric: it manages tile coordinates, validates adjacent moves, reshuffles the board, and detects wins.

`useGameSessionStore` is the transient session layer. It tracks the current session ID and win modal state without crossing into persistence concerns.
