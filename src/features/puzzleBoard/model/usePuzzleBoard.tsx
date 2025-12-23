import {useCallback, useState, useEffect, useMemo} from "react";
import { type TileData } from "@/entities/tile";
import { generateShuffledGrid, checkIsSolved } from "../index.ts";

export function usePuzzleBoard(gridSize: number = 4) {
    const [tiles, setTiles] = useState<TileData[]>(() => generateShuffledGrid(gridSize));
    const isWon = useMemo(() => checkIsSolved(tiles, gridSize), [tiles, gridSize]);
    const [moveCount, setMoveCount] = useState(0);

    useEffect(() => {
        setTiles(generateShuffledGrid(gridSize));
    }, [gridSize]);

    const moveTile = useCallback((id: number) => {
        if (isWon) return;

        const emptyTile = tiles.find(t => t.isEmpty);
        const targetTile = tiles.find(t => t.id === id);

        if (!emptyTile || !targetTile) return tiles;

        const distance = Math.abs(emptyTile.row - targetTile.row) +
            Math.abs(emptyTile.col - targetTile.col);

        if (distance !== 1) return tiles;

        setMoveCount(prev => prev + 1);

        setTiles(prevTiles => {
            return prevTiles.map(t => {
                if (t.id === id) return { ...t, row: emptyTile.row, col: emptyTile.col };
                if (t.isEmpty) return { ...t, row: targetTile.row, col: targetTile.col };
                return t;
            });
        });
    }, [tiles, isWon]);

    const shuffle = useCallback(() => {
        setTiles(generateShuffledGrid(gridSize));
        setMoveCount(0);
    }, [gridSize]);

    return { tiles, moveTile, shuffle, isWon, moveCount };
}