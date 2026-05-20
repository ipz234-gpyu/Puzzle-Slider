---
sidebar_position: 2
title: Theme and Design System Customization
description: How to customize the global visual system through CSS variables.
---

# Theme and Design System Customization

Puzzle Slider centralizes its visual system in `src/app/styles/index.css`. That file defines the global palette, spacing scale, radii, stacking layers, shadows, and motion tokens used by the app.

:::info
Treat `:root` as the single source of truth. If you want an alternate color theme, override the CSS variables there or on a top-level theme wrapper and let the components inherit the result.
:::

## Key Custom Properties

| Group | Tokens | Purpose |
| --- | --- | --- |
| Brand | `--rgb-primary`, `--color-primary-main`, `--color-primary-hover`, `--color-primary-content`, `--color-primary-light`, `--color-primary-dark` | Accent color system and contrast text |
| Surfaces | `--color-surface-base`, `--color-surface-card`, `--color-surface-card-hover`, `--color-surface-overlay` | Backgrounds, cards, hover states, and overlays |
| Text | `--color-text-main`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse` | Typographic contrast across dark and light surfaces |
| Borders | `--color-border-subtle`, `--color-border-focus` | Component boundaries and focus states |
| Spacing | `--space-1` through `--space-8`, `--page-padding`, `--card-gap` | Layout rhythm and page spacing |
| Radii | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`, `--radius-board`, `--border-radius-lg`, `--border-radius-full` | Corner treatment for controls, cards, and the board |
| Layers | `--z-sticky`, `--z-dropdown`, `--z-modal` | Stacking order for overlays and popups |
| Motion | `--transition-fast`, `--transition-smooth` | Interaction timing |
| Elevation | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-card`, `--focus-ring` | Depth, emphasis, and keyboard focus |
| Layout Sizing | `--board-border-width`, `--modal-max-width`, `--btn-padding-sm`, `--btn-padding-md`, `--btn-padding-lg` | Board framing and component sizing |

## Example Theme Override

```css
:root[data-theme='midnight'] {
  --rgb-primary: 96, 165, 250;
  --color-primary-main: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-primary-content: #0f172a;

  --color-surface-base: #0f172a;
  --color-surface-card: #111827;
  --color-surface-card-hover: #1f2937;
  --color-text-main: rgba(255, 255, 255, 0.92);
  --color-text-secondary: #cbd5e1;
  --color-border-subtle: rgba(255, 255, 255, 0.12);
}
```

## Practical Guidance

- Keep `--color-text-main` and the surface tokens in sync to preserve contrast.
- Update `color-scheme` if you switch from a dark-first to a light-first design.
- Reuse the existing spacing and radius tokens before introducing new values.
- Keep `--z-modal` higher than every other overlay layer so dialogs stay accessible.
