import {useState, useEffect} from "react";
import styles from "./styles.module.css";
import {useGameSession} from "../hooks/useGameSession";

import type {LevelConfig} from "@/entities/levelCard";
import {ModalFormButton} from "@/features/modalForm";
import {PuzzleSettingForm, type FormData} from "@/features/puzzleSettingForm";
import {GameWinModal} from "@/features/gameWinModal";
import {PuzzleBoard} from "@/features/puzzleBoard";
import {useGameProgress} from "@/features/levelProgress";

interface GameSessionProps {
    level: LevelConfig;
}

export const GameSession = ({level}: GameSessionProps) => {
    const {getLevelStatus, onLevelComplete, isLoading} = useGameProgress();
    const {sessionId, winStats, isWinModalOpen, handleWin, restartGame} = useGameSession();
    const [playedSize, setPlayedSize] = useState<number | null>(null);
    const [showNumbers, setShowNumbers] = useState(true);
    const status = !isLoading ? getLevelStatus(level.id) : null;

    useEffect(() => {
        if (status && playedSize === null) {
            setPlayedSize(status.isSandbox ? 3 : status.currentSize);
        }
    }, [status, playedSize]);

    if (isLoading || playedSize === null || !status) {
        return <div className={styles.loading}>Loading...</div>;
    }

    const onGameWin = (stats: { moves: number; time: number }) => {
        onLevelComplete(level.id, playedSize, stats);
        handleWin(stats);
    };

    const handleRestartCurrent = () => {
        restartGame();
    };

    const handleGoToNext = () => {
        const freshStatus = getLevelStatus(level.id);

        if (freshStatus.isSandbox) {
            setPlayedSize(freshStatus.currentSize);
        } else {
            setPlayedSize(freshStatus.currentSize);
        }

        restartGame();
    };

    const handleApplySettings = (data: FormData) => {
        setPlayedSize(data.sizeCount);
        setShowNumbers(data.showNumbers);
        restartGame();
    };

    return (
        <div className={styles.container}>
            <PuzzleBoard
                key={`${level.id}-${playedSize}-${sessionId}`}
                imageUrl={level.imageUrl}
                gridSize={playedSize}
                isShowNumber={showNumbers}
                onWin={onGameWin}
            />

            {status.isSandbox && (
                <ModalFormButton
                    buttonText="Puzzle Settings"
                    modalTitle="Customize Puzzle"
                    renderForm={(onClose) => (
                        <PuzzleSettingForm
                            sizeCount={playedSize}
                            showNumbers={showNumbers}
                            onSubmit={(data) => {
                                handleApplySettings(data);
                                onClose();
                            }}
                        />
                    )}
                    className={styles.setting}
                />
            )}

            {winStats && (
                <GameWinModal
                    isOpen={isWinModalOpen}
                    onClose={handleRestartCurrent}
                    moves={winStats.moves}
                    time={winStats.time}
                    levelName={level.title}
                    gridSize={playedSize}
                    onRestart={handleRestartCurrent}
                    onNextLevel={handleGoToNext}
                />
            )}
        </div>
    );
};