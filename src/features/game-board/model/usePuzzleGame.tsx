import { useState } from "react";
import {type TileData } from "@/entities/tile";

export function useGameBoard(gridSize: number = 4) {
    const getInitialTiles = (): TileData[] => {
        const tiles: TileData[] = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const id = row * gridSize + col + 1;
                const isLast = id === gridSize * gridSize;

                tiles.push({
                    id,
                    row,
                    col,
                    isEmpty: isLast,
                });
            }
        }
        return tiles;
    };

    const [tiles, setTiles] = useState<TileData[]>(getInitialTiles);

    const moveTile = (id: number) => {
        const currentTiles = [...tiles];
        const empty = currentTiles.find(t => t.isEmpty);
        const target = currentTiles.find(t => t.id === id);

        if (!empty || !target) return;

        const isNeighbor =
            (Math.abs(empty.row - target.row) === 1 && empty.col === target.col) ||
            (Math.abs(empty.col - target.col) === 1 && empty.row === target.row);

        if (!isNeighbor) return;

        setTiles(prev => prev.map(t => {
            if (t.id === id) return { ...t, row: empty.row, col: empty.col };
            if (t.isEmpty) return { ...t, row: target.row, col: target.col };
            return t;
        }));
    };

    return { tiles, moveTile };
}


