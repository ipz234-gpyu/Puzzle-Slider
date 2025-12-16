import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";

import {useImageLoader} from "@/shared/lib/hooks";
import {useTimer} from "@/shared/lib/hooks";
import {usePuzzleBoard} from "@/features/puzzleBoard";

import {Button} from "@/shared/ui/button";
import {TimerDisplay} from "@/shared/ui/timer";
import {Tile} from "@/entities/tile";

interface GameBoardProps {
    imageUrl: string;
    gridSize?: number;
}

export const PuzzleBoard: React.FC<GameBoardProps> = ({imageUrl, gridSize = 2}) => {
    const {tiles, moveTile, shuffle, isWon} = usePuzzleBoard(gridSize);
    const {isLoaded, aspectRatio} = useImageLoader(imageUrl);
    const [isShuffling, setIsShuffling] = useState(false);
    const { timer, start, stop, reset } = useTimer();

    useEffect(() => {
        start();
        if (isWon) {
            stop();
        }
    }, [isWon, start, stop]);

    const handleShuffle = () => {
        setIsShuffling(true);
        reset();
        shuffle();
        start();
        setTimeout(() => setIsShuffling(false), 50);
    };

    if (!isLoaded) return <div className={styles.loader}>Loading...</div>;

    const tileSize = 100 / gridSize;

    return (
        <div>
            <div>{isWon ? "You won!" : ""}</div>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: 8}}>
                <div>
                    <TimerDisplay timer={timer} />
                </div>
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleShuffle}
                    disabled={isShuffling}
                >
                    {isShuffling ? "Shuffling..." : "Shuffle"}
                </Button>
            </div>
            <div
                className={styles.gameBoard}
                style={{
                    aspectRatio: `${aspectRatio}`,
                }}
            >
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
                            key={tile.id}
                            data={tile}
                            gridSize={gridSize}
                            imageUrl={imageUrl}
                            onClick={moveTile}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};