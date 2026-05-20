---
sidebar_position: 1
title: Adding a New Level
description: How to extend the game by dropping a new image asset into the level directory.
---

# Adding a New Level

Puzzle Slider builds its level list from static image assets. The level API scans the shared asset directory at build time and turns each image into a `LevelConfig` entry.

```ts
const imagesRecord = import.meta.glob('@/shared/assets/img/*.{png,jpg,jpeg}', {
  eager: true,
  as: 'url',
});
```

## Steps

1. Add a new `.png`, `.jpg`, or `.jpeg` file to `src/shared/assets/img/`.
2. Use a readable file name, because that file name becomes the default level title.
3. Save the file and let Vite refresh the module graph.
4. Open the level list or the game screen and verify the new card appears.

## How It Works

`src/entities/levelCard/api/levelApi.ts` converts the glob result into a mock database:

- the file path becomes the source of the image URL,
- the list order becomes the generated numeric `id`,
- the file name becomes the display title.

That means there is no manual registry to maintain. Adding an image is enough for the level to appear in the application.

:::info
Because the IDs are generated from the glob order, changing file names or removing assets can renumber the list. If you need stable content IDs, introduce an explicit metadata layer before shipping content updates.
:::

## Validation Checklist

- The image loads in the level list.
- The puzzle board can render the asset without distortion.
- The title is readable and matches the intended level name.
- The image dimensions are appropriate for puzzle slicing.
