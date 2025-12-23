import {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";

import {useProgressStore} from "./useProgressStore";
import {useGameSettings} from "@/entities/gameSettings";

export const useGameProgress = () => {
    const {settings} = useGameSettings();
    const {progress, isLoading, error, initProgress, handleLevelComplete, getLevelStatus} = useProgressStore(
        useShallow((state) => ({
            progress: state.progress,
            isLoading: state.isLoading,
            error: state.error,
            initProgress: state.initProgress,
            handleLevelComplete: state.handleLevelComplete,
            getLevelStatus: state.getLevelStatus,
        }))
    );

    useEffect(() => {
        if (settings.playerName) {
            initProgress(settings.playerName);
        }
    }, [settings.playerName, initProgress]);

    const onLevelComplete = (levelId: number, completedSize: number) => {
        handleLevelComplete(levelId, completedSize, settings.playerName);
    };

    return {
        progress,
        isLoading,
        error,
        onLevelComplete,
        getLevelStatus,
    };
};