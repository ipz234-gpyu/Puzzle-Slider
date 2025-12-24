export type LevelId = string | number;

export interface BestRecord {
    time: number;
    moves: number;
}

export interface PuzzleProgress {
    isSandbox: boolean;
    currentUnlocked: number;
    bestRecords: Record<number, BestRecord>;
}

export type ProgressState = Record<LevelId, PuzzleProgress>;