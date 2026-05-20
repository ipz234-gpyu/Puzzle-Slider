import {type ProgressState} from "../model/types";
import {useSettingsStore} from "@/entities/gameSettings";
import {isCategoryAllowed, readPersistedValue, writePersistedValue} from "@/shared/lib/storage/cookieConsent";

const STORAGE_KEY_PREFIX = 'puzzle_progress_';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getProgressStorageKey = (playerName: string) => `${STORAGE_KEY_PREFIX}${playerName}`;

const parseProgressState = (raw: string | undefined): ProgressState | null => {
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as ProgressState;
    } catch {
        return null;
    }
};

export const progressApi = {
    getProgress: async (playerName: string): Promise<ProgressState> => {
        await delay(300);

        const storageKey = getProgressStorageKey(playerName);

        if (isCategoryAllowed('puzzle_progress')) {
            const persisted = readPersistedValue<ProgressState | null>('puzzle_progress', storageKey, null);

            if (persisted) {
                return persisted;
            }
        }

        const cached = parseProgressState(useSettingsStore.getState().getCachedProgress(storageKey));

        return cached ?? {};
    },

    saveProgress: async (playerName: string, progress: ProgressState): Promise<void> => {
        await delay(200);

        const storageKey = getProgressStorageKey(playerName);

        useSettingsStore.getState().setCachedProgress(storageKey, JSON.stringify(progress));

        if (isCategoryAllowed('puzzle_progress')) {
            writePersistedValue('puzzle_progress', storageKey, progress);
        }
    }
};