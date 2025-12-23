import {useState, useEffect} from "react";
import {type LevelConfig} from "../model/levelData";
import {levelApi} from "../api/levelApi";

export const useLevelById = (id?: string) => {
    const [level, setLevel] = useState<LevelConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);
        levelApi.getLevelById(Number(id))
            .then((data) => setLevel(data || null))
            .finally(() => setIsLoading(false));
    }, [id]);

    return {level, isLoading};
};