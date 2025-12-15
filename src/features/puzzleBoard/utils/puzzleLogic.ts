import type {TileData} from "@/entities/tile";

export const generateSolvedGrid = (gridSize: number): TileData[] => {
    return Array.from({ length: gridSize * gridSize }, (_, index) => {
        const isLast = index === gridSize * gridSize - 1;
        return {
            id: index + 1,
            row: Math.floor(index / gridSize),
            col: index % gridSize,
            isEmpty: isLast,
        };
    });
};

export const checkIsSolved = (tiles: TileData[], gridSize: number): boolean => {
    return tiles.every(tile => {
        if (tile.isEmpty) return tile.row === gridSize - 1 && tile.col === gridSize - 1;
        const expectedRow = Math.floor((tile.id - 1) / gridSize);
        const expectedCol = (tile.id - 1) % gridSize;
        return tile.row === expectedRow && tile.col === expectedCol;
    });
};

export const isSolvable = (ids: number[]): boolean => {
    let inversions = 0;
    for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
            if (ids[i] > ids[j]) inversions++;
        }
    }

    return inversions % 2 === 0;
};

export const generateShuffledGrid = (gridSize: number): TileData[] => {
    const totalTiles = gridSize * gridSize;

    let tiles: TileData[];

    do {
        const ids = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);

        for (let i = ids.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ids[i], ids[j]] = [ids[j], ids[i]];
        }

        if (!isSolvable(ids)) {
            [ids[0], ids[1]] = [ids[1], ids[0]];
        }

        tiles = ids.map((id, index) => ({
            id,
            row: Math.floor(index / gridSize),
            col: index % gridSize,
            isEmpty: false
        }));

        tiles.push({
            id: totalTiles,
            row: gridSize - 1,
            col: gridSize - 1,
            isEmpty: true
        });

    } while (checkIsSolved(tiles, gridSize));

    return tiles;
};
