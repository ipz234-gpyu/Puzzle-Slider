import {type GameSettings} from "../model/types";
const STORAGE_KEY = 'gameSettings';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const settingsApi = {
    getSettings: async (): Promise<GameSettings | null> => {
       await delay(200);
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    },

    saveSettings: async (settings: GameSettings): Promise<void> => {
        await delay(100);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
};