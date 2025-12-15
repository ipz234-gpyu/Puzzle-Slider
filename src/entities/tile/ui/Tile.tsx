import React, {useMemo} from "react";
import styles from "./styles.module.css";
import type {TileData} from "../index";

interface TileProps {
    data: TileData;
    gridSize: number;
    imageUrl?: string;
    onClick?: (id: number) => void;
}

export const Tile: React.FC<TileProps> = ({data, gridSize, imageUrl, onClick}) => {
    const backgroundStyles = useMemo(() => {
        if (data.isEmpty || !imageUrl) return {};

        const correctRow = Math.floor((data.id - 1) / gridSize);
        const correctCol = (data.id - 1) % gridSize;
        const divisor = Math.max(1, gridSize - 1);

        return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            backgroundPosition: `${(correctCol / divisor) * 100}% ${(correctRow / divisor) * 100}%`,
        };
    }, [data.isEmpty, imageUrl, data.id, gridSize]);

    return (
        <button
            type="button"
            className={`${styles.tile} ${data.isEmpty ? styles.empty : ""}`}
            onClick={() => onClick?.(data.id)}
            style={backgroundStyles}
            disabled={data.isEmpty}
        >
            {!data.isEmpty && data.id}
        </button>
    );
};