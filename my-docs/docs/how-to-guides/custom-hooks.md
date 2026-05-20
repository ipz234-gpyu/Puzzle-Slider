---
sidebar_position: 2
title: Using Shared Custom Hooks
description: How to consume the shared timer and image loading hooks.
---

# Using Shared Custom Hooks

The shared hook layer provides reusable client-side behavior that is used across the puzzle board and related widgets.

## `useTimer`

`useTimer` manages the game clock and returns a memoized `timer` object together with control methods.

```tsx
const { timer, start, pause, stop, reset } = useTimer();
```

### Return Value

The `timer` object exposes:

- `hours`
- `minutes`
- `seconds`
- `totalSeconds`
- `isRunning`
- `isPaused`

### Behavior

- `start()` begins a one-second interval if the timer is not already running.
- `pause()` stops the interval and marks the timer as paused.
- `stop()` clears the interval and leaves the timer paused.
- `reset()` clears the interval and restores the initial time.

The hook is safe to unmount because it clears the interval in its cleanup effect.

## `useImageLoader`

`useImageLoader` preloads the puzzle image, measures its dimensions, and returns an `aspectRatio` for layout calculations.

```tsx
const { isLoaded, width, height, aspectRatio } = useImageLoader(imageUrl);
```

### Parameters

- `imageUrl`: the asset URL that should be preloaded.

### Return Value

- `isLoaded`: `true` only after the image loads successfully.
- `width`: the natural image width.
- `height`: the natural image height.
- `aspectRatio`: the ratio used to size the puzzle board container.

### Usage Notes

:::warning
Do not render the puzzle canvas purely from the image URL. Wait for `isLoaded` so the board can use a real aspect ratio and avoid layout jumps.
:::

The hook is designed to fail safely. If the image cannot be loaded, it logs the error and keeps `isLoaded` false.
