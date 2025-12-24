import {useMemo} from "react";
import {useShallow} from "zustand/react/shallow";

import {useProgressStore} from "@/features/levelProgress";
import {useLevelStore} from "@/entities/levelCard/hooks/useLevelStore";

export interface LevelResult {
    levelId: string;
    levelName: string;
    imageUrl: string;
    gridSize: number;
    time: number;
    moves: number;
}

export const useResultsHistory = () => {
    const {progress} = useProgressStore(
        useShallow((s) => ({
            progress: s.progress,
        }))
    );

    const {levelById} = useLevelStore(
        useShallow((s) => ({
            levelById: s.levelById,
        }))
    );

    const results = useMemo(() => {
        const list: LevelResult[] = [];

        Object.entries(progress).forEach(([levelId, puzzle]) => {
            const level = levelById[Number(levelId)];
            if (!puzzle) return;

            Object.entries(puzzle.bestRecords).forEach(([sizeStr, rec]) => {
                list.push({
                    levelId: String(levelId),
                    levelName: level ? level.title : `Level ${levelId}`,
                    imageUrl: level ? level.imageUrl : "",
                    gridSize: Number(sizeStr),
                    time: rec.time,
                    moves: rec.moves,
                });
            });
        });

        list.sort((a, b) => a.time - b.time);

        return list;
    }, [progress, levelById]);

    const getLevelResults = (levelId: string) => results.filter((r) => r.levelId === levelId);

    return {
        results,
        getLevelResults,
        hasResults: results.length > 0,
    };
};