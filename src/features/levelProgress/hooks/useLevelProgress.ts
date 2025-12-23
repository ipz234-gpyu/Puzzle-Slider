import {useState} from "react";
import {MAX_STANDARD_LEVEL} from "../model/constants";

import {useGameSettings} from "@/entities/gameSettings";

type ProgressState = Record<string, number>;

const STORAGE_KEY = "puzzle_progress";

export const useLevelProgress = () => {
    const {settings} = useGameSettings();
    const [progress, setProgress] = useState<ProgressState>(() => {
        const saved = localStorage.getItem(settings.playerName || STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    const saveProgress = (newProgress: ProgressState) => {
        localStorage.setItem(settings.playerName || STORAGE_KEY, JSON.stringify(newProgress));
        setProgress(newProgress);
    };

    const getUnlockedSize = (levelId: number) => {
        return progress[String(levelId)] || 3;
    };

    const completeLevel = (levelId: number, currentSize: number) => {
        const currentMax = getUnlockedSize(levelId);

        if (currentSize === currentMax && currentSize < MAX_STANDARD_LEVEL) {
            const nextSize = currentSize + 1;
            saveProgress({...progress, [levelId]: nextSize});
            return nextSize;
        }

        if (currentSize === 5) {
            saveProgress({...progress, [levelId]: 10});
        }
    };

    const isSandboxUnlocked = (levelId: number) => {
        return getUnlockedSize(levelId) >= 10;
    }

    return {getUnlockedSize, completeLevel, isSandboxUnlocked};
};