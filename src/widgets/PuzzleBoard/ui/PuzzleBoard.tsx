import React, { useEffect, useState } from "react";
import { Tile } from "@/entities/tile";
import { useGameBoard } from "@/features/game-board";
import styles from "./styles.module.css";

interface GameBoardProps {
    imageUrl: string;
    gridSize?: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ imageUrl, gridSize = 4 }) => {
    const { tiles, moveTile } = useGameBoard(gridSize);

    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setAspectRatio(img.width / img.height);
            setIsImageLoaded(true);
        };
    }, [imageUrl]);

    if (!isImageLoaded) return <div>Loading image...</div>;

    return (
        <div
            className={styles.gameBoard}
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                aspectRatio: `${aspectRatio}`,
            }}
        >
            {tiles.map((tile) => (
                <div
                    key={tile.id}
                    style={{
                        gridColumnStart: tile.col + 1,
                        gridRowStart: tile.row + 1,
                    }}
                >
                    <Tile
                        data={tile}
                        gridSize={gridSize}
                        imageUrl={imageUrl}
                        onClick={moveTile}
                    />
                </div>
            ))}
        </div>
    );
};