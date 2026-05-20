import {type GameSettings} from "../model/types";
import {readPersistedValue, writePersistedValue} from "@/shared/lib/storage/cookieConsent";

const STORAGE_KEY = 'gameSettings';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const settingsApi = {
    getSettings: async (): Promise<GameSettings | null> => {
        await delay(200);

        return readPersistedValue('gameSettings', STORAGE_KEY, null);
    },

    saveSettings: async (settings: GameSettings): Promise<void> => {
        await delay(100);

        writePersistedValue('gameSettings', STORAGE_KEY, settings);
    }
};