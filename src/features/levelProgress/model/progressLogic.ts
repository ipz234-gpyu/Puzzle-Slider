import {type ProgressState} from "./types";
import {MAX_TUTORIAL_SIZE, SANDBOX_MODE_SIZE, START_SIZE} from "./constants";

export const calculateNextProgress = (
    currentProgress: ProgressState,
    levelId: string | number,
    completedSize: number
): ProgressState => {
    const currentUnlocked = currentProgress[levelId] || START_SIZE;

    if (completedSize < currentUnlocked) {
        return currentProgress;
    }

    let nextSize = currentUnlocked;

    if (completedSize === currentUnlocked) {
        if (completedSize < MAX_TUTORIAL_SIZE) {
            nextSize = completedSize + 1;
        } else if (completedSize === MAX_TUTORIAL_SIZE) {
            nextSize = SANDBOX_MODE_SIZE;
        }
    }

    if (nextSize === currentUnlocked) {
        return currentProgress;
    }

    return {
        ...currentProgress,
        [levelId]: nextSize
    };
};

export const isSandboxMode = (size: number) => size >= SANDBOX_MODE_SIZE;