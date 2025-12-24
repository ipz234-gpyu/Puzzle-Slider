import React, {useEffect, useState, useCallback} from "react";
import styles from "./styles.module.css";

import {useImageLoader} from "@/shared/lib/hooks";
import {useTimer} from "@/shared/lib/hooks";
import {usePuzzleBoard, isGridSizeValid, MIN_GRID_SIZE, MAX_GRID_SIZE} from "@/features/puzzleBoard";

import {Button} from "@/shared/ui/button";
import {Flex} from "@/shared/ui/flex";
import {Tile} from "@/entities/tile";
import {GameStats} from "@/entities/gameStats";

interface GameBoardProps {
    imageUrl: string;
    gridSize?: number;
    onWin?: (stats: { moves: number, time: number }) => void;
    isShowNumber: boolean;
}

export const PuzzleBoard: React.FC<GameBoardProps> = ({imageUrl, onWin, gridSize = 4, isShowNumber = true}) => {
    const isValid = isGridSizeValid(gridSize);

    const {tiles, moveTile, shuffle, isWon, moveCount} = usePuzzleBoard(isValid ? gridSize : 4);
    const {isLoaded, aspectRatio} = useImageLoader(imageUrl);
    const [isShuffling, setIsShuffling] = useState(false);
    const {timer, start, stop, reset} = useTimer();

    const handleShuffle = useCallback(() => {
        setIsShuffling(true);
        reset();
        shuffle();
        setTimeout(() => setIsShuffling(false), 50);
        start();
    }, [reset, shuffle, start]);

    useEffect(() => {
        if (isLoaded && !isWon) {
            handleShuffle();
        }
    }, [isLoaded, isWon, handleShuffle]);

    useEffect(() => {
        if (isWon) {
            stop();
            if (onWin) {
                const timeoutId = setTimeout(() => {
                    onWin({moves: moveCount, time: timer.totalSeconds});
                }, 1500);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [isWon, stop, onWin, moveCount, timer.totalSeconds]);

    if (!isValid) return (
        <div className={styles.error}>
            Invalid grid size (must be {MIN_GRID_SIZE}-{MAX_GRID_SIZE})
        </div>
    );

    if (!isLoaded) return <div className={styles.loader}>Loading...</div>;

    const tileSize = 100 / gridSize;

    return (
        <div>
            <GameStats
                moveCount={moveCount}
                timer={timer}
            />
            <div className={styles.gameBoard} style={{aspectRatio: `${aspectRatio}`,}}>
                <img src={imageUrl}
                     alt="Solved Puzzle"
                     className={`${styles.overlayImage} ${isWon ? styles.visible : ''}`}/>
                {tiles.map((tile) => (
                    <div
                        key={tile.id}
                        className={`${styles.tileWrapper} ${isShuffling ? styles.noTransition : ""}`}
                        style={{
                            width: `${tileSize}%`,
                            height: `${tileSize}%`,
                            transform: `translate(${tile.col * 100}%, ${tile.row * 100}%)`,
                        }}
                    >
                        <Tile
                            id={tile.id}
                            isEmpty={tile.isEmpty}
                            isIdVisible={isShowNumber}
                            gridSize={gridSize}
                            imageUrl={imageUrl}
                            onClick={moveTile}
                        />
                    </div>
                ))}
            </div>
            <Flex justify="center" align="center">
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleShuffle}
                    disabled={isShuffling}
                >
                    {isShuffling ? "Shuffling..." : "Shuffle"}
                </Button>
            </Flex>
        </div>
    );
};