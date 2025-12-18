import React, {useEffect, useState} from "react";
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
}

export const PuzzleBoard: React.FC<GameBoardProps> = ({imageUrl, gridSize = 4}) => {
    const isValid = isGridSizeValid(gridSize);

    const {tiles, moveTile, shuffle, isWon, moveCount} = usePuzzleBoard(isValid ? gridSize : 4);
    const {isLoaded, aspectRatio} = useImageLoader(imageUrl);
    const [isShuffling, setIsShuffling] = useState(false);
    const {timer, start, stop, reset} = useTimer();

    useEffect(() => {
        if (isLoaded && !isWon)
            start();
    }, [isLoaded, isWon, start]);

    useEffect(() => {
        if (isWon)
            stop();
    }, [isWon, start, stop]);

    const handleShuffle = () => {
        setIsShuffling(true);
        reset();
        shuffle();
        setTimeout(() => setIsShuffling(false), 50);
        start();
    };

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
                            isIdVisible={true}
                            gridSize={gridSize}
                            imageUrl={imageUrl}
                            onClick={moveTile}
                        />
                    </div>
                ))}
            </div>
            <Flex justify="center" align="center" style={{marginTop: "1rem"}}>
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