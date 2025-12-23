export const MIN_GRID_SIZE = 2;
export const MAX_GRID_SIZE = 10;

export const isGridSizeValid = (size: number): boolean => {
    return !isNaN(size) && size >= MIN_GRID_SIZE && size <= MAX_GRID_SIZE;
};