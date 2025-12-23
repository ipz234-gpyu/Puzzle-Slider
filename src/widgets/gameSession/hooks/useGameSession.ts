import {useShallow} from "zustand/react/shallow";
import {useGameSessionStore} from "./useGameSessionStore";

export const useGameSession = () => {
    return useGameSessionStore(
        useShallow((state) => ({
            sessionId: state.sessionId,
            winStats: state.winStats,
            isWinModalOpen: state.isWinModalOpen,
            setIsWinModalOpen: state.setIsWinModalOpen,
            handleWin: state.handleWin,
            restartGame: state.restartGame,
        }))
    );
};