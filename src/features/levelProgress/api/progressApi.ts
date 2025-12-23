import {type ProgressState} from "../model/types";

const STORAGE_KEY_PREFIX = 'puzzle_progress_';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const progressApi = {
    getProgress: async (playerName: string): Promise<ProgressState> => {
        await delay(300);
        const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${playerName}`);
        return raw ? JSON.parse(raw) : {};
    },

    saveProgress: async (playerName: string, progress: ProgressState): Promise<void> => {
        await delay(200);
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${playerName}`, JSON.stringify(progress));
    }
};