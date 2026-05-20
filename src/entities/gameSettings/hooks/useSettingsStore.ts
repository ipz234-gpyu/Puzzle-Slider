import {create} from "zustand";
import {type GameSettings, DEFAULT_SETTINGS} from "../model/types";
import {settingsApi} from "../api/settingsApi";

interface SettingsState {
    settings: GameSettings;
    isLoading: boolean;
    error: string | null;
    cachedProgressByPlayer: Record<string, string>;

    initSettings: () => Promise<void>;
    updateSettings: (newSettings: GameSettings) => Promise<void>;
    setCachedProgress: (playerName: string, progress: string) => void;
    getCachedProgress: (playerName: string) => string | undefined;
    clearCachedProgress: (playerName: string) => void;
}

export const useSettingsStore = create<SettingsState>()((set, get) => ({
    settings: DEFAULT_SETTINGS,
    isLoading: false,
    error: null,
    cachedProgressByPlayer: {},

    initSettings: async () => {
        set({isLoading: true, error: null});
        try {
            const data = await settingsApi.getSettings();
            if (data) {
                set({settings: data});
            }
        } catch (e) {
            console.error(e);
            set({error: "Failed to load settings"});
        } finally {
            set({isLoading: false});
        }
    },

    updateSettings: async (newSettings: GameSettings) => {
        set({settings: newSettings});

        try {
            await settingsApi.saveSettings(newSettings);
        } catch (e) {
            console.error("Sync error:", e);
            set({error: "Failed to save settings"});
        }
    },

    setCachedProgress: (playerName: string, progress: string) => {
        set((state) => ({
            cachedProgressByPlayer: {
                ...state.cachedProgressByPlayer,
                [playerName]: progress,
            },
        }));
    },

    getCachedProgress: (playerName: string): string | undefined => get().cachedProgressByPlayer[playerName],

    clearCachedProgress: (playerName: string) => {
        set((state) => {
            const nextCache = {...state.cachedProgressByPlayer};
            delete nextCache[playerName];

            return {cachedProgressByPlayer: nextCache};
        });
    },
}));