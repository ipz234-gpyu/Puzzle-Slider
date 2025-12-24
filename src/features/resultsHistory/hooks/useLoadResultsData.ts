import {useEffect, useMemo} from "react";
import {useShallow} from "zustand/react/shallow";

import {useGameSettings} from "@/entities/gameSettings";
import {useProgressStore} from "@/features/levelProgress";
import {useLevelStore} from "@/entities/levelCard/hooks/useLevelStore";

export const useLoadResultsData = () => {
	const {settings} = useGameSettings();
	const playerName = settings.playerName;

	const {progress, isLoading, initProgress} = useProgressStore(
		useShallow((s) => ({
			progress: s.progress,
			isLoading: s.isLoading,
			initProgress: s.initProgress,
		}))
	);

	const {levelById, levelLoading, getLevelById} = useLevelStore(
		useShallow((s) => ({
			levelById: s.levelById,
			levelLoading: s.levelLoading,
			getLevelById: s.getLevelById,
		}))
	);

	useEffect(() => {
		if (playerName) {
			initProgress(playerName);
		}
	}, [playerName, initProgress]);

	useEffect(() => {
		Object.keys(progress).map(Number).forEach((id) => {
			if (!levelById[id] && !levelLoading[id]) {
				getLevelById(id);
			}
		});
	}, [progress, levelById, levelLoading, getLevelById]);

	const levelIds = useMemo(() => Object.keys(progress).map(Number), [progress]);

	const allLevelsLoaded = levelIds.length === 0 || levelIds.every((id) => Boolean(levelById[id]));
	const someLevelLoading = levelIds.some((id) => Boolean(levelLoading[id]));

	const loading = isLoading || someLevelLoading;

	return {
		isLoading: loading,
		isReady: !loading && allLevelsLoaded,
	};
};