---
sidebar_position: 1
title: Installation and Deployment
description: How to install, run, and build Puzzle Slider locally.
---

# Installation and Deployment

## Requirements

:::warning
Use Node.js 20.19 or a newer supported LTS release. Vite 7 expects a modern Node runtime, and older versions can fail during dependency installation or production builds.
:::

React 19 does not require a special runtime beyond a compatible browser, but the local toolchain should match the Node.js version recommended by Vite.

## Setup

1. Clone the repository.

   ```bash
   git clone <repository-url>
   cd PuzzleSlider
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the development server.

   ```bash
   npm run dev
   ```

4. Create a production build.

   ```bash
   npm run build
   ```

5. Optionally verify the production bundle locally.

   ```bash
   npm run preview
   ```

:::info
The build pipeline is intentionally lightweight: TypeScript compiles first, then Vite emits the optimized browser bundle.
:::
