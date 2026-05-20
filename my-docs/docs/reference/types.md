---
sidebar_position: 1
title: TypeScript Types API
description: Quick reference for the core domain types.
---

# TypeScript Types API

The following types represent the current public shape of the main puzzle domain models.

```ts
export interface TileData {
  id: number;
  row: number;
  col: number;
  isEmpty?: boolean;
}

export interface PuzzleProgress {
  isSandbox: boolean;
  currentUnlocked: number;
  bestRecords: Record<number, {
    time: number;
    moves: number;
  }>;
}

export interface LevelConfig {
  id: number;
  title: string;
  imageUrl: string;
}
```

`TileData` is used by the puzzle board renderer, `PuzzleProgress` tracks unlocks and per-size best records, and `LevelConfig` describes the image-backed level catalog.
