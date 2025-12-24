src/
├─app/
│  ├─entrypoint/
│  │  └─main.tsx
│  ├─providers/
│  │  └─index.tsx
│  ├─routes/
│  │  ├─appRouter.tsx
│  │  └─index.tsx
│  └─styles/
│     └─index.css
├─entities/
│  ├─gameSettings/
│  │  ├─index.ts
│  │  ├─api/
│  │  │  └─settingsApi.ts
│  │  ├─hooks/
│  │  │  ├─useGameSettings.ts
│  │  │  └─useSettingsStore.ts
│  │  ├─model/
│  │  │  ├─context.ts
│  │  │  └─types.ts
│  │  └─ui/
│  │     └─StoreInitializer.tsx
│  ├─gameStats/
│  │  ├─index.ts
│  │  └─ui/
│  │     ├─GameStats.tsx
│  │     └─styles.module.css
│  ├─levelCard/
│  │  ├─index.tsx
│  │  ├─api/
│  │  │  └─levelApi.ts
│  │  ├─hooks/
│  │  │  ├─useLevelById.ts
│  │  │  ├─useLevels.ts
│  │  │  └─useLevelStore.ts
│  │  ├─model/
│  │  │  ├─hooks.ts
│  │  │  └─levelData.ts
│  │  └─ui/
│  │     ├─LevelCard.tsx
│  │     └─styles.module.css
│  └─tile/
│     ├─index.ts
│     ├─model/
│     │  └─TileData.ts
│     └─ui/
│        ├─styles.module.css
│        └─Tile.tsx
├─features/
│  ├─configureGame/
│  │  ├─index.ts
│  │  └─ui/
│  │     ├─ConfigureGameForm.tsx
│  │     └─styles.module.css
│  ├─gameWinModal/
│  │  ├─index.ts
│  │  └─ui/
│  │     ├─GameWinModal.tsx
│  │     └─styles.module.css
│  ├─levelProgress/
│  │  ├─index.ts
│  │  ├─api/
│  │  │  └─progressApi.ts
│  │  ├─hooks/
│  │  │  ├─useGameProgress.ts
│  │  │  └─useProgressStore.ts
│  │  ├─model/
│  │  │  ├─constants.ts
│  │  │  ├─progressLogic.ts
│  │  │  └─types.ts
│  │  └─ui/
│  │     ├─LevelProgressActions.tsx
│  │     └─styles.module.css
│  ├─modalForm/
│  │  ├─index.ts
│  │  └─ui/
│  │     └─ModalFormButton.tsx
│  ├─puzzleBoard/
│  │  ├─index.ts
│  │  ├─hooks/
│  │  │  ├─usePuzzleBoard.tsx
│  │  │  └─usePuzzleBoardStore.ts
│  │  ├─model/
│  │  │  └─constants.ts
│  │  ├─ui/
│  │  │  ├─PuzzleBoard.tsx
│  │  │  └─styles.module.css
│  │  └─utils/
│  │     └─puzzleLogic.ts
│  ├─puzzleSettingForm/
│  │  ├─index.ts
│  │  └─ui/
│  │     ├─PuzzleSettingForm.tsx
│  │     └─styles.module.css
│  └─selectLevelSize/
│     ├─index.ts
│     └─ui/
│        └─SelectLevelSize.tsx
├─pages/
│  ├─game/
│  │  ├─index.tsx
│  │  └─ui/
│  │     ├─GamePage.tsx
│  │     └─styles.module.css
│  ├─main/
│  │  ├─index.tsx
│  │  └─ui/
│  │     └─MainPage.tsx
│  └─result/
│     ├─index.tsx
│     └─ui/
│        ├─ResultsPage.tsx
│        └─styles.module.css
├─shared/
│  ├─assets/
│  │  └─img/
│  ├─constants/
│  ├─lib/
│  │  └─hooks/
│  │     ├─index.ts
│  │     ├─useImageLoader.ts
│  │     └─useTimer.ts
│  └─ui/
│     ├─button/
│     │  ├─index.ts
│     │  ├─model/
│     │  └─ui/
│     ├─flex/
│     │  ├─index.ts
│     │  └─ui/
│     ├─input/
│     │  ├─index.ts
│     │  └─ui/
│     ├─modal/
│     │  ├─index.ts
│     │  └─ui/
│     ├─select/
│     │  ├─index.ts
│     │  └─ui/
│     ├─timer/
│     │  ├─index.ts
│     │  ├─model/
│     │  └─ui/
│     └─toggle/
│        ├─index.ts
│        └─ui/
└─widgets/
├─gameSession/
│  ├─index.ts
│  ├─hooks/
│  │  ├─useGameSession.ts
│  │  └─useGameSessionStore.ts
│  └─ui/
│     ├─GameSession.tsx
│     └─styles.module.css
├─header/
│  ├─index.ts
│  └─ui/
│     ├─Header.tsx
│     └─styles.module.css
└─levelList/
├─index.ts
└─ui/
├─LevelList.tsx
└─styles.module.css