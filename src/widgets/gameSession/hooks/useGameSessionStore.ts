import {create} from "zustand";

interface WinStats {
    moves: number;
    time: number;
}

interface GameSessionState {
    sessionId: number;
    winStats: WinStats | null;
    isWinModalOpen: boolean;

    handleWin: (stats: WinStats) => void;
    restartGame: () => void;
    setIsWinModalOpen: (open: boolean) => void;
}

export const useGameSessionStore = create<GameSessionState>((set) => ({
    sessionId: 0,
    winStats: null,
    isWinModalOpen: false,

    handleWin: (stats: WinStats) => {
        set({winStats: stats, isWinModalOpen: true});
    },

    restartGame: () => {
        set((state) => ({
            winStats: null,
            isWinModalOpen: false,
            sessionId: state.sessionId + 1,
        }));
    },

    setIsWinModalOpen: (open: boolean) => {
        set({isWinModalOpen: open});
    },
}));