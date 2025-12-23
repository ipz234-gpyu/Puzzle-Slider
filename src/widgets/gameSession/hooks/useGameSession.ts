import {useState} from "react";

interface WinStats {
    moves: number;
    time: number;
}

export const useGameSession = () => {
    const [sessionId, setSessionId] = useState(0);

    const [winStats, setWinStats] = useState<WinStats | null>(null);
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);

    const handleWin = (stats: WinStats) => {
        setWinStats(stats);
        setIsWinModalOpen(true);
    };

    const restartGame = () => {
        setWinStats(null);
        setIsWinModalOpen(false);
        setSessionId((prev) => prev + 1);
    };

    return {
        sessionId,
        winStats,
        isWinModalOpen,
        setIsWinModalOpen,
        handleWin,
        restartGame,
    };
};