---
sidebar_position: 3
title: Client-Side Privacy and Data Persistence
description: How consent controls local persistence and in-memory fallback behavior.
---

# Client-Side Privacy and Data Persistence

Puzzle Slider uses consent-aware client-side storage rather than server persistence. The storage helpers live in `src/shared/lib/storage/cookieConsent.ts` and gate each data category independently.

:::note
Despite the helper name, the implementation uses `localStorage` only. No HTTP cookies, `sessionStorage`, or external sync service are involved.
:::

## Consent Flow

1. The cookie consent widget collects preferences for each storage category.
2. `applyCookieConsent` normalizes the preferences and stores them under `cookie_consent_settings`.
3. `readPersistedValue` and `writePersistedValue` check whether a category is allowed before reading or writing.
4. `clearStoredCategoryData` removes protected data when consent is revoked.
5. Domain APIs use the helpers instead of talking to `localStorage` directly.

## Storage Categories

| Category | Purpose | Storage Key Pattern |
| --- | --- | --- |
| `gameSettings` | Player profile and related settings | `gameSettings` |
| `puzzle_progress` | Unlocked sizes and best records | `puzzle_progress_<playerName>` |

## Fallback Behavior

When the user denies `puzzle_progress` consent, the application degrades to an in-memory only mode.

```ts
if (isCategoryAllowed('puzzle_progress')) {
  return readPersistedValue('puzzle_progress', storageKey, null);
}

const cached = parseProgressState(useSettingsStore.getState().getCachedProgress(storageKey));
return cached ?? {};
```

The latest progress is mirrored into `cachedProgressByPlayer` inside `useSettingsStore`, so the current session still behaves correctly. That cache is runtime-only and is lost on refresh.

:::warning
Only the consent decision itself is persisted unconditionally. The protected payloads are written to disk only when the user has explicitly allowed the relevant category.
:::

## Practical Consequences

- Consenting users get persistent game settings and progress.
- Non-consenting users can still play normally within the session.
- Revoking consent removes stored category data.
- The app keeps privacy logic in one place instead of scattering checks across UI components.
