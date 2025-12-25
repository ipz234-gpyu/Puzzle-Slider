## 1. Розділення логіки через Custom Hooks
У проєкті багато невеликих, спеціалізованих хуків, які інкапсулюють повторювану логіку (таймери, завантаження зображень, бізнес-логіка сесії). Це полегшує тестування та повторне використання.
- **Таймер:** `useTimer` — [src/shared/lib/hooks/useTimer.ts](src/shared/lib/hooks/useTimer.ts)
- **Завантаження зображення:** `useImageLoader` — [src/shared/lib/hooks/useImageLoader.ts](src/shared/lib/hooks/useImageLoader.ts)
- **Витяг бізнес-логіки рівнів/сесії:** `useLevels`, `useGameSession` — [src/entities/levelCard/model/hooks.ts](src/entities/levelCard/model/hooks.ts), [src/widgets/gameSession/hooks/useGameSession.ts](src/widgets/gameSession/hooks/useGameSession.ts)

## 2. Модульні стори з Zustand і ініціалізація
Проєкт використовує невеликі, сфокусовані стори замість одного «God» стора; є патерн ініціалізації (StoreInitializer) для завантаження persisted даних при старті додатка.
- **Settings store (ініціалізація/синхронізація):** `useSettingsStore` — [src/entities/gameSettings/hooks/useSettingsStore.ts](src/entities/gameSettings/hooks/useSettingsStore.ts)
- **Стор сесії гри:** `useGameSessionStore` — [src/widgets/gameSession/hooks/useGameSessionStore.ts](src/widgets/gameSession/hooks/useGameSessionStore.ts)
- **Ініціалізатор стора:** `StoreInitializer` — [src/entities/gameSettings/ui/StoreInitializer.tsx](src/entities/gameSettings/ui/StoreInitializer.tsx)

## 3. Структуризація за FSD архітектурою
Код розділений на `entities`, `features`, `widgets`, `shared` тощо — це полегшує навігацію, інкапсуляцію і повторне використання. Для кожного модуля є файл-реекспорт (barrel) для чистого імпорту.
- **Barrel-експорт приклад:** [src/entities/levelCard/index.tsx](src/entities/levelCard/index.tsx)
- **Папкова організація:** див. структуру `src/entities`, `src/features`, `src/widgets` (в корені проєкту)

## 4. Повторно використовувані UI-примітиви та портали
Є добре інкапсульовані UI-компоненти (модалки, таймери, кнопки), які використовують портали та захищаються від сайд-ефектів (наприклад, блокування скролу при відкритті модалкі).
- **Modal (портал + управління body overflow):** `Modal` — [src/shared/ui/modal/ui/Modal.tsx](src/shared/ui/modal/ui/Modal.tsx)
- **Відображення таймера (реюзабельний UI):** `TimerDisplay` — [src/shared/ui/timer/ui/TimerDisplay.tsx](src/shared/ui/timer/ui/TimerDisplay.tsx)

## 5. Абстракція доступу до збереження/типізація (API + TypeScript types)
Збереження налаштувань/даних винесено у окремі API-модулі (локальне сховище обгорнуте у `settingsApi`), а моделі описані в `types` — це дозволяє чітко змінювати реалізацію збереження без впливу UI.
- **API для налаштувань:** `settingsApi` — [src/entities/gameSettings/api/settingsApi.ts](src/entities/gameSettings/api/settingsApi.ts)
- **Опис типів моделі:** `GameSettings` — [src/entities/gameSettings/model/types.ts](src/entities/gameSettings/model/types.ts)
