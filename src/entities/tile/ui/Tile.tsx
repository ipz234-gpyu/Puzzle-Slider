import React, {useMemo} from "react";
import styles from "./styles.module.css";

interface TileProps {
    id: number;
    gridSize: number;
    isEmpty?: boolean;
    imageUrl?: string;
    onClick?: (id: number) => void;
    isIdVisible?: boolean;
}

export const Tile: React.FC<TileProps> = ({id, isEmpty, gridSize, imageUrl, onClick, isIdVisible}) => {
    const backgroundStyles = useMemo(() => {
        if (isEmpty || !imageUrl) return {};

        const correctRow = Math.floor((id - 1) / gridSize);
        const correctCol = (id - 1) % gridSize;
        const divisor = Math.max(1, gridSize - 1);

        return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            backgroundPosition: `${(correctCol / divisor) * 100}% ${(correctRow / divisor) * 100}%`,
        };
    }, [isEmpty, imageUrl, id, gridSize]);

    return (
        <button
            type="button"
            className={`${styles.tile} ${isEmpty ? styles.empty : ""}`}
            onClick={() => onClick?.(id)}
            style={backgroundStyles}
            disabled={isEmpty}
        >
            {!isEmpty && isIdVisible && id}
        </button>
    );
};