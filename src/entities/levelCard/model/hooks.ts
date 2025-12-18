import { useState, useEffect } from "react";
import { type LevelConfig } from "./levelData";
import { levelApi } from "../api/levelApi";

export const useLevels = () => {
    const [levels, setLevels] = useState<LevelConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        levelApi.getLevels()
            .then(setLevels)
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    return { levels, isLoading };
};

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

    return { level, isLoading };
};