import {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {useProgressStore} from "./useProgressStore";

import {useGameSettings} from "@/entities/gameSettings";

export const useGameProgress = () => {
    const {settings} = useGameSettings();
    const playerName = settings.playerName;
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
        if (playerName) {
            initProgress(playerName);
        }
    }, [playerName, initProgress]);

    const onLevelComplete = (
        levelId: number,
        completedSize: number,
        stats: { time: number; moves: number }
    ) => {
        if (!playerName) return;
        handleLevelComplete(levelId, completedSize, stats, settings.playerName);
    };

    return {
        progress,
        isLoading,
        error,
        onLevelComplete,
        getLevelStatus,
    };
};