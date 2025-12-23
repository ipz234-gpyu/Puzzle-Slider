import {create} from "zustand";
import {generateShuffledGrid, checkIsSolved} from "../utils/puzzleLogic";

import {type TileData} from "@/entities/tile";

interface PuzzleBoardState {
    tiles: TileData[];
    moveCount: number;
    gridSize: number;
    isWon: boolean;

    setGridSize: (size: number) => void;
    moveTile: (id: number) => void;
    shuffle: () => void;
    reset: () => void;
}

export const usePuzzleBoardStore = create<PuzzleBoardState>((set, get) => ({
    tiles: generateShuffledGrid(4),
    moveCount: 0,
    gridSize: 4,
    isWon: false,

    setGridSize: (size: number) => {
        set({gridSize: size});
        get().reset();
    },

    moveTile: (id: number) => {
        const {tiles, gridSize, isWon, moveCount} = get();
        if (isWon) return;

        const emptyTile = tiles.find(t => t.isEmpty);
        const targetTile = tiles.find(t => t.id === id);

        if (!emptyTile || !targetTile) return;

        const distance = Math.abs(emptyTile.row - targetTile.row) +
            Math.abs(emptyTile.col - targetTile.col);

        if (distance !== 1) return;

        const newTiles = tiles.map(t => {
            if (t.id === id) return {...t, row: emptyTile.row, col: emptyTile.col};
            if (t.isEmpty) return {...t, row: targetTile.row, col: targetTile.col};
            return t;
        });

        const newIsWon = checkIsSolved(newTiles, gridSize);

        set({
            tiles: newTiles,
            moveCount: moveCount + 1,
            isWon: newIsWon,
        });
    },

    shuffle: () => {
        const {gridSize} = get();
        set({
            tiles: generateShuffledGrid(gridSize),
            moveCount: 0,
            isWon: false,
        });
    },

    reset: () => {
        const {gridSize} = get();
        set({
            tiles: generateShuffledGrid(gridSize),
            moveCount: 0,
            isWon: false,
        });
    },
}));