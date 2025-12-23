import {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {useLevelStore} from "./useLevelStore";

export const useLevels = () => {
    const {levels, levelsLoading, initLevels} = useLevelStore(
        useShallow((state) => ({
            levels: state.levels,
            levelsLoading: state.levelsLoading,
            initLevels: state.initLevels,
        }))
    );

    useEffect(() => {
        if (levels.length === 0) {
            initLevels();
        }
    }, [levels.length, initLevels]);

    return {levels, isLoading: levelsLoading};
};