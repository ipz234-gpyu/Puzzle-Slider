import {create} from "zustand";
import {type GameSettings, DEFAULT_SETTINGS} from "../model/types";
import {settingsApi} from "../api/settingsApi";

interface SettingsState {
    settings: GameSettings;
    isLoading: boolean;
    error: string | null;

    initSettings: () => Promise<void>;
    updateSettings: (newSettings: GameSettings) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: DEFAULT_SETTINGS,
    isLoading: false,
    error: null,

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
}));