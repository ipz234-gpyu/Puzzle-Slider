import {create} from "zustand";

import {progressApi} from "../api/progressApi";
import {calculateNextProgress} from "../model/progressLogic";
import {type ProgressState} from "../model/types";
import {START_SIZE} from "../model/constants";

interface ProgressStateStore {
    progress: ProgressState;
    isLoading: boolean;
    error: string | null;

    initProgress: (playerName: string) => Promise<void>;
    handleLevelComplete: (
        levelId: number,
        completedSize: number,
        stats: { time: number; moves: number },
        playerName: string
    ) => Promise<void>;

    getLevelStatus: (levelId: number) => {
        currentSize: number;
        isSandbox: boolean;
        bestRecords: Record<number, { time: number; moves: number }>;
    };
}

export const useProgressStore = create<ProgressStateStore>((set, get) => ({
    progress: {},
    isLoading: false,
    error: null,

    initProgress: async (playerName: string) => {
        set({isLoading: true, error: null});
        try {
            const data = await progressApi.getProgress(playerName);
            set({progress: data});
        } catch (e) {
            console.error(e);
            set({error: "Failed to load progress"});
        } finally {
            set({isLoading: false});
        }
    },

    handleLevelComplete: async (
        levelId: number,
        completedSize: number,
        stats: { time: number; moves: number },
        playerName: string
    ) => {
        const {progress} = get();
        const newProgress = calculateNextProgress(progress, levelId, completedSize, stats);

        if (newProgress === progress) return;

        set({progress: newProgress});

        try {
            await progressApi.saveProgress(playerName, newProgress);
        } catch (error) {
            console.error("Failed to save progress", error);
            set({error: "Failed to save progress"});
        }
    },

    getLevelStatus: (levelId: number) => {
        const {progress} = get();
        const puzzle = progress[levelId];

        if (!puzzle) {
            return {
                currentSize: START_SIZE,
                isSandbox: false,
                bestRecords: {}
            };
        }

        return {
            currentSize: puzzle.currentUnlocked,
            isSandbox: puzzle.isSandbox,
            bestRecords: puzzle.bestRecords
        };
    },
}));