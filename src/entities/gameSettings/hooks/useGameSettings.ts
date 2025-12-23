import {useState, useEffect, useCallback} from "react";
import {type GameSettings, DEFAULT_SETTINGS} from "../model/types";
import {settingsApi} from "../api/settingsApi";

export const useGameSettings = () => {
    const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const data = await settingsApi.getSettings();
                if (data) setSettings(data);
            } catch (e) {
                setError('Failed to load settings');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const updateSettings = useCallback(async (newSettings: GameSettings) => {
        setSettings(newSettings);
        try {
            await settingsApi.saveSettings(newSettings);
        } catch (e) {
            console.error("Sync error:", e);
            setError('Failed to save settings');
        }
    }, []);

    return {
        settings,
        isLoading,
        error,
        updateSettings
    };
};