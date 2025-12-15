import React, {useState} from "react";
import {Tile} from "@/entities/tile";
import {usePuzzleBoard} from "@/features/puzzleBoard";
import styles from "./styles.module.css";
import {useImageLoader} from "@/shared/lib/hooks";

interface GameBoardProps {
    imageUrl: string;
    gridSize?: number;
}

export const PuzzleBoard: React.FC<GameBoardProps> = ({imageUrl, gridSize = 2}) => {
    const {tiles, moveTile, shuffle, isWon} = usePuzzleBoard(gridSize);
    const {isLoaded, aspectRatio} = useImageLoader(imageUrl);
    const [isShuffling, setIsShuffling] = useState(false);

    const handleShuffle = () => {
        setIsShuffling(true);
        shuffle();
        setTimeout(() => setIsShuffling(false), 50);
    };

    if (!isLoaded) return <div className={styles.loader}>Loading...</div>;

    const tileSize = 100 / gridSize;

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8}}>
                <div>{isWon ? "You won!" : ""}</div>
                <button type="button" onClick={handleShuffle}>Shuffle</button>
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