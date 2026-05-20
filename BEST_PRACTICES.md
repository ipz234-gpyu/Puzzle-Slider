## 1. Розділення логіки через Custom Hooks
У проєкті багато невеликих, спеціалізованих хуків, які інкапсулюють повторювану логіку (таймери, завантаження зображень, бізнес-логіка сесії). Це полегшує тестування та повторне використання.
- **Таймер:** `useTimer` — [src/shared/lib/hooks/useTimer.ts](src/shared/lib/hooks/useTimer.ts)
- **Завантаження зображення:** `useImageLoader` — [src/shared/lib/hooks/useImageLoader.ts](src/shared/lib/hooks/useImageLoader.ts)
- **Витяг бізнес-логіки рівнів/сесії:** `useLevels`, `useGameSession` — [src/entities/levelCard/hooks/useLevels.ts](src/entities/levelCard/hooks/useLevels.ts), [src/widgets/gameSession/hooks/useGameSession.ts](src/widgets/gameSession/hooks/useGameSession.ts)

## 2. Модульні стори з Zustand і ініціалізація
Проєкт використовує невеликі, сфокусовані стори замість одного «God» стора; є патерн ініціалізації (StoreInitializer) для завантаження persisted даних при старті додатка.
- **Settings store (ініціалізація/синхронізація):** `useSettingsStore` — [src/entities/gameSettings/hooks/useSettingsStore.ts](src/entities/gameSettings/hooks/useSettingsStore.ts)
- **Стор сесії гри:** `useGameSessionStore` — [src/widgets/gameSession/hooks/useGameSessionStore.ts](src/widgets/gameSession/hooks/useGameSessionStore.ts)
- **Ініціалізатор стора:** `StoreInitializer` — [src/entities/gameSettings/ui/StoreInitializer.tsx](src/entities/gameSettings/ui/StoreInitializer.tsx)

## 3. Структуризація за FSD архітектурою
Код розділений на шари FSD: `shared`, `entities`, `features`, `widgets`, `pages`, `app`. Кожен шар має чітко визначену відповідальність:

### Шари FSD:
- **shared** — базові утиліти, UI-компоненти, типи, константи (не залежать від бізнес-логіки)
- **entities** — бізнес-сутності (Tile, Level, GameSettings, GameStats)
- **features** — користувацькі сценарії (PuzzleBoard, gameSession, levelProgress, configureGame)
- **widgets** — композитні блоки UI (GameSession, Header, LevelList, ResultsOverview)
- **pages** — сторінки додатку (MainPage, GamePage, ResultsPage)
- **app** — точка входу, провайдери, роутинг

### Публічні API (barrel exports):
- [src/shared/index.ts](src/shared/index.ts) — експорт lib, types
- [src/shared/ui/index.ts](src/shared/ui/index.ts) — UI компоненти
- [src/entities/index.ts](src/entities/index.ts) — всі entities
- [src/features/index.ts](src/features/index.ts) — всі features
- [src/widgets/index.ts](src/widgets/index.ts) — всі widgets
- [src/pages/index.ts](src/pages/index.ts) — всі pages

## 4. Повторно використовувані UI-примітиви та портали
Є добре інкапсульовані UI-компоненти (модалки, таймери, кнопки), які використовують портали та захищаються від сайд-ефектів (наприклад, блокування скролу при відкритті модалки).
- **Modal (портал + управління body overflow):** `Modal` — [src/shared/ui/modal/ui/Modal.tsx](src/shared/ui/modal/ui/Modal.tsx)
- **Відображення таймера (реюзабельний UI):** `TimerDisplay` — [src/shared/ui/timer/ui/TimerDisplay.tsx](src/shared/ui/timer/ui/TimerDisplay.tsx)

## 5. Абстракція доступу до збереження/типізація (API + TypeScript types)
Збереження налаштувань/даних винесено у окремі API-модулі (локальне сховище обгорнуте у `settingsApi`, `progressApi`), а моделі описані в `types` — це дозволяє чітко змінювати реалізацію збереження без впливу UI.
- **API для налаштувань:** `settingsApi` — [src/entities/gameSettings/api/settingsApi.ts](src/entities/gameSettings/api/settingsApi.ts)
- **API для прогресу:** `progressApi` — [src/features/levelProgress/api/progressApi.ts](src/features/levelProgress/api/progressApi.ts)
- **Опис типів моделі:** `GameSettings` — [src/entities/gameSettings/model/types.ts](src/entities/gameSettings/model/types.ts)
- **Спільні типи:** `TileData` — [src/shared/types/tile.ts](src/shared/types/tile.ts)

## 6. Puzzle логіка у shared/lib
Вся логіка пазла (перевірка вирішуваності, генерація сітки, перевірка виграшу) винесена у `shared/lib/puzzle` для повторного використання.
- **Puzzle логіка:** [src/shared/lib/puzzle/puzzleLogic.ts](src/shared/lib/puzzle/puzzleLogic.ts)
- **Константи розміру сітки:** [src/shared/lib/puzzle/constants.ts](src/shared/lib/puzzle/constants.ts)
