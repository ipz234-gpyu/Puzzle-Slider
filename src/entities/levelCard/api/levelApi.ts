import type {LevelConfig} from "../model/levelData";

const imagesRecord = import.meta.glob('@/shared/assets/img/*.{png,jpg,jpeg}', {
    eager: true,
    as: 'url'
});

const MOCK_DB: LevelConfig[] = Object.entries(imagesRecord).map(([path, url], index) => {
    const fileName = path.split('/').pop()?.split('.')[0] || `Level ${index + 1}`;

    return {
        id: index + 1,
        title: fileName.charAt(0).toUpperCase() + fileName.slice(1),
        imageUrl: url,
    };
});

export const levelApi = {
    getLevels: async (): Promise<LevelConfig[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DB);
            }, 800);
        });
    },

    getLevelById: async (id: number): Promise<LevelConfig | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const level = MOCK_DB.find(l => l.id === id);
                resolve(level);
            }, 500);
        });
    }
};