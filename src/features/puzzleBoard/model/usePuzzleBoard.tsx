import {useCallback, useState, useEffect, useMemo} from "react";
import { type TileData } from "@/entities/tile";
import { generateShuffledGrid, checkIsSolved } from "../index.ts";

export function usePuzzleBoard(gridSize: number = 4) {
    const [tiles, setTiles] = useState<TileData[]>(() => generateShuffledGrid(gridSize));
    const isWon = useMemo(() => checkIsSolved(tiles, gridSize), [tiles, gridSize]);

    useEffect(() => {
        setTiles(generateShuffledGrid(gridSize));
    }, [gridSize]);

    const moveTile = useCallback((id: number) => {
        if (isWon) return;

        setTiles(prevTiles => {
            const emptyTile = prevTiles.find(t => t.isEmpty);
            const targetTile = prevTiles.find(t => t.id === id);

            if (!emptyTile || !targetTile) return prevTiles;

            const distance = Math.abs(emptyTile.row - targetTile.row) +
                Math.abs(emptyTile.col - targetTile.col);

            if (distance !== 1) return prevTiles;

            return prevTiles.map(t => {
                if (t.id === id) return { ...t, row: emptyTile.row, col: emptyTile.col };
                if (t.isEmpty) return { ...t, row: targetTile.row, col: targetTile.col };
                return t;
            });
        });
    }, [isWon]);

    const shuffle = useCallback(() => {
        setTiles(generateShuffledGrid(gridSize));
    }, [gridSize]);

    return { tiles, moveTile, shuffle, isWon };
}