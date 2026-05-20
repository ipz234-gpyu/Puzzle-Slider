[![License: Apache License 2.0](https://img.shields.io/badge/license-Apache%20License%202.0-blue)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)](https://vitejs.dev/)


# Puzzle Slider Game

A highly interactive, client-side sliding puzzle application where players rearrange image tiles into their correct configurations. Built with a cutting-edge frontend tech stack utilizing React 19, Vite, and TypeScript, structured strictly under Feature-Sliced Design (FSD) architectural principles.

## Table of Contents

* [About the Game](#about-the-game)
* [Key Features](#key-features)
* [Architecture](#architecture)
* [How to Play](#how-to-play)
* [Installation & Setup](#installation--setup)
* [Available Commands](#available-commands)
* [Documentation & UI](#documentation--ui)
* [Legal & Privacy](#legal--privacy)
* [License & Author](#license--author)

## About the Game

PuzzleSlider is a standalone, serverless single-page web application that executes entirely inside the user's browser runtime. It provides an optimized sliding block puzzle mechanism, relying on local calculations, modular state synchronization, and client-side browser storage initialization. The game offers varying levels of mathematical difficulty, advancing from basic configurations to enterprise-scale grid calculations.

## Key Features

* Progressive Grid Sizing: Scales dynamically from casual 3x3 layouts up to high-complexity 10x10 tile matrices.
* Performance and Metrics Analytics: Localized calculation loops track exact completion elapsed time and the precision count of state movements.
* Persistent State Progression: Secure local storage tracking hooks keep record tables and layer availability operational across independent user sessions.
* Sandbox Mode Framework: Achieved by completing grid tier requirements, unlocking unconstrained structural modifications.
* Responsive Viewport Execution: Native mobile and desktop adaptability utilizing modular CSS modules and view-state calculations.

## Architecture

The repository strictly adheres to **Feature-Sliced Design (FSD)**, ensuring clean segregation of business components, absolute predictability, and scalable extension capabilities:

```
src/
├── app/          # Application initialization, routing setups, and global providers
├── pages/        # Composition components building full application views
├── widgets/      # Self-contained, complex user interface blocks
├── features/     # Component actions containing localized business logic and mutations
├── entities/     # Domain business concepts, data structures, and state hooks
└── shared/       # Extensible components, utility drivers, and abstract assets

```

## How to Play

1. Identity Selection: Enter a unique player profile handle on the primary configuration dashboard.
2. Level Specification: Select a puzzle grid target from the list of structurally unlocked modules.
3. State Redistribution: Interact with tiles immediately adjacent to the coordinate anomaly (empty slot) to transform their matrix indexes.
4. Compilation Evaluation: Align all image coordinates into sequentially ordered subsets with maximum velocity and minimal move overhead.

## Installation & Setup

Ensure that Node.js (version 20.0 or higher) is installed on your local execution environment.

1. Clone the repository framework:
```bash
git clone https://github.com/ipz234-gpyu/puzzle-slider.git
cd puzzle-slider
```


2. Provision the required dependencies:
```bash
npm install
```


3. Deploy the application in local development mode:
```bash
npm run dev
```



## Available Commands

The workspace includes a comprehensive suite of script operations targeted at both the primary application core and the secondary decoupled documentation module:

### Core Project Commands

* `npm run dev` - Launches the Vite internal development runtime engine with hot-module replacement.
* `npm run build` - Initiates the TypeScript compiler architecture and builds highly optimized, tree-shaken static production assets.
* `npm run preview` - Runs a local static proxy web server to analyze and review the production distribution bundle.
* `npm run lint` - Validates strict syntax, stylistic constraints, and code quality configurations via ESLint.
* `npm run storybook` - Starts the isolated component workspace environment on port 6006.
* `npm run build-storybook` - Compiles the visual component layer documentation into a standalone static build asset.

### Documentation Module Commands

* `cd my-docs && npm run start` - Boots up the Docusaurus live documentation server.
* `cd my-docs && npm run build` - Compiles structural code architecture, design systems, and compliance guides into localized production pages.

## Documentation & UI

* Isolated UI Engineering: Core interactive components (Buttons, Toggles, Modals, Flex Containers) are strictly developed, documented, and stress-tested within a modern Storybook ecosystem to decouple presentation from core business mechanics.
* Technical System Documentation: Deep technical architecture outlines, state structures, and lifecycle explanations are maintained via Docusaurus and can be found under the `my-docs` subdirectory.

## Legal & Privacy

This application is built from the ground up to support strict client-side data sovereignty, ensuring zero remote storage footprint or data leakage points:

| Document Overview | Link |
| --- | --- |
| **Privacy Policy & GDPR Statement** | Full compliance specifications, localStorage inventories, and cookie-free state paradigms are explicitly mapped in [PRIVACY_POLICY.md](./PRIVACY_POLICY.md). |
| **Dependency Asset Licenses** | Total automated scanning breakdowns of sub-dependency licenses can be examined in [license-report.md](./license-checker/license-report.md). |

## License & Author

**Author:** Petro Hryb

**GitHub Organization Repository:** [ipz234-gpyu](https://github.com/ipz234-gpyu)

This software project is open source and distributed under the terms of the **Apache License 2.0**. Review the full legal architecture framework within the accompanying [LICENSE.md](./LICENSE.md) file.