import {create} from "zustand";
import {levelApi} from "../api/levelApi";
import {type LevelConfig} from "../model/levelData";

interface LevelState {
    levels: LevelConfig[];
    levelsLoading: boolean;
    levelById: Record<number, LevelConfig>;
    levelLoading: Record<number, boolean>;

    initLevels: () => Promise<void>;
    getLevelById: (id: number) => Promise<void>;
}

export const useLevelStore = create<LevelState>((set, get) => ({
    levels: [],
    levelsLoading: false,
    levelById: {},
    levelLoading: {},

    initLevels: async () => {
        set({levelsLoading: true});
        try {
            const data = await levelApi.getLevels();
            set({levels: data});
        } catch (e) {
            console.error(e);
        } finally {
            set({levelsLoading: false});
        }
    },

    getLevelById: async (id: number) => {
        if (get().levelById[id]) return;

        set((state) => ({levelLoading: {...state.levelLoading, [id]: true}}));
        try {
            const data = await levelApi.getLevelById(id);
            if (data) {
                set((state) => ({
                    levelById: {...state.levelById, [id]: data},
                    levelLoading: {...state.levelLoading, [id]: false}
                }));
            }
        } catch (e) {
            console.error(e);
            set((state) => ({levelLoading: {...state.levelLoading, [id]: false}}));
        }
    },
}));