import {useEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';
import {useLevelStore} from './useLevelStore';

export const useLevelById = (id?: string) => {
    const {levelById, levelLoading, getLevelById} = useLevelStore(
        useShallow((state) => ({
            levelById: state.levelById,
            levelLoading: state.levelLoading,
            getLevelById: state.getLevelById,
        }))
    );

    useEffect(() => {
        if (id && !levelById[Number(id)]) {
            getLevelById(Number(id));
        }
    }, [id, levelById, getLevelById]);

    const level = id ? levelById[Number(id)] || null : null;
    const isLoading = id ? levelLoading[Number(id)] || false : false;

    return {level, isLoading};
};