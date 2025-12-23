import {useState, useEffect} from "react";
import {type LevelConfig} from "../model/levelData";
import {levelApi} from "../api/levelApi";

export const useLevels = () => {
    const [levels, setLevels] = useState<LevelConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        levelApi.getLevels()
            .then(setLevels)
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    return {levels, isLoading};
};