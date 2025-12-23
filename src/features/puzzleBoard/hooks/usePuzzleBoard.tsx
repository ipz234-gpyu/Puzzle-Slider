import {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {usePuzzleBoardStore} from "./usePuzzleBoardStore";

export function usePuzzleBoard(gridSize: number = 4) {
    const {tiles, moveCount, isWon, setGridSize, moveTile, shuffle} = usePuzzleBoardStore(
        useShallow((state) => ({
            tiles: state.tiles,
            moveCount: state.moveCount,
            isWon: state.isWon,
            setGridSize: state.setGridSize,
            moveTile: state.moveTile,
            shuffle: state.shuffle,
        }))
    );

    useEffect(() => {
        setGridSize(gridSize);
    }, [gridSize, setGridSize]);

    return {tiles, moveTile, shuffle, isWon, moveCount};
}