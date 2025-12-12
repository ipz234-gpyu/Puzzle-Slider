import React from "react";
import styles from "./styles.module.css";
import type {TileData} from "./../model/TileData";

interface TileProps {
    data: TileData;
    gridSize: number;
    imageUrl?: string;
    onClick?: (id: number) => void;
}

export const Tile: React.FC<TileProps> = ({data, gridSize, imageUrl, onClick}) => {
    const srcRow = Math.floor((data.id - 1) / gridSize);
    const srcCol = (data.id - 1) % gridSize;

    const bgX = (srcCol / (gridSize - 1)) * 100;
    const bgY = (srcRow / (gridSize - 1)) * 100;

    return (
        <button
            type="button"
            className={`${styles.tile} ${data.isEmpty ? styles.empty : ""}`}
            onClick={() => !data.isEmpty && onClick?.(data.id)}
            style={{
                backgroundImage: !data.isEmpty && imageUrl ? `url(${imageUrl})` : undefined,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${bgX}% ${bgY}%`,
            }}
        >
            {!data.isEmpty ? data.id : null}
        </button>
    );
};