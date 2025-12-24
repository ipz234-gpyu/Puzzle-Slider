import {type ProgressState, type PuzzleProgress, type BestRecord} from "./types";
import {MAX_STANDARD_LEVEL, SANDBOX_MODE_SIZE, START_SIZE} from "./constants";

export const calculateNextProgress = (
    currentProgress: ProgressState,
    levelId: string | number,
    completedSize: number,
    stats: { time: number; moves: number }
): ProgressState => {
    const currentPuzzle: PuzzleProgress = currentProgress[levelId] || {
        isSandbox: false,
        currentUnlocked: START_SIZE,
        bestRecords: {}
    };

    const currentBest = currentPuzzle.bestRecords[completedSize];
    const newBestRecords = {
        ...currentPuzzle.bestRecords,
        [completedSize]: {
            time: currentBest ? Math.min(stats.time, currentBest.time) : stats.time,
            moves: currentBest ? Math.min(stats.moves, currentBest.moves) : stats.moves
        }
    };

    let nextUnlocked = currentPuzzle.currentUnlocked;

    if (completedSize === currentPuzzle.currentUnlocked) {
        if (completedSize < MAX_STANDARD_LEVEL) {
            nextUnlocked = completedSize + 1;
        } else if (completedSize === MAX_STANDARD_LEVEL) {
            nextUnlocked = SANDBOX_MODE_SIZE;
        }
    }

    return {
        ...currentProgress,
        [levelId]: {
            isSandbox: nextUnlocked >= SANDBOX_MODE_SIZE,
            currentUnlocked: nextUnlocked,
            bestRecords: newBestRecords
        }
    };
};

export const isSandboxMode = (size: number) => size >= SANDBOX_MODE_SIZE;

export const getBestRecord = (
    progress: ProgressState,
    levelId: string | number,
    size: number
): BestRecord | null => {
    const puzzle = progress[levelId];
    if (!puzzle) return null;
    return puzzle.bestRecords[size] || null;
};

export const getAllBestRecords = (
    progress: ProgressState,
    levelId: string | number
): Record<number, BestRecord> => {
    const puzzle = progress[levelId];
    return puzzle?.bestRecords || {};
};