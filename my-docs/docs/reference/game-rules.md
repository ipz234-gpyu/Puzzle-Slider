---
sidebar_position: 2
title: Technical Constants and Mathematical Solvability
description: Board-size limits, unlock rules, and solvability checks.
---

# Technical Constants and Mathematical Solvability

The game enforces a small set of technical constraints so puzzle generation stays valid and the progression model remains predictable.

## Board Size Limits

| Constant | Value | Meaning |
| --- | --- | --- |
| `MIN_GRID_SIZE` | `2` | Smallest valid board size accepted by the puzzle board |
| `START_SIZE` | `3` | Default progression size for a new player |
| `SANDBOX_MODE_SIZE` | `5` | Completing this size unlocks sandbox mode |
| `MAX_STANDARD_LEVEL` | `10` | Highest standard progression size |
| `MAX_GRID_SIZE` | `10` | Largest valid board size accepted by the puzzle board |

The board validator accepts sizes from 2×2 through 10×10. Standard progression starts at 3×3, and sandbox mode becomes available after completing a 5×5 board.

## Solvability Check

The puzzle generator uses an inversion-counting helper named `isSolvable` to avoid impossible layouts.

```ts
export const isSolvable = (ids: number[]): boolean => {
  let inversions = 0;
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      if (ids[i] > ids[j]) inversions++;
    }
  }

  return inversions % 2 === 0;
};
```

## Generation Flow

1. Build an ordered list of numbered tiles.
2. Shuffle the list with Fisher-Yates.
3. Count inversions and normalize parity when needed.
4. Map the IDs into `TileData` coordinates.
5. Place the empty tile in the bottom-right cell.
6. Reject any board that accidentally ends up solved.

:::warning
If you change blank-tile placement or grid-parity rules, revisit the solvability helper together with the generator. The current implementation assumes a fixed empty tile in the last position.
:::

## Why This Matters

The solvability check keeps the app from rendering mathematically impossible states. That protects the player experience and avoids edge cases where a generated board could never be completed.
