import {useState, useEffect, useCallback} from "react";
import {progressApi} from "../api/progressApi";
import {calculateNextProgress, isSandboxMode} from "../model/progressLogic";
import {type ProgressState} from "../model/types";
import {START_SIZE} from "../model/constants";

import {useGameSettings} from "@/entities/gameSettings";

export const useGameProgress = () => {
    const {settings} = useGameSettings();
    const [progress, setProgress] = useState<ProgressState>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!settings.playerName) return;

        let mounted = true;
        setIsLoading(true);

        progressApi.getProgress(settings.playerName)
            .then(data => {
                if (mounted) setProgress(data);
            })
            .catch(console.error)
            .finally(() => {
                if (mounted) setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [settings.playerName]);

    const handleLevelComplete = useCallback(async (levelId: number, completedSize: number) => {
        const newProgress = calculateNextProgress(progress, levelId, completedSize);

        if (newProgress === progress) return;

        setProgress(newProgress);

        try {
            await progressApi.saveProgress(settings.playerName, newProgress);
        } catch (error) {
            console.error("Failed to save progress", error);
        }
    }, [progress, settings.playerName]);

    const getLevelStatus = useCallback((levelId: number) => {
        const size = progress[levelId] || START_SIZE;
        return {
            currentSize: size,
            isSandbox: isSandboxMode(size),
        };
    }, [progress]);

    return {
        progress,
        isLoading,
        onLevelComplete: handleLevelComplete,
        getLevelStatus
    };
};